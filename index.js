import React from 'react';
import ReactDOM from 'react-dom';
import Test from './Test.jsx';

//higher order
import ResourceList from './lib/resource-list.jsx';
import ResourceTable from './lib/resource-table.jsx';
import ResourceSelect from './lib/resource-select.jsx';

//lista
ReactDOM.render(
  <ResourceList
    url='http://sealcode.org:8082/api/v1/resources/task'
    listElementClass={Test}
    paginate={true}
    itemsPerPage={2}
  />,
  document.getElementById('app')
);

//tabela
/*ReactDOM.render(
  <ResourceTable url='http://sealcode.org:8082/api/v1/resources/task'
    paginate={true}
    itemsPerPage={3}

  />,
  document.getElementById('app'));*/

//select
/*ReactDOM.render(
  <ResourceSelect
    url='http://sealcode.org:8082/api/v1/resources/task'
    displayAttr="title"

  />,
  document.getElementById('app')
);*/
