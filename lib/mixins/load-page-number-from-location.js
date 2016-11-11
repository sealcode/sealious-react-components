const Router = require("./../Router.js");
const React = require("react");
const merge = require("merge");

function loadPageNumberFromLocation(page_param_name, component){
	// expects a component with a 'paginate' mixin
	return React.createClass({
		getInitialState: function(){
			return {
				page: Router.getParam(page_param_name),
			};
		},
		componentDidMount: function(){
			const self = this;
			Router.onParamChange(page_param_name, function(new_value){
				console.log("detected change!");
				self.setState({
					page: new_value,
				});
			});
			const current_value = Router.getParam(page_param_name);
			if(current_value === undefined){
				Router.setParam(page_param_name, 1);
			}
		},
		render: function(){
			const self = this;
			const component_props = merge(true, self.props, {
				page: self.state.page,
				onNextPage: function(e){
					if(!e.ctrlKey){
						e.preventDefault();
						Router.setParam(page_param_name, parseInt(self.state.page) + 1);
					}
				},
				onPrevPage: function(e){
					if(!e.ctrlKey){
						e.preventDefault();
						Router.setParam(page_param_name, self.state.page - 1);
					}
				},
				nextPageUrl: Router.getParamChangeUrl(page_param_name, parseInt(self.state.page) + 1),
				prevPageUrl: Router.getParamChangeUrl(page_param_name, self.state.page - 1),
			});
			return React.createElement(
				component,
				component_props
			);
		}
	});
}

module.exports = loadPageNumberFromLocation;
