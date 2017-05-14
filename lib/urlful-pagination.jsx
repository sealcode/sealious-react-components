const React = require("react");
const RouterLink = require("./RouterLink.js");
const merge = require("merge");

const UrlfulPagination = function(props) {
    return (
        <ul className="resource-list-pagination" key="navigation">
            <li
                className="btn"
                key="navigation-prev"
                style={{
                    visibility: props.query.pagination.page > 1
                        ? "visible"
                        : "hidden",
                }}
            >
                <RouterLink
                    routeParams={{
                        [props.queryStoreHelpers.url_param_prefix]: JSON.stringify(
                            props.queryStoreHelpers.getCompactQuery(
                                merge.recursive(true, props.query, {
                                    pagination: {
                                        page: (props.query.pagination.page ||
                                            0) - 1,
                                    },
                                })
                            )
                        ),
                    }}
                    onClick={() =>
                        props.helpers.setPage(
                            (props.query.pagination.page || 0) - 1
                        )}
                    key="navigation-prev-anchor"
                >
                    Poprzednia&nbsp;strona
                </RouterLink>
            </li>

            <li
                className="btn"
                key="navigation-next"
                style={{
                    visibility: props.has_next_page ? "visible" : "hidden",
                }}
            >
                <RouterLink
                    routeParams={{
                        [props.queryStoreHelpers.url_param_prefix]: JSON.stringify(
                            props.queryStoreHelpers.getCompactQuery(
                                merge.recursive(true, props.query, {
                                    pagination: {
                                        page: (props.query.pagination.page ||
                                            0) + 1,
                                    },
                                })
                            )
                        ),
                    }}
                    onClick={() =>
                        props.helpers.setPage(
                            (props.query.pagination.page || 0) + 1
                        )}
                    key="navigation-next-anchor"
                >
                    Następna&nbsp;strona
                </RouterLink>
            </li>
        </ul>
    );
};

module.exports = UrlfulPagination;
