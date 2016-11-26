const React = require("react");

function PropMultiplexer(class_list) {
    return function(props) {
        const components = class_list.map( c => React.createElement(c, props) );

        return React.createElement("div", {}, components);
    }
}

module.exports = PropMultiplexer;
