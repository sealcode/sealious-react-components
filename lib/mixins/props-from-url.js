const React = require("react");
const Router = require("./../Router.js");
const merge = require("merge");

function propsFromUrl(component, prop_name){
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
			const child_props = (prop_name===undefined? merge(this.state.params, this.props) : merge({[prop_name]: this.state.params}, this.props));
			return React.createElement(
				component,
				child_props,
				this.props.children
			);
		}
	});
	return PropsFromUrl;
}


module.exports = propsFromUrl;
