const React = require("react");
const Router = require("./../Router.js");

function propsFromUrl(component){
	const PropsFromUrl =  React.createClass({
		getInitialState: function(){
			const self = this;
			const listener_id = Router.onParamChange("*", function(){
				self.setState({params: Router.getParams()});
			});
			return {
				params:Router.getParams(),
				listener_id: listener_id,
			};
		},
		componentWillUnmount: function(){
			if(this.state.listener_id !== undefined) {
				Router.removeListener(this.state.listener_id);
			}
		},
		render: function(){
			return React.createElement(
				component,
				this.state.params
			);
		}
	});
	return PropsFromUrl;
}


module.exports = propsFromUrl;
