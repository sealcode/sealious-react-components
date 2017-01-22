const React = require("react");

const loadCollectionSpecification = require("./../mixins/load-collection-specification.js");

const type_to_component = {
	single_reference: require("./controls/single-reference.jsx"),
};

const View = function(props){
	return <div>
		{props.fields_to_display.map(function(field_name){
			const field_description = props.specification.fields[field_name];
			const control_options = props.control_options[field_name] || {};
			const field_type_control_generator = type_to_component[field_description.type.name] || (()=>null);
			return field_type_control_generator(
				field_name,
				field_description,
				control_options,
				props.filter_values[field_name],
				(value)=>props.onChange(field_name, value)
			);
		})}
	</div>;
	return <div>{JSON.stringify(props.specification)}</div>;
};


module.exports = function(collection){
	const ConnectedView = loadCollectionSpecification(collection, View);
	return function(props){
		return React.createElement(
			ConnectedView,
			{
				collection: collection,
				fields_to_display: props.fields_to_display || [],
				control_options: props.control_options || {},
				options: props.options,
				filter_values: props.filter_values,
				onChange: props.onChange,
			}
		);
	};
};
