import React from 'react';
import ReactDOM from 'react-dom';

import singleResource from '../../lib/mixins/singleResource.jsx';
import ReactSingleResource from './ReactSingleResource.jsx';

const Single = singleResource(ReactSingleResource);

ReactDOM.render(
  <Single url='http://sealcode.org:8082/api/v1/resources/task/fqwj0ldbvg'/>,
  document.getElementById('app')
);
