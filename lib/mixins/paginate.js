const React = require("react");
const merge = require("merge");

const Pagination = require("../Pagination.jsx");

const default_props = {
	page: 1,
	itemsPerPage: 12,
	paginate: true,
	paginationComponent: Pagination,
	onNextPage: () => console.debug("You need to implement the onNextPage function and provide it as a prop"),
	onPrevPage: () => console.debug("You need to implement the onPrevPage function and provide it as a prop"),
	nextPageUrl: "",
	prevPageUrl: "",
};

module.exports = function paginate(component){
	// expects a class that has the resourceTypeCollection mixin
	return function(props_arg){
		const props = merge(true, default_props, props_arg);
		if(props.paginate){
			const props_diff = {
				pagination: {
					page: props.page,
					items: props.itemsPerPage,
				}
			};			

			merge(props, props_diff); //this changes the values in props object

			const pagination_props = {
				hasPrev: props.page != 1,
				hasNext: true,
				onNext: props.onNextPage,
				onPrev: props.onPrevPage,
				nextPageUrl: props.nextPageUrl,
				prevPageUrl: props.prevPageUrl,
			};

			return React.createElement(
				"div",
				{
					className: "paginated-resource-collection",
				},
				[
					React.createElement(
						props.paginationComponent, 
						merge(true, pagination_props, {key: "pagination1"})
					),
					React.createElement(
						component,
						merge(true, props, {key: "resources"})
					),
					React.createElement(
						props.paginationComponent,
						merge(true, pagination_props, {key: "pagination2"})
					)
				]
			);
		}else{
			alert("No paginate");
			return React.createElement(component, props);
		}
	};
};
