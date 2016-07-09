var React = require("react");

var Session = require("../../../session.js");

module.exports = {
	getInitialState() {
	    return {
	        is_admin: false,
	        is_advertiser: undefined,
	        user_data_loaded: false  
	    };
	},
	componentDidMount: function(){
		var self = this;
		Session.get_user_data()
		.then(function(user_data){
			self.setState({
				is_admin: user_data.body.role === "admin",
				is_advertiser: user_data.body.role === "advertiser",
				user_data: user_data,
				user_data_loaded: true
			})
			setTimeout(function(){
				self.onUserDataLoaded && self.onUserDataLoaded();
			})
		})
	}
}
