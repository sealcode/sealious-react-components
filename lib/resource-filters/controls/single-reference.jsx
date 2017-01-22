const React = require("react");
const ResourceSelect = require("../../ResourceSelect.jsx");

module.exports = function SingleReferenceControl(field_name, field_description, control_options, value, onChange){
	return <ResourceSelect
		url={"/api/v1/collections/" + field_description.params.collection}
		label={control_options.label === undefined? field_name : control_options.label}
		className="dropdown-large dropdown"
		displayAttr="name"
		value={value}
		onValueChange={(id) => {onChange(id); }}
		allowNoValue={true} />;
};
