import React from "react";
import ResourceTypeCollection from './mixins/ResourceTypeCollection.jsx';
import merge from "merge";

const ResourceSelect = React.createClass({
	getDefaultProps: function() {
	    return {
	        displayAttr: "id",
	        noValueOptionName: "--",
	        allowNoValue: false
	    };
	},
	getValue: function(){
		console.log("getValue!", this.refs.select.value);
		if(this.refs.select.value == "undefined"){
			return undefined;
		}else{
			return this.refs.select.value;
		}
	},
	handleChange: function(e){
		this.props.onChange && this.props.onChange(e)
	},
	render: function(){
		const options = this.props.resources.map((resource) => {
			return (
				<option value={this.props.valueAttr? resource.body[this.props.valueAttr] : resource.id} key={resource.id}>
					{resource[this.props.displayAttr] || resource.body[this.props.displayAttr]}
				</option>)
		})

		if(this.props.allowNoValue){
			options.unshift(
				<option value="undefined" key="empty">
					{this.props.noValueOptionName}
				</option>
			)
		}

		console.log("this.props.disabled", this.props.disabled);
		return (
			<label>
				{this.props.label}
				<select ref="select" onChange={this.handleChange} value={this.props.value} disabled={this.props.disabled || false}>
					{options}
				</select>
			</label>
		)
	}
});

export default ResourceTypeCollection(ResourceSelect);
