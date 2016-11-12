const url = require("url");
const clone = require("clone");
const merge = require("merge");

const Router = function(){
	
	let next_handler_id = 0;

	const listeners_by_id = {};
	const listeners_by_key = {"*": []};
	const listener_key_by_id = {};

	let prev_params = {};

	function pushState(state, url){
		prev_params = state;
		history.pushState(state, "", url);
	}

	const self = {
		getParsedUrl: function(){
			return url.parse(document.location.href, true);
		},
		getParamChangeUrl: function(key, value){
			const parsed_url = this.getParsedUrl();
			delete parsed_url.search;
			parsed_url.query[key] = value;
			return url.format(parsed_url);
		},
		getUrlForParams: function(params, replace){
			const parsed_url = this.getParsedUrl();
			delete parsed_url.search;
			if(replace){
				parsed_url.query = params;
			}else{
				parsed_url.query = merge(true, parsed_url.query, params);
			}
			return url.format(parsed_url);
		},
		informHandlers: function(key, value){
			for(const i in listeners_by_key[key]){
				const listener_id = listeners_by_key[key][i];
				listeners_by_id[listener_id](value);
			}
			listeners_by_key["*"]
			.map((id) => listeners_by_id[id])
			.forEach((handler) => handler());
		},
		setParam: function(key, value){
			const params_diff = {};
			params_diff[key] = value;
			pushState(
				merge(true, this.getParams(), params_diff),
				this.getParamChangeUrl(key, value)
			);
			this.informHandlers(key, value);
		},
		setMultipleParams: function(key_value, replace){
			// if replace is set to true, values not present in key_value will be removed from the new URL
			const new_params = this.getParams();
			const to_notify = {}; // key -> new value
			for(const key in key_value){
				new_params[key] = key_value[key];
				to_notify[key] = key_value[key];
			}
			if(replace){
				for(const key in new_params){
					if(key_value[key] === undefined){
						delete new_params[key];
						to_notify[key] = undefined;
					}
				}
			}
			pushState(
				new_params,
				this.getUrlForParams(new_params, replace)
			);
			for(const key in to_notify){
				this.informHandlers(key, to_notify[key]);
			}
		},
		getParams: function(){
			return this.getParsedUrl().query;
		},
		getParam: function(key){
			return this.getParams()[key];
		},
		onParamChange: function(key, listener){
			listeners_by_id[next_handler_id] = listener;
			if(!listeners_by_key[key]){
				listeners_by_key[key] = [];
			}
			listeners_by_key[key].push(next_handler_id);
			listener.key = key;
			listener_key_by_id[next_handler_id] = key;
			return next_handler_id++;
		},
		recreateState: function(state){
			const current_params = prev_params;
			for(const key in state){
				if(state[key] != current_params[key]){
					this.informHandlers(key, state[key]);
				}
			}
			for(const key in current_params){
				if(state[key] === undefined){
					this.informHandlers(key, undefined);
				}
			}
			prev_params = state;
		},
		removeListener: function(listener_id){
			delete listeners_by_id[listener_id];
			const key = listener_key_by_id[listener_id];
			delete listener_key_by_id[listener_id];
			listeners_by_key[key] = listeners_by_key[key]
			.filter((id) => id != listener_id);
		},
	};

	window.onpopstate = function(event){
		self.recreateState(event.state);
	};

	return self;

};

module.exports = Router();
