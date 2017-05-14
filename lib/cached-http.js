const qwest = require("qwest");
const url = require("url");
const merge = require("merge");
const Promise = require("bluebird");
Promise.config({ cancellation: true });

const CachedHttp = (function() {
    let cache = {};

    let pending = {};

    return {
        get: function(url_arg, query, options) {
            const parsed_url = url.parse(url_arg, true);
            delete parsed_url.search;
            const merged_query = merge(true, parsed_url.query, query);
            const pathname = parsed_url.pathname;

            const hash = pathname + "|" + JSON.stringify(merged_query);

            if (pending[hash]) {
                return pending[hash];
            } else if (cache[hash]) {
                return Promise.resolve(cache[hash]);
            } else {
                const promise = new Promise(
                    function(resolve, reject, onCancel) {
                        const qp = qwest
                            .get(pathname, merged_query, options)
                            .then(function(xml, data) {
                                cache[hash] = data;
                                delete pending[hash];
                                resolve(data);
                            });
                        onCancel(function() {
                            delete cache[hash];
                            delete pending[hash];
                            qp.abort();
                        });
                    }
                );
                pending[hash] = promise;
                return promise;
            }
        },
        flush: function() {
            //resets cache
            cache = {};
        },
    };
})();

module.exports = CachedHttp;
