const React = require("react");
const FilterComponents = require("./filter-components.jsx");

module.exports = function RoleAllowEdit(
	field_specification,
	description,
	query,
	setValue
) {
	const new_field = {
		name: field_specification.name,
		params: field_specification.params.target_params
	};
	const target_type = field_specification.params.target_field_type;
	if (FilterComponents[target_type]) {
		return FilterComponents[target_type](
			new_field,
			description,
			query,
			setValue
		);
	} else {
		console.error(
			"No component to handle field type: " +
				field_specification.params.target_field_type
		);
		return null;
	}
};
 
