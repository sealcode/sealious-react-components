import React from "react";

const ReactListElement = (props) => {
  return (
    <li>
      <span>{props.resource.body.title}</span>
      <button onClick={props.onDelete}>Delete</button>
    </li>
  );
}

export default ReactListElement;
