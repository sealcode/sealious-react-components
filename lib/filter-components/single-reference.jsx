const React = require("react");
const ResourceSelect = require("../ResourceSelect.jsx");

module.exports = function SingleReferenceInput(
	field_specification,
	description,
	query,
	setValue
) {
	const empty_value = description.value_when_empty || "";
	return (
		//not wraped in `label` because ResourceSelect wraps in `label`
		<ResourceSelect
			url={"/api/v1/collections/" + field_specification.params.collection}
			label={description.label || description.name}
			className="dropdown-large dropdown"
			displayAttr="name"
			displayAttrIsSafe={true}
			value={query.filter && query.filter[description.name]}
			onValueChange={value => {
				setValue(value === "" ? empty_value : value);
			}}
			sort={{ "body.name.safe": "asc" }}
			allowNoValue={true}
			filter={description.filter || {}}
		/>
	);
};
