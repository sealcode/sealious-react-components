const React = require("react");
const clone = require("clone");
const merge = require("merge");

if (typeof Object.assign != "function") {
  Object.assign = function(target, varArgs) {
    // .length of function is 2
    "use strict";
    if (target == null) {
      // TypeError if undefined or null
      throw new TypeError("Cannot convert undefined or null to object");
    }

    var to = Object(target);

    for (var index = 1; index < arguments.length; index++) {
      var nextSource = arguments[index];

      if (nextSource != null) {
        // Skip over if undefined or null
        for (var nextKey in nextSource) {
          // Avoid bugs when hasOwnProperty is shadowed
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  };
}

const form = function(fields, onSubmit, component) {
  return React.createClass({
    getInitialState: function() {
      const body = {};
      for (var i in fields) {
        body[fields[i]] = "";
      }
      return { body: body };
    },
    getChangeFieldFn: function(field_name) {
      const self = this;
      return function(event) {
        const diff = {};
        if (event.target && event.target.type === "file") {
          diff[field_name] = event.target.files[0];
        } else if (event.target && event.target.type === "checkbox") {
          diff[field_name] = event.target.checked;
        } else if (event.target && event.target.type !== "checkbox") {
          diff[field_name] = event.target.value;
        } else {
          diff[field_name] = event;
        }
        self.setState({
          body: merge(self.state.body, diff)
        });
      };
    },
    render: function() {
      const self = this;
      const props = Object.assign({}, this.state);
      props.handlers = {};
      for (const i in fields) {
        props.handlers[fields[i]] = this.getChangeFieldFn(fields[i]);
      }
      props.onSubmit = function(e) {
        e.preventDefault();
        onSubmit(self.state);
      };
      return React.createElement(component, props);
    }
  });
};

module.exports = form;
