const url = require("url");

const Router = function(){
	
	let next_handler_id = 0;

	const listeners_by_id = {};
	const listeners_by_key = {};

	return {
		getParsedUrl: function(){
			return url.parse(document.location.href, true);
		},
		getParamChangeUrl: function(key, value){
			const parsed_url = this.getParsedUrl();
			delete parsed_url.search;
			parsed_url.query[key] = value;
			return url.format(parsed_url);
		},
		setParam: function(key, value){
			history.pushState({}, "", this.getParamChangeUrl(key, value));
			console.log(listeners_by_key[key]);
			for(const i in listeners_by_key[key]){
				const listener_id = listeners_by_key[key][i];
				listeners_by_id[listener_id](value);
			}
		},
		getParam: function(key){
			const parsed_url = this.getParsedUrl();
			return parsed_url.query[key];
		},
		onParamChange: function(key, listener){
			console.log("onParamChange", key, listener);
			listeners_by_id[next_handler_id] = listener;
			if(!listeners_by_key[key]){
				listeners_by_key[key] = [];
			}
			listeners_by_key[key].push(next_handler_id);
			listener.key = key;
			next_handler_id++;
			return next_handler_id;
		}
	};
};

module.exports = Router();
