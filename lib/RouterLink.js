const React = require("react");
const Router = require("./Router.js");
const PropsFromUrl = require("./mixins/props-from-url.js");

function is_new_tab_intent(event) {
	return event.altKey || event.ctrlKey || event.button === 1;
}

function RouterLink(props, children) {
	try {
		let activeIfMatches = props.activeIfMatches || [];
		const active =
			activeIfMatches &&
			activeIfMatches.length &&
			activeIfMatches
				.map(
					param_name =>
						props.RouterLinkUrlParams[param_name] ===
						props.routeParams[param_name]
				)
				.reduce((a, b) => a && b);

		return React.createElement(
			"a",
			{
				href: Router.getUrlForParams(props.routeParams, props.replaceParams),
				className: (props.className || "") + (active ? " active" : ""),
				style: props.style,
				title: props.title,
				onClick: function(e) {
					if (props.scrollToRoot !== false && !is_new_tab_intent(e)) {
						const body = document.querySelector("body");
						if (body.scrollIntoView) {
							setTimeout(
								() =>
									body.scrollIntoView({
										behavior: "smooth",
										block: "start",
									}),
								0
							);
						} else {
							window.scrollTo(0, 0);
						}
					}
					if (is_new_tab_intent(e)) {
						// let the browser do its business, e.g. open the link in new window
					} else {
						e.preventDefault();
						Router.setMultipleParams(props.routeParams, props.replaceParams);
					}
				},
			},
			props.children
		);
	} catch (e) {
		console.error(e);
	}
}

module.exports = PropsFromUrl(RouterLink, "RouterLinkUrlParams");
