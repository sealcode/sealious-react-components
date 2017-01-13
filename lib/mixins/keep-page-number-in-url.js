const Router = require("./../Router.js");
const React = require("react");
const merge = require("merge");


function get_click_handler(param_name, page_number, fn){
	return function(e){
		document.getElementById("app").scrollIntoView();
		if(e.ctrKey || e.altKey){
			// let the browser do its thing
		} else {
			e.preventDefault();
			Router.setParam(param_name, fn(page_number));
		}
	};
}

module.exports = function keepPageNumberInUrl(param_name, paginationComponent){
	return function(props){
	
		const page_number = props.page_number;

		return React.createElement(
			paginationComponent,
			{
				hasPrev: page_number > 1,
				hasNext: props.hasNext,
				prevPageUrl: Router.getParamChangeUrl(param_name, page_number - 1),
				nextPageUrl: Router.getParamChangeUrl(param_name, page_number + 1),
				onPrev: get_click_handler(param_name, page_number, n => n-1),
				onNext: get_click_handler(param_name, page_number, n => n+1),
			}
		);
	};
};

