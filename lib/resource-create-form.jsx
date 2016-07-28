import React from "react";
import rest from "qwest";
import clone from "clone";

const basicModel = {
	title: 'text',
	content: 'textarea',
	myselect: {
		select: [
			"value1",
			"value2",
			"value3"
		]
	}
};

const ResourceCreateForm = React.createClass({
	getDefaultProps(){
		return {
			model: clone(basicModel)
		}
	},
	generateForm: function(model){
		let formStruct = Object.keys(model).map(function(key){
			//console.log(model[key]);
			if(model[key] == "text"){
				return <input type={model[key]} />
			} else if(model[key] == "textarea"){
				return <textarea />
			} else if(typeof model[key] === "object"){
				if(Object.keys(model[key])[0] == "select"){
					let select = model[key].select;
					let options = select.map((option) => {
						return <option value={option}>{option}</option>
					});
					return (
						<select>
							{options}
						</select>
					)
				}
			}
		});
		return formStruct;
	},
	render: function(){

		let formStruct = this.generateForm(this.props.model)

		return (
			<div>
				{formStruct}
			</div>
		)
	}
})

export default ResourceCreateForm;
