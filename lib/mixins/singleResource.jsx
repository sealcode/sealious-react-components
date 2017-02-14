const React = require("react");
// rest.setDefaultDataType('formdata');
const merge = require("merge");
const rest = require("qwest");
const CachedHttp = require("../cached-http.js");
const Loading = require("./../loading.js");
const SimpleError = require("./../simple-error.jsx");

import clone from "clone";

if (typeof Object.assign != 'function') {
  Object.assign = function(target, varArgs) { // .length of function is 2
    'use strict';
    if (target == null) { // TypeError if undefined or null
      throw new TypeError('Cannot convert undefined or null to object');
    }

    var to = Object(target);

    for (var index = 1; index < arguments.length; index++) {
      var nextSource = arguments[index];

      if (nextSource != null) { // Skip over if undefined or null
        for (var nextKey in nextSource) {
          // Avoid bugs when hasOwnProperty is shadowed
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  };
}

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
				temp_body[field_name] = resource.body[field_name]===undefined? "" : resource.body[field_name];
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
					parsed_url = {pathname: url.split("?")[0]};
					//parsed_url = new URL(document.location.origin + url);
				}
				const collection_name = parsed_url.pathname.split("/").slice(-2)[0];
				return CachedHttp.get("/api/v1/specifications/" + collection_name);
			})
			.then(function(data){
				if(self.props.onLoad){
					self.props.onLoad(resource);
				}
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
			const old_resource = this.state.resource.body;
			const temp_new_body = this.state.temp_body;
			const request_body = Object.keys(temp_new_body).reduce(function(prev, next){
				if (old_resource[next] !== temp_new_body[next] && temp_new_body[next] !== "") {
					prev[next] = temp_new_body[next];
				}
				return prev;
			}, {});
			const self = this;
			e && e.preventDefault();
			var url = self.getCleanUrl();
			if (typeof request_body.profile_photo === "string"){
				delete request_body.profile_photo;
			}
			const fd = new FormData();
			for (var i in request_body) {
				if(request_body[i]!==undefined){
					fd.append(i, request_body[i]);
				}
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
				if(e.target.type == "select-one" && e.target.value == ""){
					delete temp_body[field_name];
				}
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
					const component_props = merge( 
						true, 
						this.props,
						{
							resource: this.state.resource,
							body: this.state.temp_body,
							handlers: this.getAllHandlers(),
							onSubmit: this.update,
							onDelete: this.delete,
						}
					);
					return React.createElement(ComponentClass, component_props);
				}catch(error){
					console.log(error);
				}
			} else{
				return React.createElement(Loading);
			}
		},
	});
}
