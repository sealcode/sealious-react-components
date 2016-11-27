const React = require("react");
const CachedHttp = require("./cached-http.js");
const merge = require("merge");
const clone = require("clone");
const qwest = require("qwest");

function statefulCollection(component){
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

			const to_merge = ["filter", "pagination", "sort", "format"];

			for(const i in to_merge){
				const prop = to_merge[i];
				query[prop] = merge(true, props[prop], self.state[prop]);
			}

			if(props.page){
				query.pagination.page = props.page;
			}

			if(query.filter){
				for(const i in query.filter){
					if(query.filter[i]=="undefined" || query.filter[i]===null){
						delete query.filter;
					}
				}
			}

			query.search = self.props.search || self.state.search;

			return query;
		},
		fetch: function(query){
			const self = this;
			self.setState({
				loading: true
			});
			return CachedHttp.get(
				"/api/v1/collections/" + self.props.collection,
				query,
				{cache: true}
			)
			.then((response) => {
				response = response.map(self.props.preprocessEach);
				try{
					self.setState({
						loading: false,
						resources: response,
					});
				}catch(e){
					//sometimes when using qwest and certain type of components React swallows the error. We catch it here so it can be easilly accessed. See https://github.com/facebook/react/issues/8430 for bug status
					console.error(e);
				}
			});
		},
		refresh: function(force){
			let query = this.generateQuery(this.props);
			this.fetch(query);
		},
		componentDidMount: function(){
			this.refresh();
		},
		componentWillReceiveProps: function(next_props) {
			console.log(next_props);
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
		setFilter: function(filter){
			const self = this;
			self.setState({filter: filter});
			setTimeout( () => self.refresh(), 0);
		},
		setPage: function(page_number){
			const self = this;
			const pagination = merge(true, self.props.pagination, self.state.pagination);
			pagination.page = page_number;
			self.setState({pagination: pagination});
			setTimeout( () => self.refresh(), 0);
		},
		render: function(){
			const self = this;
			const query = self.generateQuery();
			return React.createElement(
				component,
				{
					setPage: self.setPage,
					setFilter: self.setFilter,
					resources: self.state.resources,
					page_number: parseInt(query.pagination.page),
					loading: self.state.loading,
					loaded: !self.state.loading,
				}
			);
		}
	});

	return StatefulCollectionMixin;
};

module.exports = statefulCollection;
