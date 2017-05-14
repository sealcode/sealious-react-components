const React = require("react");

module.exports = function(props) {
    return (
        <div className="simple-error">
            <h2>Wystąpił błąd</h2>
            <code>{props.error_data.statusCode} {props.error_data.error}</code>
            <p>
                Treść błędu:<br />
                <code>
                    {props.error_data.message}
                </code>
            </p>
        </div>
    );
};
