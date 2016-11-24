const React = require("react");
const clone = require("clone");
const merge = require("merge");

const form = function(fields, onSubmit, component){
	return React.createClass({
		getInitialState: function(){
			const body = {};
			for(var i in fields){
				body[fields[i]] = "";
			};
			return {body: body};
		},
		getChangeFieldFn: function(field_name){
			const self = this;
			return function(event){
				const diff = {};
				if(event.target && event.target.type !== "checkbox"){
					diff[field_name] = event.target.value;
				}else if(event.target && event.target.type === "checkbox"){
					diff[field_name] = event.target.checked;
				}else{
					diff[field_name] = event;
				}
				self.setState({
					body:merge(self.state.body, diff),
				});
			};
		},
		render: function(){
			const self = this;
			const props = clone(this.state);
			props.handlers = {};
			for(const i in fields){
				props.handlers[fields[i]] = this.getChangeFieldFn(fields[i]);
			}
			props.onSubmit = function(e){
				e.preventDefault();
				onSubmit(self.state);
			};
			return React.createElement(component, props);
		},
	});
};

module.exports = form;
