const React = require("react");
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
                    if (
                        Object.prototype.hasOwnProperty.call(
                            nextSource,
                            nextKey
                        )
                    ) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
        }
        return to;
    };
}

const form = function(
    fields,
    onSubmit,
    component,
    default_values,
    clear_on_submit
) {
    if (!default_values) default_values = {};
    return React.createClass({
        getInitialState: function() {
            const body = {};
            for (var i in fields) {
                body[fields[i]] = default_values[fields[i]] || "";
            }
            return {
                body: body,
                submitting: false,
            };
        },
        getChangeFieldFn: function(field_name) {
            const self = this;
            return function(event) {
                let new_value = "";
                if (event.target && event.target.type === "file") {
                    //here we asynchronously append a base64 representation of the image so we can display it before upload
                    const file = event.target.files[0];
                    const reader = new FileReader();

                    reader.addEventListener(
                        "load",
                        function() {
                            file.base64 = reader.result;
                            self.setState({
                                [field_name]: file,
                            });
                        },
                        false
                    );

                    if (file) {
                        reader.readAsDataURL(file);
                    }
                    new_value = event.target.files[0];
                } else if (event.target && event.target.type === "checkbox") {
                    new_value = event.target.checked;
                } else if (event.target && event.target.type !== "checkbox") {
                    new_value = event.target.value;
                } else {
                    new_value = event;
                }
                const current_body = self.state.body;
                current_body[field_name] = new_value;
                self.setState({
                    body: current_body,
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
                self.setState({ submitting: true });
                return Promise.resolve(onSubmit(self.state)).then(function() {
                    self.setState({ submitting: false });
                    if (clear_on_submit) {
                        self.setState({ body: self.getInitialState().body });
                    }
                });
            };
            props.submitting = self.state.submitting;
            return React.createElement(component, props);
        },
    });
};

module.exports = form;
