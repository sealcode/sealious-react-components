const React = require("react");
const Router = require("./Router.js");
const PropsFromUrl = require("./mixins/props-from-url.js");

function RouterLink(props, children){
	try{
		let activeIfMatches = props.activeIfMatches || [];
		const active = activeIfMatches && activeIfMatches.length && activeIfMatches
		.map((param_name)=>props.RouterLinkUrlParams[param_name]===props.routeParams[param_name])
		.reduce((a, b) => a && b);
		
		return React.createElement(
			"a",
			{
				href: Router.getUrlForParams(props.routeParams, props.replaceParams),
				className: (props.className || "") + (active? " active" : ""),
				style: props.style,
				onClick: function(e){
					if (props.scrollToRoot !== false) {
						const body = document.querySelector("body");
						if(body.scrollIntoView){
							setTimeout( () => body.scrollIntoView({behavior: "smooth", block: "start"}));
						}else{
							window.scrollTo(0, 0);
						}
					}
					if(e.altKey || e.ctrlKey || e.button === 1){
						// let the browser do its business, e.g. open the link in new window
					} else {
						e.preventDefault();
						Router.setMultipleParams(props.routeParams, props.replaceParams);
					}
				}
			},
			props.children
		);
	}catch(e){console.error(e);}
};

module.exports = PropsFromUrl(RouterLink, "RouterLinkUrlParams");
