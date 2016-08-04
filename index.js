import React from 'react';
import ReactDOM from 'react-dom';
import Test from './Test.jsx';
import ResourceList from './lib/resource-list.jsx';
import ResourceTable from './lib/resource-table.jsx';
import ResourceForm from './lib/resource-create-form.jsx';
import ResourceSelect from './lib/resource-select.jsx';
//higher order

import ResourceListES6 from './lib/resource-list-es6.jsx';
import ResourceTableES6 from './lib/resource-table-es6.jsx';
import ResourceSelectES6 from './lib/resource-select-es6.jsx';
//lista
/*ReactDOM.render(
  <ResourceList
    url='http://sealcode.org:8082/api/v1/resources/task'
    listElementClass={Test}
    paginate={true}

  />,
  document.getElementById('app')
);*/

//tabela
/*ReactDOM.render(
    <ResourceTable url='http://sealcode.org:8082/api/v1/resources/task'
      paginate={true}
      itemsPerPage={3}

    />,
    document.getElementById('app'));*/

//formularz
/*ReactDOM.render(
  <ResourceForm />,
  document.getElementById('app'));*/

//Higher order list
/*ReactDOM.render(
  <ResourceListES6 url='http://sealcode.org:8082/api/v1/resources/task'
  listElementClass={Test}
  paginate={true}
  itemsPerPage={4}/>,
  document.getElementById('app')
);*/

//higher order table
/*ReactDOM.render(
    <ResourceTableES6
      url='http://sealcode.org:8082/api/v1/resources/task'
      paginate={true}
      itemsPerPage={6}
    />,
    document.getElementById('app')
  );*/
//higher order form
/*let myModel = {
  name: "text",
  surname: "text",
  age: {
    select: [
      "4 - 10",
      "11 - 20",
      "21 - 100"
    ]
  },
  describe_yourself: "textarea"
}
ReactDOM.render(
  <ResourceForm model={myModel}/>,
  document.getElementById('app'));*/
  ReactDOM.render(
    <ResourceSelectES6
      url='http://sealcode.org:8082/api/v1/resources/task'
      displayAttr="title"

    />,
    document.getElementById('app')
  );
