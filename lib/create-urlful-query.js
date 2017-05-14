const React = require("react");
const merge = require("merge");
const Router = require("./Router.js");

const DEFAULT_PARAMS = {
    inner_class: params => <div />,
    initial_query: {
        pagination: { items: 12, page: 1 },
        calculate: false,
    },
    fixed_query_params: {},
    url_param_prefix: "list",
};

function createUrlfulQuery(params) {
    params = merge(true, DEFAULT_PARAMS, params);

    return React.createClass({
        getInitialState: function() {
            return {
                query: merge.recursive(
                    true,
                    params.initial_query,
                    params.fixed_query_params
                ),
                listener: null,
            };
        },
        setQuery: function(new_query_parts) {
            Router.setParam(
                params.url_param_prefix,
                JSON.stringify(
                    this.compact_query(
                        merge.recursive(
                            merge(true, this.state.query, new_query_parts),
                            params.fixed_query_params
                        ),
                        params.fixed_query_params
                    )
                )
            );
        },
        componentDidMount: function() {
            this.setState({
                listener: Router.onParamChange(
                    params.url_param_prefix,
                    value => {
                        this.setState({
                            query: merge.recursive(
                                JSON.parse(value || "{}"),
                                params.fixed_query_params
                            ),
                        });
                    }
                ),
                query: merge.recursive(
                    JSON.parse(
                        Router.getParam(params.url_param_prefix) || "{}"
                    ),
                    params.fixed_query_params
                ),
            });
        },
        componentWillUnmount: function() {
            Router.removeListener(this.state.listener);
        },
        getUrlForQueryChange: function(new_values) {
            return Router.getUrlForParams({
                [params.url_param_prefix]: this.compact_query(
                    merge(true, this.state.query, new_values)
                ),
            });
        },
        compact_query: function(query, forbidden_values) {
            for (var key in query) {
                if (query[key] && forbidden_values[key]) {
                    if (
                        typeof forbidden_values[key] === "object" &&
                        !(forbidden_values[key] instanceof Array)
                    ) {
                        this.compact_query(query[key], forbidden_values[key]);
                        if (Object.keys(query[key]).length === 0)
                            delete query[key];
                    } else {
                        delete query[key];
                    }
                }
            }
            return query;
        },
        getCompactQuery: function(query_values) {
            return this.compact_query(query_values, params.fixed_query_params);
        },
        render: function() {
            return (
                <params.inner_class
                    query={this.state.query}
                    setQuery={this.setQuery}
                    queryStoreHelpers={{
                        getUrlForQueryChange: this.getUrlForQueryChange,
                        getCompactQuery: this.getCompactQuery.bind(this),
                        url_param_prefix: params.url_param_prefix,
                    }}
                />
            );
        },
    });
}

module.exports = createUrlfulQuery;
