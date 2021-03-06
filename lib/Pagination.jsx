const React = require("react");

const Pagination = function(props){
	try{
		return (
			<ul className="resource-list-pagination" key="navigation">
				<li
					className="btn"
					key="navigation-prev"
					style={{visibility: props.hasPrev? "visible" : "hidden"}}
				>
					<a href={props.prevPageUrl} onClick={props.onPrev} key="navigation-prev-anchor">
						Poprzednia&nbsp;strona
					</a>
				</li>

				<li
					className="btn"
					key="navigation-next"
					style={{visibility: props.hasNext? "visible" : "hidden"}}
				>
					<a href={props.nextPageUrl} onClick={props.onNext} key="navigation-next-anchor">
						Następna&nbsp;strona
					</a>
				</li>
			</ul>
		);
	}catch(e){
		console.error(e);
	}
};

module.exports = Pagination;
