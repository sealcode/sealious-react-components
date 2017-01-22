const React = require('react');
const EventEmitter = require('event-emitter');

const KeyValueStore = function(name, initial_values){
	const self = this;
	var ee = new EventEmitter();
	this.on = ee.on.bind(ee);
	this.off = ee.off.bind(ee);
	this.once = ee.once.bind(ee);
	this.emit = ee.emit.bind(ee);

	this.name = name;

	let store = initial_values || {};

	this.set = function(key, value){
		store[key]=value;
		ee.emit("change", store);
	};

	this.setters = {};
	this.change_handlers = {};
	for(const field_name in initial_values){
		this.change_handlers[field_name] = function(e){
			self.set(field_name, e.target.value);
		};
		this.setters[field_name] = this.set.bind(field_name);
	}

	this.get = function(key){
		return store[key];
	};

	this.replaceStore = function(value){
		store = value;
		ee.emit("change", store);
	};
	
	this.getStore = function(){
		return store;
	};
};

module.exports = KeyValueStore;
