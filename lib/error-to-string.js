const handlers_by_type = {
	validation: function(error){
		return Object.keys(error.data).map((field_name)=>"  * " + field_name + ": '" + error.data[field_name].message).join("\n");
	}
};


module.exports = function errorToString(error){
	console.log(error);
	let message = "Error:\n";
	console.log(handlers_by_type, error.type, handlers_by_type[error.type]);
	const handler = handlers_by_type[error.type] || function(){return "Unknown error type";};
	message += handler(error);
	return message;
};
