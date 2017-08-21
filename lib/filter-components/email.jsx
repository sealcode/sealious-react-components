const React = require("react");
const TextInput = require("./text.jsx"); 

module.exports = function EmailInput(
	field_specification,
	description,
	query,
	setValue
) {
	return TextInput(
		field_specification,
		description,
		query,
		setValue
	);
};
