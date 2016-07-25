import React from "react";
import rest from "qwest";
import merge from "merge";
import Pagination from "./resource-list-pagination.jsx";
import ResourceTypeCollection from './mixins/resource-type-collection-es6.jsx';

let ResourceList = React.createClass({
	render: function(){

		console.log(this.props);
		return (
			<div>Hello</div>
		)
	}
});

export default ResourceTypeCollection(ResourceList);
