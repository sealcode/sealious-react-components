const React = require("react");
const Router = require("./../Router.js");

function propsFromUrl(component){
	return React.createClass({
		getInitialState: function(){
			return {};
		},
		componentDidMount: function(){
			const self = this;
			self.setState(Router.getParams());
			Router.onParamChange("*", function(){
				self.setState(Router.getParams());
			});
		},
		render: function(){
			return React.createElement(
				component,
				this.state
			);
		}
	});
}


module.exports = propsFromUrl;
