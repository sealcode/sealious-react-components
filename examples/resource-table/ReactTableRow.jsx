import React from "react";

const ReactTableRow = (props) => {
  const resource = props.resource.body;
  const cells = Object.keys(resource).map((key) => {
  	const content = resource[key];
  	return (
  		<td key={key}>
  			{content}
  		</td>
  	)
	});
  return <tr key={props.resource.id}>{cells}</tr>;
}

export default ReactTableRow;
