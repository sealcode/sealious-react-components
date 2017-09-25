const React = require("react");

module.exports = function TextInput(
	field_specification,
	description,
	query,
	setValue
) {
	const regex_prefix =
		description && description.match_from_start ? "^" : ".*";

	function wrap_in_regex(string) {
		return regex_prefix + string + ".*";
	}
	function strip_regex(string) {
		return string.slice(regex_prefix.length).slice(0, -2);
	}

	let parsed_value = query.filter[field_specification.name];
	if (parsed_value && parsed_value.regex) {
		parsed_value = strip_regex(parsed_value.regex);
	}

	console.log(query.filter[field_specification.name], parsed_value);

	return (
		<label htmlFor={field_specification.name}>
			{description.label || field_specification.name}
			<input
				type="text"
				value={parsed_value}
				onChange={function(e) {
					setValue(
						e.target.value == ""
							? undefined
							: description && description.partial
								? {
										regex: wrap_in_regex(e.target.value)
									}
								: e.target.value
					);
				}}
			/>
		</label>
	);
};
