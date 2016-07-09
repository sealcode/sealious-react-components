var React = require("react");

var Toast = {
	getInitialState() {
	    return {
	        messages: []
	    };
	},
	setToast(message){
		this.setState({
			messages: [message]
		})
	},
	displayToast(){
		return (
			<div>{this.state.messages[0]}</div>
		)
	}
}

module.exports = Toast;
