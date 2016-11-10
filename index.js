import ResourceList from './lib/ResourceList.jsx';
import ResourceTable from './lib/ResourceTable.jsx';
import ResourceSelect from './lib/ResourceSelect.jsx';
import singleResource from './lib/mixins/singleResource.jsx';
const login = require("./lib/mixins/login.jsx");
const form = require("./lib/mixins/form.js");

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
  form: form
};
