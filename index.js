const paginate = require("./lib/mixins/paginate.js");
const ResourceList = require('./lib/ResourceList.jsx');

module.exports = {
  ResourceList: ResourceList,
  paginate: paginate,
  ResourceTable: require('./lib/ResourceTable.jsx'),
  ResourceSelect: require('./lib/ResourceSelect.jsx'),
  singleResource: require('./lib/mixins/singleResource.jsx'),
  login: require("./lib/mixins/login.jsx"),
  form: require("./lib/mixins/form.js"),
  PagedResourceList: paginate(ResourceList),
  Router: require("./lib/Router.js"),
  keepPageNumberInUrl: require("./lib/mixins/keep-page-number-in-url.js"),
  keepPageNumberInState: require("./lib/mixins/keep-page-number-in-state.js"),
  RouterLink: require("./lib/RouterLink.js"),
  propsFromUrl: require("./lib/mixins/props-from-url.js"),
  CachedHttp: require("./lib/cached-http.js"),
  loadCollectionSpecification: require("./lib/mixins/load-collection-specification.js"),
  StatefulCollection: require("./lib/stateful-collection.js"),
  PaginationUI: require("./lib/pagination-ui.jsx"),
  PropMultiplexer: require("./lib/prop-multiplexer.js"),
  Loading: require("./lib/loading.js"),
  ResourcePicker: require("./lib/resource-picker/index.jsx"),
  KeyValueStore: require("./lib/stores/key-value-store.js"),
  ConnectWithKeyValueStore: require("./lib/stores/connect-with-key-value-store.jsx"),
  errorToString: require("./lib/error-to-string.js"),
};
