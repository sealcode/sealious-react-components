import React from 'react';

export default (props) => {
  try{
  return (
    <div>
      <input type="text" value={props.body.title} onChange={props.handlers.title}/>
      <button onClick={props.onSubmit}>Save</button>
      <button onClick={props.onDelete}>Delete</button>
    </div>
  )
}catch(e){console.error(e)}
};
