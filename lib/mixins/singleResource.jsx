const React = require("react");
// rest.setDefaultDataType('formdata');
const rest = require("qwest");
const CachedHttp = require("../cached-http.js");
const Loading = require("./../loading.js");
const SimpleError = require("./../simple-error.jsx");


import clone from "clone";

module.exports =  function singleResource(ComponentClass, ErrorClass){

	if(!ErrorClass) ErrorClass = SimpleError;

	return React.createClass({
		getInitialState: function() {
		    return {
		          loaded: false,
		          resource: null,
		          temp_body: {},
				  specification: {},
		    };
		},
		getDefaultProps: function(){
			return {
				url: "",
				onDeleteSuccess: () => {},
				ignoredFields: [],
			};
		},
		getTempBody: function(specification, resource){
			const temp_body = {};
			for(var field_name in specification.fields){
				temp_body[field_name] = resource.body[field_name] || "";
			}
			return temp_body;
		},
		componentWillReceiveProps: function(next_props) {
			setTimeout(() => {
				this.refresh();
			}, 0);
		},
		refresh: function(){
			var self = this;
			var url = this.props.url;

			var query = {};

			if(this.getFormat){
				query.format = this.getFormat();
			}

			let resource = null;

			CachedHttp.get(url, query, {responseType: "json", cache: true})
			.then(function(data){
				resource = data;
				let parsed_url = null;
				try {
					parsed_url = new URL(url);
				}catch(e){
					parsed_url = new URL(document.location.origin + url);
				}
				const collection_name = parsed_url.pathname.split("/").slice(-2)[0];
				return CachedHttp.get("/api/v1/specifications/" + collection_name);
			})
			.then(function(data){
				const specification = data;
				try{
					self.setState({
						specification: specification,
						loaded: true,
						resource: resource,
						temp_body: self.getTempBody(specification, resource),
					});
				}catch(e){
					//sometimes when using qwest and certain type of components React swallows the error. We catch it here so it can be easilly accessed. See https://github.com/facebook/react/issues/8430 for bug status
					console.error(e);
				}
				if(self.onDataReceive){
					self.onDataReceive();
				}
			})
			.catch(function(e, xml, error_data){
				try{
					console.error("ERROR!", e);
					self.setState({
						error: true,
						error_data: error_data,
					});
				}catch(e){
					console.error(e);
				}
			});
		},
		componentDidMount: function(){
			this.refresh();
		},
		getCleanUrl: function(){
			// returns the URL without query params
			let parsed_url;
			try{
				parsed_url = new URL(this.props.url);
			}catch(e){
				parsed_url = new URL(document.location.origin + this.props.url);
			}
			return parsed_url.origin + parsed_url.pathname;
		},
		update: function(e){
			const self = this;
			e && e.preventDefault();
			var temp_body = Object.assign({}, this.state.temp_body);
			for(var i in temp_body){
				if(
					self.props.ignoredFields.indexOf(i) !== -1 ||
					temp_body[i]==="" ||
					temp_body[i]===null ||
					temp_body[i]=="undefined" ||
					temp_body[i]===undefined
				){
					delete temp_body[i];
				}
			}
			var url = self.getCleanUrl();
			const fd = new FormData();
			for (var i in temp_body) {
				fd.append(i, temp_body[i]);
			}
			return rest.map("patch", url, fd, {cache: true});
		},
		delete: function(){
			rest.delete(this.props.url, {}, {cache: true})
			.then(() => {
				this.props.onDeleteSuccess();
				this.refresh(true);
			});
		},
		getFieldChangeHandler: function(field_name){
			var self = this;
			return function(e){
				var temp_body = Object.assign({}, self.state.temp_body);
				if(e.preventDefault && e.target.type === "file"){
					temp_body[field_name] = e.target.files[0];
				}else if(e.preventDefault && e.target.type === "checkbox"){
					temp_body[field_name] = e.target.checked;
				}else if(e.preventDefault && e.target.type !== "checkbox"){
					temp_body[field_name] = e.target.value;
				}else{
					temp_body[field_name] = e;
				}
				self.setState({temp_body: temp_body});
			};
		},
		getAllHandlers: function(){
			const handlers = {};
			for(let field_name in this.state.temp_body){
				handlers[field_name] = this.getFieldChangeHandler(field_name);
			}
			return handlers;
		},
		render: function(){
			if(this.state.error){
				return React.createElement(
					ErrorClass,
					{
						error_data: this.state.error_data
					}
				);
			}
			if(this.state.loaded){
				try{
					return React.createElement(ComponentClass, {
						resource: this.state.resource,
						body: this.state.temp_body,
						handlers: this.getAllHandlers(),
						onSubmit: this.update,
						onDelete: this.delete,
					});
				}catch(error){
					console.log(error);
				}
			} else{
				return React.createElement(Loading);
			}
		},
	});
}
