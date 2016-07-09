var React = require("react");
var rest = require("qwest");
var merge = require("merge");

var type_collection = require("./resource-type-collection.mixin.jsx");

var Pagination = require("./resource-list-pagination.jsx");

var DefaultRow = React.createClass({
	render: function(){
		try{
			var body = this.props.resource.body;
			var cells = Object.keys(body).map(function(key){
				var content = body[key];
				return (
					<td key={key}>
						{content}
					</td>
				)
			});
			return <tr key={this.props.resource.id}>{cells}</tr>			
		}catch(e){
			console.log(e);
		}
	}
})

var ResourceTable = React.createClass({
	mixins: [type_collection],
	getDefaultProps() {
	    return {
	        rowComponent: DefaultRow  
	    };
	},
	render: function(){
		var self = this;
		try{
			var rows = this.state.resources.map(function(resource){
				return React.createElement(self.props.rowComponent, {
					key: resource.id,
					resource: resource
				});
			})
			return (
				<tbody>
					{rows}
				</tbody>
			)			
		}catch(e){
			console.log(e);
		}
	}
})

module.exports = ResourceTable;
