const React = require("react");
const merge = require("merge");

module.exports = function PropCombinator(key_to_class, inner_component){
	// key_to_class should look like so:
	// [
	// 		[key, class_fn, props],
	// 		[key, class_fn, props],
	// 		...
	// 	]
	//
	// where `class_fn` is a function that takes a component child class as it's only argument
	//
	// instantiates the inner_component with props from various HOC combined:
	// props = {[key1]: props1, [key2]: props2, ...}

	const combined = key_to_class.reduce(function(acc, el){
		const key = el[0];
		const component_fn = el[1];
		const props = el[2];


		return function subsequentAccumulator(_props){
			return React.createElement(
				component_fn(function merger(__props){
					return React.createElement(acc, merge.recursive(true, _props, {_: {[key]: __props} }));
				}),
				props
			);
		};
	}, function initialAccumulator(merged_props){
		return React.createElement(inner_component, merged_props._);
	});

	return function(){
		return React.createElement(combined);
	};
};
