import React from 'react';
import ReactDOM from 'react-dom';

import ResourceList from '../../lib/ResourceList.jsx';
import ReactListElement from './ReactListElement.jsx';

ReactDOM.render(
  <ResourceList
    url='http://sealcode.org:8082/api/v1/resources/task'
    listElementClass={ReactListElement}
    paginate={true}
    itemsPerPage={3}
  />,
  document.getElementById('app')
);
