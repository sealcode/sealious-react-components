const React = require("react");
const merge = require("merge");
const Loading = require("./loading.js");

const loadCollectionSpecification = require("./mixins/load-collection-specification.js");

const FilterComponents = require("./filter-components/filter-components.jsx");

function createStatelessCollectionFilters(params) {
	/*
	  params = {fields: [{field: "name", label: "Nazwa", hideIf: (query)=>false}]}
	*/

	const Filters = React.createClass({
		renderFilter: function(description) {
			return (
				<li
					className={`filter-list-element resource-filters__filter resource-filters__filter--${description.name} async`}
				>
					{FilterComponents[
						this.props.specification.fields[description.name].type.name
					](
						this.props.specification.fields[description.name],
						description,
						this.props.query,
						value => {
							if (value === FilterComponents.EMPTY_VALUE_ID) value = undefined;
							const new_query = merge.recursive(true, this.props.query, {
								filter: { [description.name]: value },
								pagination: {
									page: 1,
								},
							});
							params.fields
								.map(
									description =>
										description.hideIf
											? description.hideIf(new_query) ? description : false
											: false
								)
								.filter(e => e)
								.forEach(
									description =>
										(new_query.filter[description.name] =
											description.value_when_hidden || undefined)
								);
							this.props.setQuery(new_query);
						}
					)}
				</li>
			);
		},
		render: function() {
			const self = this;
			return (
				<div
					className={`resource-filters resource-filters--${params.collection} filter-${params.collection}`}
				>
					<ul className={params.collection + "-filter resource-filters"}>
						{params.fields
							.filter(
								description =>
									description.hideIf
										? !description.hideIf(self.props.query)
										: true
							)
							.map(this.renderFilter)}
					</ul>
				</div>
			);
		},
	});

	return loadCollectionSpecification(params.collection, Filters, Loading);
}

module.exports = createStatelessCollectionFilters;
