const React = require("react");

const ReactSingleResource = (props) => {
  return (
    <div>
      <input type="text" value={props.body.title} onChange={props.handlers.title}/>
      <button onClick={props.onSubmit}>Save</button>
      <button onClick={props.onDelete}>Delete</button>
    </div>
  )
};

export default ReactSingleResource;
