const React = require("react");
const merge = require("merge");
const ResourceSelect = require("./ResourceSelect.jsx");
const Loading = require("./loading.js");

const loadCollectionSpecification = require("./mixins/load-collection-specification.js");

const EMPTY_VALUE_ID = "a2e4822a98337283e39f7b60acf85ec9";

const filter_components = {
    text: function(field_specification, description, query, setValue) {
        const regex_prefix = description && description.match_from_start
            ? "^"
            : ".*";

        function wrap_in_regex(string) {
            return regex_prefix + string + ".*";
        }
        function strip_regex(string) {
            return string.slice(regex_prefix.length).slice(0, -2);
        }

        let parsed_value = query[field_specification.name];
        if (parsed_value && parsed_value.regex) {
            parsed_value = strip_regex(parsed_value.regex);
        }

        return (
            <label htmlFor={field_specification.name}>
                {description.label || field_specification.name}
                <input
                    type="text"
                    value={parsed_value}
                    onChange={function(e) {
                        setValue(
                            e.target.value == ""
                                ? undefined
                                : description && description.partial
                                      ? {
                                            regex: wrap_in_regex(
                                                e.target.value
                                            ),
                                        }
                                      : e.target.value
                        );
                    }}
                />
            </label>
        );
    },
    email: function(field_specification, description, query, setValue) {
        return filter_components.text(
            field_specification,
            description,
            query,
            setValue
        );
    },
    enum: function(field_specification, description, query, setValue) {
        return (
            <label htmlFor={description.name}>
                {description.label || description.name}
                <select
                    className="dropdown"
                    id={description.name}
                    name={description.name}
                    onChange={e => setValue(e.target.value)}
                >
                    <option
                        value={EMPTY_VALUE_ID}
                        selected={
                            query.filter &&
                                query.filter[description.name] === ""
                        }
                    >
                        --
                    </option>
                    {field_specification.params.values.map((f, i) => (
                        <option
                            key={i}
                            value={f}
                            selected={
                                query.filter &&
                                    query.filter[description.name] === f
                            }
                        >
                            {description.value_formatter
                                ? description.value_formatter(f)
                                : f}
                        </option>
                    ))}
                </select>
            </label>
        );
    },
    "allow-value-per-role": function(
        field_specification,
        description,
        query,
        setValue
    ) {
        const new_field = {
            name: field_specification.name,
            params: {
                values: Object.keys(field_specification.params.value_to_role),
            },
        };
        return filter_components.enum(new_field, description, query, setValue);
    },
    "role-allow-edit": function(
        field_specification,
        description,
        query,
        setValue
    ) {
        const new_field = {
            name: field_specification.name,
            params: field_specification.params.target_params,
        };
        if (filter_components[field_specification.params.target_field_type]) {
            return filter_components[
                field_specification.params.target_field_type
            ](new_field, description, query, setValue);
        } else {
            return null;
        }
    },
    single_reference: function(
        field_specification,
        description,
        query,
        setValue
    ) {
        return (
            //not wraped in `label because ResourceSelect wraps in `label`
            (
                <ResourceSelect
                    url={
                        "/api/v1/collections/" +
                            field_specification.params.collection
                    }
                    label={description.label || description.name}
                    className="dropdown-large dropdown"
                    displayAttr="name"
                    displayAttrIsSafe={true}
                    value={query.filter && query.filter[description.name]}
                    onValueChange={value =>
                        setValue(
                            value === ""
                                ? description.value_when_empty || ""
                                : value
                        )}
                    sort={{ "body.name.safe": "asc" }}
                    allowNoValue={true}
                    filter={description.filter || {}}
                />
            )
        );
    },
};

function createStatelessCollectionFilters(params) {
    /*
	  params = {fields: [{field: "name", label: "Nazwa", hideIf: (query)=>false}]}
	*/

    const Filters = React.createClass({
        renderFilter: function(description) {
            return (
                <li
                    className={
                        `filter-list-element resource-filters__filter resource-filters__filter--${description.name} async`
                    }
                >
                    {filter_components[
                        this.props.specification.fields[
                            description.name
                        ].type.name
                    ](
                        this.props.specification.fields[description.name],
                        description,
                        this.props.query,
                        value => {
                            if (value === EMPTY_VALUE_ID) value = undefined;
                            const new_query = merge.recursive(
                                true,
                                this.props.query,
                                {
                                    filter: { [description.name]: value },
                                    pagination: {
                                        page: 1,
                                    },
                                }
                            );
                            params.fields
                                .map(
                                    description =>
                                        description.hideIf
                                            ? description.hideIf(new_query)
                                                  ? description
                                                  : false
                                            : false
                                )
                                .filter(e => e)
                                .forEach(
                                    description =>
                                        new_query.filter[
                                            description.name
                                        ] = description.value_when_hidden ||
                                            undefined
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
                    className={
                        `resource-filters resource-filters--${params.collection} filter-${params.collection}`
                    }
                >
                    <ul
                        className={
                            params.collection + "-filter resource-filters"
                        }
                    >
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
