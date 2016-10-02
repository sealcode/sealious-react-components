import React from 'react';
import ReactDOM from 'react-dom';

import ResourceTable from '../../lib/resource-table.jsx';
import ReactTableRow from './ReactTableRow.jsx';

ReactDOM.render(
  <ResourceTable url='http://sealcode.org:8082/api/v1/resources/task'
    paginate={true}
    itemsPerPage={3}
    rowComponent={ReactTableRow}
  />,
  document.getElementById('app')
);
