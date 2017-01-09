const React = require("react");
const merge = require("merge");

function keepPageNumberInState(component){
	// expects a component with a 'paginate' mixin
	return function(props){
		const component_props = {
			hasPrev: props.page_number > 1,
			hasNext: true,
			page: props.page_number,
			onNext: (e)=> {
				e.preventDefault();
				console.log("Zczczc");
				document.getElementById("app").scrollIntoView();
				props.setPage(props.page_number + 1);
			},
			onPrev: (e)=> {
				e.preventDefault();
				document.getElementById("app").scrollIntoView();
				props.setPage(props.page_number - 1);
			},
			nextPageUrl: "#",
			prevPageUrl: "#",
		};
		return React.createElement(
			component,
			merge(true, self.props, component_props)
		);
	};
}

module.exports = keepPageNumberInState;
