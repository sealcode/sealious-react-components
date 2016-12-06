const React = require("react");
const merge = require("merge");

function PropMultiplexer(class_list) {
    return function(props) {
        const components = class_list.map( (c, index) => React.createElement(c, merge(true, props, {key: index})) );
        return React.createElement("div", null, components);
    };
}

module.exports = PropMultiplexer;
