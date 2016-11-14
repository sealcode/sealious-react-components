const React = require("react");
const CachedHttp = require("../cached-http.js");
const merge = require("merge");

function loadCollectionSpecification(collection_name, component){
	const loadCollectionSpecificationMixin = React.createClass({
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
			try {
			if(this.state.loaded){
				const props = merge(true, this.props, {specification: this.state.specification});
				return React.createElement(component, props);
			}else{
				return React.createElement("div", {}, "loading...");
			}
		}
		catch(e) {
			console.log(e);
		}
		}
	});
	return loadCollectionSpecificationMixin;
}

module.exports = loadCollectionSpecification;
