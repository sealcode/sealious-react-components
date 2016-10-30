//this file is written in plain js, to ease the transition to no-transpiler setup
const React = require("react");
const clone = require("clone");
const rest = require("qwest");
const form = require("./form.js");

module.exports = function(component){
	return form(
		["username", "password"],
		function(values){
			return rest.post("/api/v1/sessions", values);
		},
		component
	);
};
