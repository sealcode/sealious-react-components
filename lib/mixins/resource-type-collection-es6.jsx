import React from "react";
import rest from "qwest";
import merge from "merge";
import deep_equal from "deep-equal";
import clone from "clone";
import promise from "bluebird";

const default_pagination = {
	page: 1,
	items: 12
}

export default function ResourceTypeCollection(ComponentClass){
	return React.createClass({

		getInitialState: function() {
		    return {
		        resources: [],
		        last_loaded: -Infinity,
		        last_query: {},
						pagination: (this.props.itemsPerPage != null ? {page:1, items: this.props.itemsPerPage} : clone(default_pagination)),
		    };
		},
		getDefaultProps: function() {
		    return {
		        paginate: false,
		        filter: {},
		        format: {},
		        search: "",
		    };
		},
		generateQuery: function(props){

			let query = {};

			if(props.paginate){
				query.pagination = this.state.pagination;
			}
			if(props.search){
				query.search = props.search;
			}
			if(props.filter){
				query.filter = props.filter;
				for(let i in query.filter){
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
			for(let attr in query){
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
			this.setState({
				loading: true
			});
			return rest.get(this.props.url, query, {cache: true})
			.then((xml, response) => {
				this.setState({
					loading: false,
					resources: response,
					last_query: clone(query)
				})
			})
		},
		refresh: function(force){
			let query = this.generateQuery(this.props);
			if(this.paginationResetNeeded(query)){
				console.log("pagination reset needed!");
				this.resetPagination(() => {
					console.log("pagination has been reset!");
					this.fetch(query);
				})
				return;
			}
			if(force || this.reloadNeeded(query)){
				return this.fetch(query);
			}else{
				return Promise.resolve();
			}
		},
		componentDidMount: function(){
			this.refresh();
		},
		componentWillReceiveProps: function(next_props) {
			setTimeout(() => {
				this.refresh();
			}, 0)
		},
		delete: function(resource){
			rest.delete(this.props.url + "/" + resource.id, {}, {cache: true})
			.then(() => {
				this.refresh(true);
			})
		},
		nextPage: function(){
			this.setState({
				pagination: merge(this.state.pagination, {page: this.state.pagination.page + 1})
			});
			this.refresh();
		},
		prevPage: function(){
			this.setState({
				pagination: merge(this.state.pagination, {page: this.state.pagination.page - 1})
			});
			this.refresh();
		},
		render: function(){
			const customProps = {
				resources: this.state.resources,
				pagination: this.state.pagination,
				loading: this.state.loading,
				delete: this.delete,
				refresh: this.refresh,
				nextPage: this.nextPage,
				prevPage: this.prevPage
			}

			return <ComponentClass {...this.props} {...customProps} />
		}
	});
}
