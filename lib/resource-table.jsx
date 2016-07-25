var React = require("react");
var rest = require("qwest");
var merge = require("merge");

var type_collection = require("./mixins/resource-type-collection.jsx");

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
	getInitialState: function() {
		return {
			page: 1,
		};
	},
	wrap: function(method, resource){
		return method.bind(this, resource);
	},
	nextPage: function(){
		this.setState({
			pagination: merge(this.state.pagination, {page: this.state.pagination.page + 1})
		});
		this.refresh();
	},
	prevPage: function(){
		this.setState({
			pagination: merge(this.state.pagination, {page: this.state.pagination.page - 1})
		});
		this.refresh();
	},
	render: function(){
		var self = this;

		var pagination = null;
		if(this.props.paginate){
			var pagination = <Pagination
				hasPrev={this.state.pagination.page!=1}
				hasNext={this.state.resources.length == (this.props.itemsPerPage != null ? this.props.itemsPerPage : this.state.pagination.items)}
				onPrev={this.prevPage}
				onNext={this.nextPage}
			/>
		}

		try{
			var rows = this.state.resources.map(function(resource){
				return React.createElement(self.props.rowComponent, {
					key: resource.id,
					resource: resource
				});
			});

			if(self.state.loading){
				return (<div>Loading...</div>)
			} else if(!self.state.loading){
				return (
					<div>
						{pagination}
						<tbody>
							{rows}
						</tbody>
						{pagination}
					</div>
				)
			}


		}catch(e){
			console.log(e);
		}
	}
})

module.exports = ResourceTable;
