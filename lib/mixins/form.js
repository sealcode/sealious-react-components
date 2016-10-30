const React = require("react");
const clone = require("clone");
const merge = require("merge");

const form = function(fields, onSubmit, component){
	return React.createClass({
		getInitialState: function(){
			const values = {};
			for(var i in fields){
				values[fields[i]] = "";
			};
			return {values: values};
		},
		getChangeFieldFn: function(field_name){
			var self = this;
			return function(event){
				const diff = {};
				diff[field_name] = event.target.value;
				self.setState({
					values:merge(self.state.values, diff),
				});
			};
		},
		render: function(){
			const self = this;
			const props = clone(this.state);
			for(const i in fields){
				props["on" + fields[i][0].toUpperCase() + fields[i].slice(1) + "Change"] = this.getChangeFieldFn(fields[i]);
			}
			props.submit = function(e){
				e.preventDefault();
				onSubmit(self.state);
			};
			return React.createElement(component, props);
		},
	});
};

module.exports = form;
