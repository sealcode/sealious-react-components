const React = require("react");
const Enum = require("./enum.jsx");

module.exports = function EmailInput(
	field_specification,
	description,
	query,
	setValue
) {
	return Enum(
		{ params: { values: ["true", "false"] } },
		description,
		query,
		setValue
	);
};
