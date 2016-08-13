import React from "react";
import rest from "qwest";
import merge from "merge";
import Pagination from "./resource-list-pagination.jsx";
import ResourceTypeCollection from './mixins/resource-type-collection-es6.jsx';

const DefaultRow = (props) => {
	try{
		const body = props.resource.body;
		const cells = Object.keys(body).map((key) => {
			let content = body[key];
			return (
				<td key={key}>
					{content}
				</td>
			)
		});
		return <tr key={props.resource.id}>{cells}</tr>
	}catch(e){
		console.log(e);
	}
}

const ResourceTable = (props) => {

	const default_props = {
		rowComponent: DefaultRow
  }

	const merged_props = merge(default_props, props);

	const wrap = function(method, resource){
		return method.bind(this, resource);
	}

	let pagination = null;
	if(props.paginate){
		pagination = <Pagination
			hasPrev={merged_props.pagination.page!=1}
			hasNext={merged_props.resources.length == (merged_props.itemsPerPage != null ? merged_props.itemsPerPage : merged_props.pagination.items)}
			onPrev={merged_props.prevPage}
			onNext={merged_props.nextPage}
		/>
	}

	try{
		const rows = merged_props.resources.map((resource) => {
			console.log("resource-table", merged_props.rowComponent)
			return React.createElement(merged_props.rowComponent, {
				key: resource.id,
				resource: resource
			});
		});

		if(rows.length){
			return (
				<div>
					{pagination}
					<table>
						<tbody>
							{rows}
						</tbody>
					</table>
					{pagination}
				</div>
			)
		} else{
			return(
				<div>
					{pagination}
				</div>
			)
		}

	}catch(e){
		console.log(e);
	}

}

export default ResourceTypeCollection(ResourceTable);
