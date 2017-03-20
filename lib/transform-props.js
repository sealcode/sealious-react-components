const React = require("react");

module.exports = function TransformProps(prop_fn, component){
	return function(props){
		return React.createElement(component, prop_fn(props));
	};
};
