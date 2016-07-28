import React from "react";
import rest from "qwest";
import merge from "merge";
import Pagination from "./resource-list-pagination.jsx";
import ResourceTypeCollection from './mixins/resource-type-collection-es6.jsx';

const ResourceList = React.createClass({
	getDefaultProps: function() {
    return {
			containerComponent: "ul",
			className: "",
    };
  },
	wrap: function(method, resource){
		return method.bind(null, resource);
	},
	render: function(){

		let list_elements = this.props.resources.map((resource) => {
			return React.createElement(this.props.listElementClass, {
				resource: resource,
				key: resource.id,
				onDelete: this.wrap(this.props.delete, resource),
				afterChange: this.props.refresh
			});
		});

		let pagination = null;
		if(this.props.paginate){
			pagination = <Pagination
				hasPrev={this.props.pagination.page!=1}
				hasNext={this.props.resources.length == (this.props.itemsPerPage != null ? this.props.itemsPerPage : this.props.pagination.items) }
				onPrev={this.props.prevPage}
				onNext={this.props.nextPage}
			/>
		}


		if(list_elements.length){
			return (
				<div className = {this.props.className}>
					{pagination}
					{React.createElement(this.props.containerComponent, {className: "resource-list"}, list_elements)}
					{pagination}
				</div>
			)
		} else if(this.props.emptyClass){
			return (
				<div>
					{pagination}
					{React.createElement(this.props.emptyClass)}
				</div>
			)
		}else{
			return(
				<div>
					{pagination}
				</div>
			)
		}

	}
});

export default ResourceTypeCollection(ResourceList);
