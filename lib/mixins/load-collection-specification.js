const React = require("react");
const CachedHttp = require("../cached-http.js");

function loadCollectionSpecification(collection_name, component){
	return React.createClass({
		getInitialState: function(){
			return {
				specification: {},
				loaded: false,
			};
		},
		componentDidMount: function(){
			const self = this;
			CachedHttp.get("/api/v1/specifications/" + collection_name)
			.then(function(data){
				self.setState({
					specification: data,
					loaded: true
				});
			});
		},
		render: function(){
			if(this.state.loaded){
				const props = merge(true, this.props, {specification: this.state.specification});
				return React.createElement(component, props);
			}else{
				return React.createElement("div", {}, "loading...");
			}
		}
	});
}

module.exports = loadCollectionSpecification;
