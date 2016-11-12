const Router = require("./../Router.js");
const React = require("react");
const merge = require("merge");

const propsFromUrl = require("./props-from-url.js");

function loadPageNumberFromProps(page_param_name, component, props){
	// expects a component with a 'paginate' mixin
	const page = parseInt(props[page_param_name]);
	if(isNaN(page)){
		setTimeout(() => Router.setParam(page_param_name, 1), 0);
		return React.createElement("div");
	}
	const component_props = merge(true, props, {
		page: page,
		onNextPage: function(e){
			if(!e.ctrlKey){
				e.preventDefault();
				Router.setParam(page_param_name, page + 1);
			}
		},
		onPrevPage: function(e){
			if(!e.ctrlKey){
				e.preventDefault();
				Router.setParam(page_param_name, page - 1);
			}
		},
		nextPageUrl: Router.getParamChangeUrl(page_param_name, page + 1),
		prevPageUrl: Router.getParamChangeUrl(page_param_name, page - 1),
	});
	return React.createElement(
		component,
		component_props
	);
}

module.exports = function(page_param_name, component){
	return function(props){
		return loadPageNumberFromProps(page_param_name, component, props);
	};
};
