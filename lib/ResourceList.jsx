const React = require("react");
const resourceTypeCollection = require('./mixins/resourceTypeCollection.jsx').default;

const merge = require("merge");

const default_props = {
	paginate: true,
	page: 1,
	listElementClass: (resource) => <div>resource.id</div>,
	preprocessEach: (e) => e,
	emptyClass: () => React.createElement("div", {}, "List is empty"),
	containerComponent: (props, children) => React.createElement("div", props, children),
};

const wrap = function(method, resource){
	if(method==undefined){
		return undefined;
	}else{
		return method.bind(null, resource);
	}
};

const PureResourceList = function(custom_props){
	const props = merge(true, default_props, custom_props);
	const resources = props.resources;
	const componentClass = props.listElementClass;

	const list_elements = resources.map(
		function(resource){
			return React.createElement(
				componentClass,
				{
					resource: props.preprocessEach(resource),
					key: resource.id,
					onDelete: wrap(props.delete, resource),
					afterChange: props.refresh,
				}
			);
		}
	);

	if(resources.length){
		return React.createElement(
			props.containerComponent,
			{className: "resource-list"},
			list_elements
		);
	}else{
		return React.createElement(
			props.emptyClass
		);
	}
};


module.exports = resourceTypeCollection(PureResourceList);
