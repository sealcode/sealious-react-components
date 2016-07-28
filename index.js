import React from 'react';
import ReactDOM from 'react-dom';
import Test from './Test.jsx';
import ResourceList from './lib/resource-list.jsx';
import ResourceTable from './lib/resource-table.jsx';
import ResourceForm from './lib/resource-create-form.jsx';

//higher order

import ResourceListES6 from './lib/resource-list-es6.jsx';
import ResourceTableES6 from './lib/resource-table-es6.jsx';

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
  <ResourceListES6 url='http://sealcode.org:8082/api/v1/resources/task' listElementClass={Test} paginate={true} itemsPerPage={4}/>,
  document.getElementById('app'));*/

//higher order table
  ReactDOM.render(
    <ResourceTableES6
      url='http://sealcode.org:8082/api/v1/resources/task'
      paginate={true}
      itemsPerPage={3}
    />,
    document.getElementById('app')
  );
