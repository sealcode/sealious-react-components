import React from 'react';
import ReactDOM from 'react-dom';

import SingleResource from '../../lib/mixins/SingleResource.jsx';
import ReactSingleResource from './ReactSingleResource.jsx';

const Single = SingleResource(ReactSingleResource);

ReactDOM.render(
  <Single url='http://sealcode.org:8082/api/v1/resources/task/fqwj0ldbvg'/>,
  document.getElementById('app')
);
