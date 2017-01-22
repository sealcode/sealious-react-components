const React = require("react");
const singleResource = require("../mixins/singleResource.jsx");

const View = function(props){
	return <div>
		{props.display_fields.map(function(field_name){
			const formatter = props.display_field_formatters &&  props.display_field_formatters[field_name] || (i=>i);
			return <div key={field_name}>
				{formatter(props.resource.body[field_name])}
			</div>;
		})}
	</div>;
};

const ConnectedView = singleResource(View);

module.exports = function(props){
	return React.createElement(
		ConnectedView,
		props
	);
};
