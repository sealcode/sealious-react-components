import rest from "qwest";
import React from "react";
// rest.setDefaultDataType('formdata');

import clone from "clone";

export default function singleResource(ComponentClass){
	return React.createClass({
		getInitialState: function() {
		    return {
		          loaded: false,
		          resource: null,
		          temp_body: {}
		    };
		},
		getDefaultProps: function(){
			return {
				url: "",
				onDeleteSuccess: () => {},
			};
		},
		refresh: function(){
			var self = this;
			var url = this.props.url;

			var query = {};

			if(this.getFormat){
				query.format = this.getFormat();
			}

			console.log(url)
			rest.get(url, query, {responseType: "json", cache: true})
			.then(function(xml, data){
				self.setState({
					loaded: true,
					resource: data,
					temp_body: clone(data.body)
				});
				if(self.onDataReceive){
					self.onDataReceive();
				}
			});
		},
		componentDidMount: function(){
			this.refresh();
		},
		update: function(e){
			e && e.preventDefault();
			var temp_body = clone(this.state.temp_body);
			console.log(temp_body);
			for(var i in temp_body){
				var ignored_fields = this.state.ignoreFieldUpdate || (this.static && this.static.ignoreFieldUpdate);
				var is_ignored = ignored_fields && ignored_fields.indexOf(i)!==-1
				if(temp_body[i]=="" || temp_body[i] === null || is_ignored || temp_body[i]=="undefined" || temp_body[i]===undefined){
					delete temp_body[i];
				}
			}
			var url = this.props.url;
			return rest.map("patch", url, temp_body, {cache: true})
		},
		delete: function(){
			rest.delete(this.props.url, {}, {cache: true})
			.then(() => {
				this.props.onDeleteSuccess();
				this.refresh(true);
			})
		},
		getFieldChangeHandler: function(field_name){
			var self = this;
			return function(e){
				var temp_body = clone(self.state.temp_body);
				if(e.preventDefault){
					//e.preventDefault();
					temp_body[field_name] = e.target.value;
				}else{
					temp_body[field_name] = e;
				}
				self.setState({temp_body: temp_body});
			}
		},
		getAllHandlers: function(){
			const handlers = {};
			for(let field_name in this.state.resource.body){
				handlers[field_name] = this.getFieldChangeHandler(field_name);
			}
			return handlers;
		},
		render: function(){
			console.log("render!");
			if(this.state.loaded){
				return React.createElement(ComponentClass, {
					resource: this.state.resource,
					body: this.state.temp_body,
					handlers: this.getAllHandlers(),
					onSubmit: this.update,
					onDelete: this.delete,
				});
			} else{
				return (<div>Loading...</div>);
			}

		}


	});
}

/*module.exports = {
	getInitialState: function() {
	    return {
	          loaded: false,
	          resource: null,
	          temp_body: {}
	    };
	},
	refresh: function(){
		var self = this;
		var url = (this.static && this.static.url) || (this.getUrl && this.getUrl());

		var query = {};

		if(this.getFormat){
			query.format = this.getFormat();
		}

		rest.get(url, query, {responseType: "json"})
		.then(function(xml, data){
			self.setState({
				loaded: true,
				resource: data,
				temp_body: clone(data.body)
			});
			if(self.onDataReceive){
				self.onDataReceive();
			}
		});
	},
	componentDidMount: function(){
		this.refresh();
	},
	update: function(e){
		e && e.preventDefault();
		var temp_body = clone(this.state.temp_body);
		console.log(temp_body);
		for(var i in temp_body){
			var ignored_fields = this.state.ignoreFieldUpdate || (this.static && this.static.ignoreFieldUpdate);
			var is_ignored = ignored_fields && ignored_fields.indexOf(i)!==-1
			if(temp_body[i]=="" || temp_body[i] === null || is_ignored || temp_body[i]=="undefined" || temp_body[i]===undefined){
				delete temp_body[i];
			}
		}
		var url = (this.static && this.static.url) || (this.getUrl && this.getUrl());
		return rest.map("patch", url, temp_body)
	},
	getFieldChangeHandler: function(field_name){
		var self = this;
		return function(e){
			var temp_body = clone(self.state.temp_body);
			if(e.preventDefault){
				//e.preventDefault();
				temp_body[field_name] = e.target.value;
			}else{
				temp_body[field_name] = e;
			}
			self.setState({temp_body: temp_body});
		}
	}
}*/