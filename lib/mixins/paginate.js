const React = require("react");
const merge = require("merge");

const Pagination = require("../Pagination.jsx");

module.exports = function paginate(contentComponent, paginationComponent){
	// expects a class that has the resourceTypeCollection mixin
	return function(props){
		return React.createElement(
			"div",
			{
				className: "paginated-resource-collection",
			},
			[
				React.createElement(
					paginationComponent, 
					merge(true, props, {key: "pagination1"})
				),
				React.createElement(
					contentComponent,
					merge(true, props, {key: "resources"})
				),
				React.createElement(
					paginationComponent,
					merge(true, props, {key: "pagination2"})
				)
			]
		);
	};
};
