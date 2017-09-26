const React = require("react");
const CachedHttp = require("./cached-http.js");

module.exports = React.createClass({
	displayName: "resourceView",
	getDefaultProps() {
		return {
			view: props =>
				<span>
					{props.loading ? "" : props.resource.body.name}
				</span>,
			collection: "",
			id: ""
		};
	},
	getInitialState() {
		return {
			loading: true,
			resource: { body: {} }
		};
	},
	componentDidMount() {
		CachedHttp.get(
			`/api/v1/collections/${this.props.collection}/${this.props.id}`
		).then(response =>
			this.setState({ loading: false, resource: response })
		);
	},
	render() {
		return this.props.view(this.state);
	}
});
