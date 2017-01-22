const React = require("react");
const StatefulCollection = require("../stateful-collection.js");
const KeyValueStore = require("../stores/key-value-store.js");
const ConnectWithKeyValueStore = require("../stores/connect-with-key-value-store.jsx");
const SingleResource = require("../mixins/singleResource.jsx");


const ResourceFilters = require("../resource-filters/index.jsx");
const PickerResourceList = require("./picker-resource-list.jsx"); 
const PickedResource = require("./picked-resource.jsx");

const View = function(props){
	const chosen_id = props.resource_id;
	return <div>
		<props.filterComponent 
			fields_to_display={props.fields_to_filter}
			control_options={props.filter_control_options}
n			filter_values={props.filter_values}
			onChange={props.onFilterChange}
		/>
		<PickerResourceList 
			collection={props.collection_name}
			filter={props.filter_values}
			display_fields={props.display_fields}
			display_field_formatters={props.display_field_formatters}
			onChange={props.onChange}
			value={chosen_id}
		/>
		<fieldset>
			<legend>Wybrano:</legend>
			{chosen_id?
				<props.pickedResourceComponent
					display_fields={props.display_fields}
					display_field_formatters={props.display_field_formatters}
					url={"/api/v1/collections/" + props.collection_name + "/" + chosen_id}
				/>
				: props.no_choice_message || "Nothing chosen"
			}
		</fieldset>
	</div>;
};

module.exports = function(collection_name){
	
	const FilterComponent = ResourceFilters(collection_name);
	const ConnectedPickedResource = SingleResource(PickedResource);

	const FilterStore = new KeyValueStore(undefined, {});

	return ConnectWithKeyValueStore(
		FilterStore, 
		"filter_values",
		function(props){
			return React.createElement(
				View,
				{
					resource_id: props.resource_id,
					onChange: props.onChange,
					collection_name: collection_name,
					filterComponent: FilterComponent,
					pickedResourceComponent: ConnectedPickedResource,
					filter_values: props.filter_values, //comes from KeyValueStore
					fields_to_filter: props.fields_to_filter,
					filter_control_options: props.filter_control_options,
					display_fields: props.display_fields,
					display_field_formatters: props.display_field_formatters,
					onFilterChange: (key, value)=>FilterStore.set(key, value),
					no_choice_message: props.no_choice_message,
				}
			);
		}
	);
};
