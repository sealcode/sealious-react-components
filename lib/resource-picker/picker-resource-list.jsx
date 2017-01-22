const React = require("react");
const merge = require("merge");
const StatefulCollection = require("../stateful-collection.js");
const Loading = require("../loading.js");
const keepPageNumberInState = require("../mixins/keep-page-number-in-state.js");
const PaginationUI = require("../pagination-ui.jsx");
const Paginate = require("../mixins/paginate.js");

const View = function(props){
	if(props.loading){
		return <Loading/>;
	}
	return <div>
		<table>
		<tbody>
		{props.resources.map(function(resource){
			return <tr 
					onClick={()=>props.onChange(resource.id)} 
					style={{cursor: "pointer"}}
					className={(resource.id === props.value? "active " : "") + "resource-picker-list-element"}
					key={resource.id}
				>
				{
					props.display_fields.map(function(field_name){
						const formatter = props.display_field_formatters &&  props.display_field_formatters[field_name] || (i=>i);
						return <td key={field_name}>
							{formatter(resource.body[field_name])}
						</td>;
					})
				}
			</tr>
		})}
		</tbody>
	</table>
	</div>
};

const connectedView = StatefulCollection(Paginate(View, keepPageNumberInState(PaginationUI)));

module.exports = function(props){
	return React.createElement(
		connectedView,
		merge(true, merge(true, props, {pagination: {items: 10, page: 1}, passProps: props}))
	);
};
