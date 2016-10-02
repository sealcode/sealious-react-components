import React from 'react';
import ReactDOM from 'react-dom';

import ResourceSelect from '../../lib/ResourceSelect.jsx';

ReactDOM.render(
  <ResourceSelect
    url='http://sealcode.org:8082/api/v1/resources/task'
    displayAttr="title"
  />,
  document.getElementById('app')
);
