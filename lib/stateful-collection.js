const React = require("react");
const CachedHttp = require("./cached-http.js");
const merge = require("merge");
const clone = require("clone");
const qwest = require("qwest");
const SimpleError = require("./simple-error.jsx");

function statefulCollection(component, ErrorClass){

	if(!ErrorClass) ErrorClass = SimpleError;

	const StatefulCollectionMixin = React.createClass({
		getDefaultProps: function(){
			return {
				collection: "users",
				filter: {},
				pagination: {
					page: 1,
					items: 12,
				},
				search: undefined,
				format: {},
				sort: {},
				preprocessEach: (e)=>e,
			};
		},
		getInitialState: function(){
			return {
				filter: {},
				pagination: {},
				search: undefined,
				sort: {},
				resources: [],
				loading: true,
			};
		},
		generateQuery: function(){
			let query = {};
			const self = this;
			const props = self.props;

			const to_merge = ["filter", "pagination", "sort", "format", "calculate"];

			for(const i in to_merge){
				const prop = to_merge[i];
				if(typeof self.state[prop] == "object"){
					query[prop] = merge(true, props[prop], self.state[prop]);
				}else{
					query[prop] = self.props[prop];
				}
			}

			if(props.page){
				query.pagination.page = props.page;
			}
			
			if(query.filter){
				for(const i in query.filter){
					if(query.filter[i]=="undefined" || query.filter[i]===null || query.filter == ""){
						delete query.filter[i];
					}
				}
			}

			query.search = self.props.search || self.state.search;

			if(query.pagination.items) query.pagination.items++;

			return query;
		},
		fetch: function(query){
			const self = this;
			if (self.state.loading && self.state.get_promise) {
				self.state.get_promise.cancel();
			}
			self.setState({
				loading: true
			});
			const get_promise = CachedHttp.get(
				"/api/v1/collections/" + self.props.collection,
				query,
				{cache: true}
			)
			.then((response) => {
				const hasNext = response.length == query.pagination.items;
				response = response
				.map(self.props.preprocessEach)
				.slice(0, query.pagination.items-1 || Infinity);
				if(self.props.customSort){
					response=response.sort(self.props.customSort);
				}
				try{
					self.setState({
						loading: false,
						resources: response,
						hasNext: hasNext,
						get_promise: false,
					});
				}catch(e){
					//sometimes when using qwest and certain type of components Qwest swallows the error. We catch it here so it can be easilly accessed. 
					console.error(e);
				}
			})
			.catch({name: "CancellationError"}, function(){
				self.fetch(query);
			})
			.catch(function(e, xml, error_data){
				try{
					console.error("ERROR!", e, xml, error_data);
					self.setState({
						error: true,
						error_data: error_data || {message: e.message},
					});
				}catch(e){
					console.error(e);
				}
			});
			self.setState({
				get_promise: get_promise
			});
			return get_promise;
		},
		refresh: function(force){
			let query = this.generateQuery(this.props);
			this.fetch(query);
		},
		componentDidMount: function(){
			this.refresh();
		},
		componentWillReceiveProps: function(next_props) {
			setTimeout(() => {
				this.refresh();
			}, 0);
		},
		delete: function(resource){
			qwest.delete(this.props.url + "/" + resource.id, {}, {cache: true})
			.then(() => {
				this.refresh(true);
			});
		},
		setElementsNumber: function(event) {
			this.setState({pagination: { items: event.target.value }});
			setTimeout( () => this.refresh(), 0);
		},
		setSearch: function(search) {
			const self = this;
			self.setState({
				search: search,
				pagination: merge(true, self.state.pagination, {page: 1})
			});
			setTimeout( () => self.refresh(), 0);
		},
		setFilter: function(filter){
			const self = this;
			self.setState({
				filter: filter, 
				pagination: merge(true, this.state.pagination, {page: 1}),
			});
			setTimeout( () => self.refresh(), 0);
		},
		setFilterField: function(field_name, value){
			const self = this;
			let new_filter;
			if(value === undefined || value === ""){
				new_filter = self.state.filter;
				delete new_filter[field_name];
			}else{
				new_filter = merge(true, self.state.filter, {[field_name]: value});
			}
			self.setState({
				filter: new_filter,
				pagination: merge(true, self.state.pagination, {page: 1}),
			});
			setTimeout( () => self.refresh(), 0);
		},
		setPage: function(page_number){
			console.log("setpage!", page_number);
			const self = this;
			const pagination = merge(true, self.props.pagination, self.state.pagination);
			pagination.page = page_number;

			self.setState({
				pagination: pagination,
				// pagination: merge(true, this.state.pagination, {page: 1})
			});
			setTimeout( () => self.refresh(), 0);
		},
		setSort: function(sort) {
			const self = this;	
			self.setState({sort: sort});
			setTimeout( () => self.refresh(), 0);
		},
		render: function(){
			const self = this;
			const query = self.generateQuery();

			if(this.state.error){
				return React.createElement(
					ErrorClass,
					{
						error_data: this.state.error_data
					}
				);
			}

			const child_props = merge(true,
				{
					setPage: self.setPage,
					setFilter: self.setFilter,
					setSearch: self.setSearch,
					setFilterField: self.setFilterField,
					setSort: self.setSort,
					filter: self.state.filter,
					resources: self.state.resources,
					page_number: parseInt(query.pagination.page),
					loading: self.state.loading,
					loaded: !self.state.loading,
					setElementNumber: self.setElementsNumber,
					hasNext: self.state.hasNext,
				},
				self.props.passProps || {}
			);

			return React.createElement(
				component,
				child_props
			);
		}
	});

	return StatefulCollectionMixin;
};

module.exports = statefulCollection;
