var rest = require("qwest");
var merge = require("merge");
var deep_equal = require("deep-equal");
var clone = require("clone");

var Promise = require("bluebird");

var default_pagination = {
	page: 1,
	items: 12
}

module.exports = {
	getInitialState: function() {
	    return {
	        resources: [],
	        last_loaded: -Infinity,
	        last_query: {},
	        //pagination: clone(default_pagination),
					pagination: (this.props.itemsPerPage != null ? {page:1, items: this.props.itemsPerPage} : clone(default_pagination)),
	    };
	},
	getDefaultProps() {
	    return {
	        paginate: false,
	        filter: {},
	        format: {},
	        search: "",
	    };
	},
	generateQuery: function(props){

		var query = {};

		if(props.paginate){
			query.pagination = this.state.pagination;
		}

		if(props.search){
			query.search = props.search;
		}

		if(props.filter){
			query.filter = props.filter;
			for(var i in query.filter){
				if(query.filter[i]=="undefined" || query.filter[i]===null){
					delete query.filter
				}
			}
		}

		if(props.sort){
			query.sort = props.sort;
		}

		if(props.format){
			query.format = props.format;
		}
		return query;
	},
	reloadNeeded: function(query){
		return !deep_equal(query, this.state.last_query);
	},
	paginationResetNeeded: function(query){
		if(deep_equal(query.pagination, default_pagination)){
			return false;
		}
		for(var attr in query){
			if(attr != "pagination"){
				if(!deep_equal(query[attr], this.state.last_query[attr])){
					return true;
				}
			}
		}
		return false;
	},
	resetPagination: function(cb){
		this.setState({
			pagination: (this.props.itemsPerPage != null ? {page:1, items: this.props.itemsPerPage} : clone(default_pagination))
		}, cb)
	},
	fetch: function(query){
		var self = this;
		self.setState({
			loading: true
		})
//		console.log(self.props.url);
		return rest.get(self.props.url, query, {cache: true})
		.then(function(xml, response){
			self.setState({
				loading: false,
				resources: response,
				last_query: clone(query)
			})
		})

	},
	refresh: function(force){
		var self = this;
		console.log('refresh');
		var query = this.generateQuery(this.props);

		if(self.paginationResetNeeded(query)){
			console.log("pagination reset needed!");
			self.resetPagination(function(){
				console.log("pagination has been reset!");
				self.fetch(query);
			})
			return;
		}
		if(force || self.reloadNeeded(query)){
			return self.fetch(query);
		}else{
			return Promise.resolve();
		}
	},
	componentDidMount: function(){
		this.refresh();
	},
	componentWillReceiveProps: function(next_props) {
		var self = this;
		setTimeout(function(){
			self.refresh();
		}, 0)
	},
	delete: function(resource){
		var self = this;
		rest.delete(self.props.url + "/" + resource.id, {}, {cache: true})
		.then(function(){
			console.log('dweleteuje');
			self.refresh(true);
		})
	}
}
