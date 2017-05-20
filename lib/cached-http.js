const qwest = require("qwest");
const url = require("url");
const merge = require("merge");
const Promise = require("bluebird");
Promise.config({ cancellation: true });

function CachedError() {}

CachedError.prototype = Error.prototype;

function respond_from_cache(value) {
    return Promise[value instanceof CachedError ? "reject" : "resolve"](value);
}

const CachedHttp = (function() {
    let cache = {};

    var pending = {};

    return {
        get: function(url_arg, query, options) {
            const parsed_url = url.parse(url_arg, true);
            delete parsed_url.search;
            const merged_query = merge(true, parsed_url.query, query);
            const pathname = parsed_url.pathname;

            const hash = pathname + "|" + JSON.stringify(merged_query);

            if (pending[hash]) {
                return Promise.resolve(pending[hash]).finally(() =>
                    respond_from_cache(cache[hash]));
            } else if (cache[hash]) {
                return respond_from_cache(cache[hash]);
            } else {
                const promise = new Promise(
                    function(resolve, reject, onCancel) {
                        const qp = qwest
                            .get(pathname, merged_query, options)
                            .then(function(xml, data) {
                                cache[hash] = data;
                                delete pending[hash];
                                resolve(data);
                            })
                            .catch(function(status, xhr, error) {
                                const cached_err = Object.create(
                                    CachedError.prototype
                                );
                                Object.assign(cached_err, error);
                                delete pending[hash];
                                cache[hash] = cached_err;
                                reject(cached_err);
                            });
                        onCancel(function() {
                            delete cache[hash];
                            delete pending[hash];
                            qp.abort();
                        });
                    }
                );
                pending[hash] = promise.then(respond_from_cache);
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
