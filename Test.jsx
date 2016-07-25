import React from 'react';

export default class Test extends React.Component{
  /*constructor(props){
    super(props);
    console.log(props);
    console.log(this.props.resource.body.title);
  }*/

  render(){
    return (
      <li>
        <span>{this.props.resource.body.title}</span>
        <button onClick={this.props.onDelete}>Delete</button>
      </li>
    )
  }
}
