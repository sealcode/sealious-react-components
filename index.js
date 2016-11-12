const ResourceList = require('./lib/ResourceList.jsx');
const ResourceTable = require('./lib/ResourceTable.jsx');
const ResourceSelect = require('./lib/ResourceSelect.jsx');
const singleResource = require('./lib/mixins/singleResource.jsx');
const login = require("./lib/mixins/login.jsx");
const form = require("./lib/mixins/form.js");
const paginate = require("./lib/mixins/paginate.js");

// export default {
//   ResourceList: ResourceList,
//   ResourceTable: ResourceTable,
//   ResourceSelect: ResourceSelect,
//   singleResource: singleResource,
// }
module.exports = {
  ResourceList: ResourceList,
  ResourceTable: ResourceTable,
  ResourceSelect: ResourceSelect,
  singleResource: singleResource,
  login: login,
  form: form,
  paginate: paginate,
  PagedResourceList: paginate(ResourceList),
  Router: require("./lib/Router.js"),
  loadPageNumberFromLocation: require("./lib/mixins/load-page-number-from-location.js"),
  keepPageNumberInState: require("./lib/mixins/keep-page-number-in-state.js"),
  RouterLink: require("./lib/RouterLink.js"),
  propsFromUrl: require("./lib/mixins/propsFromUrl.js"), 
};
