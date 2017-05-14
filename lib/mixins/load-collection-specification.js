const React = require("react");
const CachedHttp = require("../cached-http.js");
const merge = require("merge");

function loadCollectionSpecification(
    collection_name,
    component,
    loading_component
) {
    const loadCollectionSpecificationMixin = React.createClass({
        getInitialState: function() {
            return {
                specification: {},
                loaded: false,
            };
        },
        componentDidMount: function() {
            const self = this;
            CachedHttp.get(
                "/api/v1/specifications/" + collection_name
            ).then(function(data) {
                self.setState({
                    specification: data,
                    loaded: true,
                });
            });
        },
        render: function() {
            if (this.state.loaded) {
                const props = merge(true, this.props, {
                    specification: this.state.specification,
                });
                return React.createElement(component, props);
            } else {
                return loading_component
                    ? React.createElement(loading_component)
                    : React.createElement("div", {}, "loading...");
            }
        },
    });
    return loadCollectionSpecificationMixin;
}

module.exports = loadCollectionSpecification;
