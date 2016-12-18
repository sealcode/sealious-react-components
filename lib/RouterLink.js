const React = require("react");
const Router = require("./Router.js");

function RouterLink(props, children){
	try{
		return React.createElement(
			"a",
			{
				href: Router.getUrlForParams(props.routeParams, props.replaceParams),
				className: props.className,
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

module.exports = RouterLink;
