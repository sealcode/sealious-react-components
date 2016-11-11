const React = require("react");
const merge = require("merge");

function keepPageNumberInState(component){
	// expects a component with a 'paginate' mixin
	return React.createClass({
		getInitialState: function(){
			return {
				page: 1,
			};
		},
		render: function(){
			const self = this;
			const component_props = {
				page: self.state.page,
				onNextPage: (e)=> {
					e.preventDefault();
					self.setState({page: parseInt(self.state.page) + 1});
				},
				onPrevPage: (e)=> {
					e.preventDefault();
					self.setState({page: parseInt(self.state.page) - 1});
				},
				nextPageUrl: "#",
				prevPageUrl: "#",
			};
			return React.createElement(
				component,
				merge(true, self.props, component_props)
			);
		}
	});
}

module.exports = keepPageNumberInState;
