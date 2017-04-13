const EventEmitter = require("event-emitter");
const ee = new EventEmitter();

module.exports = {
    on: function(event_name, callback) {
        return ee.on(event_name, callback);
    },
    off: function(event_name, listener) {
        return ee.off(event_name, listener);
    },
    emit: function(event_name, data) {
        return ee.emit(event_name, data);
    },
};
