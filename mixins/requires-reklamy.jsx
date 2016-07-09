var rest = require("qwest");

module.exports = {
	getInitialState() {
	    return {
	        reklamy_data_loaded: false,
	        reklamy_data: null,
	    };
	},
	componentDidMount() {
		var self = this;
		rest.get("/api/v1/resources/kategoria-wystawcy", {
			filter: {
				name: "Reklamy"
			}
		}).then(function(xml, data){
			self.setState({
				reklamy_data_loaded: true,
				reklamy_data: data[0]
			})
		});
	},

}
