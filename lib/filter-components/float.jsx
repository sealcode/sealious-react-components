const React = require("react");

module.exports = function FloatInput(
	field_specification,
	description,
	query,
	setValue
) {
	return (
		<label for={field_specification.name}>
			{description.label || field_specification.name}
			<input
				type="number"
				step="0.01"
				value={query[field_specification.name]}
				onChange={e =>
					setValue(parseFloat(e.target.value) || undefined)}
			/>
		</label>
	);
};
