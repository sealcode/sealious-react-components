const qwest = require("qwest");
const url = require("url");
const merge = require("merge");

const CachedHttp = (function(){
	const cache = {};

	const pending = {};

	return {
		get: function(url_arg, query, options){
			const parsed_url = url.parse(url_arg, true);
			delete parsed_url.search;
			const merged_query = merge(true, parsed_url.query, query);
			const pathname = parsed_url.pathname;
			
			const hash = pathname + "|" + JSON.stringify(merged_query);

			if(pending[hash]){
				return pending[hash];
			}else if(cache[hash]){
				return Promise.resolve(cache[hash]);
			} else {
				const promise = qwest.get(pathname, merged_query, options)
				.then(function(xml, data){
					cache[hash] = data;
					delete pending[hash];
					return data;
				});
				pending[hash] = promise;
				return promise;
			}
		}
	};
})();

module.exports = CachedHttp;
