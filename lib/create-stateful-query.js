const React = require("react");
const merge = require("merge");

const DEFAULT_PARAMS = {
    inner_class: params => <div />,
    initial_query: {
        pagination: { items: 12, page: 1 },
        calculate: false,
    },
    fixed_query_params: {},
};

function createStatefulQuery(params) {
    params = merge(true, DEFAULT_PARAMS, params);

    return React.createClass({
        getInitialState: function() {
            return params.initial_query;
        },
        setQuery: function(new_query_parts) {
            this.setState(
                merge(true, new_query_parts, params.fixed_query_params)
            );
        },
        render: function() {
            return (
                <params.inner_class
                    query={this.state}
                    setQuery={this.setQuery}
                />
            );
        },
    });
}

module.exports = createStatefulQuery;
