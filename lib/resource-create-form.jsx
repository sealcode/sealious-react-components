var React = require("react");
var qwest = require('qwest');
var clone = require("clone");

var basicModel = {
	title: 'text',
	content: 'textarea'
};

var ResourceCreateForm = React.createClass({
	getDefaultProps(){
		return {
			model: clone(basicModel)
		}
	},
	render: function(){
		var model = this.props.model;

		var formStruct = Object.keys(model).map(function(key){
			console.log(model[key]);
		});

		return (
			<div>

			</div>
		)
	}
})

module.exports = ResourceCreateForm;
