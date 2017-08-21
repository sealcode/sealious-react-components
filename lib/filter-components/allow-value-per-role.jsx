const React = require("react");
const FilterComponents = require("./filter-components.jsx");

module.exports = function AllowValuePerRoleInput(
	field_specification,
	description,
	query,
	setValue
) {
	const new_field = {
		name: field_specification.name,
		params: {
			values: Object.keys(field_specification.params.value_to_role)
		}
	};
	return FilterComponents.enum(new_field, description, query, setValue);
};
 
