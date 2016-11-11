const React = require("react");

const Pagination = function(props){
	try{
		return (
			<ul className="resource-list-pagination">
				<li
					className="btn"
					style={{visibility: props.hasPrev? "visible" : "hidden"}}
				>
					<a href={props.prevPageUrl} onClick={props.onPrev}>
						&#x25C0; poprzednie
					</a>
				</li>

				<li
					className="btn"
					style={{visibility: props.hasNext? "visible" : "hidden"}}
				>
					<a href={props.nextPageUrl} onClick={props.onNext}>
						następne &#x25B6;
					</a>
				</li>
			</ul>
		);
	}catch(e){
		console.error(e);
	}
};

module.exports = Pagination;
