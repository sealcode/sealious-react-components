const React = require("react");
const FilterComponents = require("./filter-components.jsx");

module.exports = function EnumInput(
	field_specification,
	description,
	query,
	setValue
) {
	return (
		<label htmlFor={description.name}>
			{description.label || description.name}
			<select
				className="dropdown"
				id={description.name}
				name={description.name}
				onChange={e => setValue(e.target.value)}
			>
				<option
					value={FilterComponents.EMPTY_VALUE_ID}
					selected={query.filter && query.filter[description.name] === ""}
				>
					{description.empty_value_label || "--"}
				</option>
				{field_specification.params.values.map((f, i) => (
					<option
						key={i}
						value={f}
						selected={query.filter && query.filter[description.name] === f}
					>
						{description.value_formatter ? description.value_formatter(f) : f}
					</option>
				))}
			</select>
		</label>
	);
};
