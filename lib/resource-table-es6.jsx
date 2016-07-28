import React from "react";
import rest from "qwest";
import merge from "merge";
import Pagination from "./resource-list-pagination.jsx";
import ResourceTypeCollection from './mixins/resource-type-collection-es6.jsx';


const DefaultRow = React.createClass({
	render: function(){
		try{
			let body = this.props.resource.body;
			let cells = Object.keys(body).map((key) => {
				let content = body[key];
				return (
					<td key={key}>
						{content}
					</td>
				)
			});
			return <tr key={this.props.resource.id}>{cells}</tr>
		}catch(e){
			console.log(e);
		}
	}
})

const ResourceTable = React.createClass({

	getDefaultProps: function() {
    return {
        rowComponent: DefaultRow
    };
	},
	wrap: function(method, resource){
		return method.bind(this, resource);
	},
	render: function(){

		let pagination = null;
		if(this.props.paginate){
			pagination = <Pagination
				hasPrev={this.props.pagination.page!=1}
				hasNext={this.props.resources.length == (this.props.itemsPerPage != null ? this.props.itemsPerPage : this.props.pagination.items)}
				onPrev={this.props.prevPage}
				onNext={this.props.nextPage}
			/>
		}

		try{
			let rows = this.props.resources.map((resource) => {
				return React.createElement(this.props.rowComponent, {
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
})

export default ResourceTypeCollection(ResourceTable);
