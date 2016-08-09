import React from "react";
import merge from "merge";
import Pagination from "./resource-list-pagination.jsx";

export const default_props = {
	containerComponent: "ul",
	className: ""
}

export const wrap = function(method, resource){
	if(method==undefined){
		return undefined;
	}else{
		return method.bind(null, resource);
	}
}

const ResourceList = (props) => {


	const merged_props = merge(default_props, props);


	const list_elements = props.resources.map((resource) => {
		return React.createElement(merged_props.listElementClass, {
			resource: resource,
			key: resource.id,
			onDelete: wrap(merged_props.delete, resource),
			afterChange: merged_props.refresh
		});
	});

	let pagination = null;
	if(props.paginate){
		pagination = <Pagination
			hasPrev={merged_props.pagination.page!=1}
			hasNext={merged_props.resources.length == (merged_props.itemsPerPage != null ? merged_props.itemsPerPage : merged_props.pagination.items) }
			onPrev={merged_props.prevPage}
			onNext={merged_props.nextPage}
		/>
	}

	if(list_elements.length){
		return (
			<div className = {merged_props.className}>
				{pagination}
				{React.createElement(merged_props.containerComponent, {className: "resource-list"}, list_elements)}
				{pagination}
			</div>
		)
	} else if(merged_props.emptyClass){
		return (
			<div>
				{pagination}
				{React.createElement(merged_props.emptyClass)}
			</div>
		)
	}else{
		return(
			<div>
				{pagination}
			</div>
		)
	}

};

export default ResourceList;
