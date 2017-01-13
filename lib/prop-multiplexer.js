const React = require("react");
const merge = require("merge");

function PropMultiplexer(class_list) {
    return function(props) {
        const components = class_list.map( (c, index) => React.createElement(c, merge(true, props, {key: index})) );

		const last_component = components[components.length-1];
		var first_components = [];
		for (var key = 0; key < components.length-1; key++) first_components.push(components[key]);

        // return React.createElement("div", null, components);
		return React.createElement("div", null, [
			React.createElement("div", {className: 'first-components'}, first_components),
			React.createElement("div", {className: 'last-component'}, last_component),
		]);
    };
}

module.exports = PropMultiplexer;
