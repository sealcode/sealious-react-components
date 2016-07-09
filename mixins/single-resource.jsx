var rest = require("qwest");

// rest.setDefaultDataType('formdata');

var clone = require("clone");

module.exports = {
	getInitialState: function() {
	    return {
	          loaded: false,
	          resource: null,
	          temp_body: {}
	    };
	},
	refresh: function(){
		var self = this;
		var url = (this.static && this.static.url) || (this.getUrl && this.getUrl());

		var query = {};

		if(this.getFormat){
			query.format = this.getFormat();
		}

		rest.get(url, query, {responseType: "json"})
		.then(function(xml, data){
			self.setState({
				loaded: true,
				resource: data,
				temp_body: clone(data.body)
			});
			if(self.onDataReceive){
				self.onDataReceive();
			}
		});
	},
	componentDidMount: function(){
		this.refresh();
	},
	update: function(e){
		e && e.preventDefault();
		var temp_body = clone(this.state.temp_body);
		console.log(temp_body);
		for(var i in temp_body){
			var ignored_fields = this.state.ignoreFieldUpdate || (this.static && this.static.ignoreFieldUpdate);
			var is_ignored = ignored_fields && ignored_fields.indexOf(i)!==-1
			if(temp_body[i]=="" || temp_body[i] === null || is_ignored || temp_body[i]=="undefined" || temp_body[i]===undefined){
				delete temp_body[i];
			}
		}
		var url = (this.static && this.static.url) || (this.getUrl && this.getUrl());
		return rest.map("patch", url, temp_body)
	},
	getFieldChangeHandler: function(field_name){
		var self = this;
		return function(e){
			var temp_body = clone(self.state.temp_body);
			if(e.preventDefault){
				//e.preventDefault();
				temp_body[field_name] = e.target.value;
			}else{
				temp_body[field_name] = e;
			}
			self.setState({temp_body: temp_body});
		}
	}
}
