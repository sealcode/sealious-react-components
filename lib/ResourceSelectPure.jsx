import React from "react";
import resourceTypeCollection from './mixins/resourceTypeCollection.jsx';
import merge from "merge";

const default_props = {
	displayAttr: "id",
	valueAttr: "id",
	noValueOptionName: "--",
	allowNoValue: false,
	onValueChange: (value) => alert(value),
	label: "Select resource:",
	disabled: false,
	value: "",
	resources: [],
};

function ResourceSelectPure(props_arg){

	const props = merge(true, default_props, props_arg);

	function handleChange(e){
		props.onValueChange(e.target.value);
	}

	try{
		const options = props.resources.map((resource) => {
			const value = resource[props.valueAttr] || resource.body[props.valueAttr];
			const name = resource[props.displayAttr] || resource.body[props.displayAttr];
			const key = resource.id;
			return (
				<option value={value} key={key}>
					{name}
				</option>
			);
		});

		if(props.allowNoValue){
			options.unshift(
				<option value="undefined" key="empty">
					{props.noValueOptionName}
				</option>
			);
		}

		return (
			<label>
				{props.label}
				<select onChange={handleChange} value={props.value} disabled={props.disabled}>
					{options}
				</select>
			</label>
		);
	}catch(e){
		console.error(e);
	}
};

export default ResourceSelectPure;
