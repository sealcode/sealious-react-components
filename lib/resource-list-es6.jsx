import React from "react";
import rest from "qwest";
import merge from "merge";
import Pagination from "./resource-list-pagination.jsx";
import ResourceTypeCollection from './mixins/resource-type-collection-es6.jsx';

let ResourceList = React.createClass({
	getDefaultProps: function() {
    return {
			containerComponent: "ul",
			className: "",
    };
  },
	render: function(){

		console.log(this.props);

		let list_elements = this.props.resources.map((resource) => {
			return React.createElement(this.props.listElementClass, {
				resource: resource,
				key: resource.id,
				//onDelete: this.wrap(this.delete, resource),
				//afterChange: this.refresh
			});
		});
		if(list_elements.length){
			return (
				<div>{React.createElement(this.props.containerComponent, {className: "resource-list"}, list_elements)}</div>
			)
		} else{
			return <div>Loading...</div>
		}

	}
});

export default ResourceTypeCollection(ResourceList);
