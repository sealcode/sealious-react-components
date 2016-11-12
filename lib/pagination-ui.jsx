const React = require("react");


module.exports = function PaginationUI(props){
	return (
	<ul className="resource-list-pagination" key="navigation">
		<li
			className="btn"
			key="navigation-prev"
			style={{visibility: props.hasPrev? "visible" : "hidden"}}
		>
			<a href={props.prevPageUrl} onClick={props.onPrev} key="navigation-prev-anchor">
				&#x25C0; poprzednie
			</a>
		</li>
		<li
			className="btn"
			key="navigation-next"
			style={{visibility: props.hasNext? "visible" : "hidden"}}
		>
			<a href={props.nextPageUrl} onClick={props.onNext} key="navigation-next-anchor">
				następne &#x25B6;
			</a>
		</li>
	</ul>
	);
};
