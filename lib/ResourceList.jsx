const React = require("react");
//const resourceTypeCollection = require('./mixins/resourceTypeCollection.jsx').default;

const merge = require("merge");
const Loading = require("./loading.js");

const default_props = {
	paginate: true,
	page: 1,
	listElementClass: resource => <div>resource.id</div>,
	preprocessEach: e => e,
	emptyClass: () => React.createElement("div", {}, "List is empty"),
	containerComponent: (props, children) =>
		React.createElement("div", props, children)
};

const wrap = function(method, resource) {
	if (method == undefined) {
		return undefined;
	} else {
		return method.bind(null, resource);
	}
};

const PureResourceList = function(
	containerClass,
	listElementClass,
	merged_props
) {
	try {
		const props = merge(true, default_props, merged_props);
		const resources = props.resources;

		const list_elements = resources.map(function(resource, index) {
			return React.createElement(
				listElementClass,
				merge(true, props, {
					resource: props.preprocessEach(resource),
					key: resource.id,
					onDelete: wrap(props.delete, resource),
					afterChange: props.refresh,
					index: index,
					metadata: merged_props.metadata
				})
			);
		});

		if (props.loading) {
			return React.createElement(Loading);
		}

		if (resources.length) {
			return React.createElement(
				containerClass,
				{ className: "resource-list" },
				list_elements
			);
		} else {
			return React.createElement(props.emptyClass);
		}
	} catch (error) {
		console.error(error);
	}
};

module.exports = function(containerClass, listElementClass, custom_props) {
	return function ResourceList(props) {
		const merged_props = Object.assign({}, custom_props, props);
		return PureResourceList(containerClass, listElementClass, merged_props);
	};
};
