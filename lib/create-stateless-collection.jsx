const React = require("react");
const merge = require("merge");
const CachedHttp = require("./cached-http.js");
const SimpleError = require("./simple-error.jsx");
const Loading = require("./loading.js");

const DEFAULT_PARAMS = {
    collection: "",
    inner_class: props => (
        <div>{props.answer.map(resource => resource.id).join(", ")}</div>
    ),
    error_class: SimpleError,
    loading_class: Loading,
    show_loading: false,
};

function createStatelessQueryCollection(params) {
    params = merge(true, DEFAULT_PARAMS, params);

    return React.createClass({
        displayName: params.collection + "-statelessQuery-collection",
        getInitialState: function() {
            return {
                loaded: false,
                last_query: null,
                answer: [],
                resources: [],
                error: false,
                current_promise: null,
                has_next_page: false,
            };
        },
        refresh: function() {
            const self = this;
            if (!self.state.loaded && self.state.current_promise !== null)
                self.state.current_promise.cancel();
            //timeout is needed here because cancellation callback in CachedHttp are handled asynchronously, so if we ran CachedHttp without delegation it would consume a cancelled promise
            setTimeout(
                () => {
                    const query = self.props.query;
                    let promise = CachedHttp.get(
                        "/api/v1/collections/" + params.collection,
                        merge.recursive(true, query, {
                            pagination: { forward_buffer: 1 },
                        })
                    )
                        .then(function(data) {
                            self.setState({
                                answer: data,
                                resources: data.slice(
                                    0,
                                    self.props.query.pagination.items
                                ),
                                has_next_page: data.length >
                                    self.props.query.pagination.items,
                                loaded: true,
                                current_promise: null,
                                last_query: JSON.stringify(query),
                            });
                        })
                        .catch(function(error) {
                            console.error(error);
                            self.setState({ error: error });
                        });
                    self.setState({
                        error: false,
                        loaded: false,
                        current_promise: promise,
                    });
                },
                0
            );
        },
        componentDidMount: function() {
            const self = this;
            self.refresh();
        },
        componentWillReceiveProps: function() {
            setTimeout(this.refresh, 0);
        },
        generateHelpers: function() {
            const self = this;
            return {
                setPage: function(page) {
                    self.props.setQuery({
                        pagination: merge(true, self.props.query.pagination, {
                            page: Math.max(0, parseInt(page)),
                        }),
                    });
                },
            };
        },
        render: function() {
            const self = this;
            if (self.state.error) {
                return <params.error_class error_data={self.state.error} />;
            }
            if (!self.state.loaded && params.show_loading)
                return <params.loading_class />;
            return (
                <params.inner_class
                    answer={self.state.answer}
                    resources={self.state.resources}
                    loaded={self.state.loaded}
                    loading={!self.state.loaded}
                    has_next_page={self.state.has_next_page}
                    query={self.props.query}
                    setQuery={self.props.setQuery}
                    helpers={self.generateHelpers()}
                    queryStoreHelpers={self.props.queryStoreHelpers}
                />
            );
        },
    });
}

module.exports = createStatelessQueryCollection;
