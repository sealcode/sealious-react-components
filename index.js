import React from 'react';
import ReactDOM from 'react-dom';
import Test from './Test.jsx';
import ResourceList from './lib/resource-list.jsx';
import ResourceTable from './lib/resource-table.jsx';
import ResourceForm from './lib/resource-create-form.jsx';

//lista
ReactDOM.render(
  <ResourceList
    url='http://sealcode.org:8082/api/v1/resources/task'
    listElementClass={Test}
    paginate={true}

  />,
  document.getElementById('app')
);

//tabela
/*ReactDOM.render(
    <ResourceTable url='http://sealcode.org:8082/api/v1/resources/task' paginate={true} itemsPerPage={3}/>,
    document.getElementById('app'));*/

//formularz
/*ReactDOM.render(
  <ResourceForm />,
  document.getElementById('app'));*/
