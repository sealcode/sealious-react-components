const React = require("react");
const RouterLink = require("./RouterLink.js");
const merge = require("merge");

const DEFAULT_PAGINATION = {
	page: 1,
	items: 12,
};

const UrlfulPagination = function(props) {
	const pagination_info = props.query.pagination || DEFAULT_PAGINATION;
	return (
		<ul className="resource-list-pagination" key="navigation">
			<RouterLink
				routeParams={{
					[props.queryStoreHelpers.url_param_prefix]: JSON.stringify(
						props.queryStoreHelpers.getCompactQuery(
							merge.recursive(true, props.query, {
								pagination: {
									page: (pagination_info.page || 0) - 1,
								},
							})
						)
					),
				}}
				onClick={() => props.helpers.setPage((pagination_info.page || 0) - 1)}
				key="navigation-prev-anchor"
				className="btn"
				key="navigation-prev"
				style={{
					visibility: pagination_info.page > 1 ? "visible" : "hidden",
				}}
			>
				Poprzednia&nbsp;strona
			</RouterLink>

			<RouterLink
				routeParams={{
					[props.queryStoreHelpers.url_param_prefix]: JSON.stringify(
						props.queryStoreHelpers.getCompactQuery(
							merge.recursive(true, props.query, {
								pagination: {
									page: (pagination_info.page || 1) + 1,
								},
							})
						)
					),
				}}
				onClick={() => props.helpers.setPage((pagination_info.page || 1) + 1)}
				key="navigation-next-anchor"
				className="btn"
				key="navigation-next"
				style={{
					visibility: props.has_next_page ? "visible" : "hidden",
				}}
			>
				Następna&nbsp;strona
			</RouterLink>
		</ul>
	);
};

module.exports = UrlfulPagination;
