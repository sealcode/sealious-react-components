# installation

```
npm install sealious-react-components --save
```

# resource-list
Renders list with optional pagination. Full example of use below

```javascript
// App.jsx

import React from 'react';
import ReactDOM from 'react-dom';

import {ResourceList} from 'react-sealious-components';
import MyReactClass from './MyReactClass.jsx';

ReactDOM.render(
  <ResourceList
    url='http://example.com/api/resources/tasks'
    listElementClass={MyReactClass}
    paginate={true}
  />,
  document.getElementById('app')
);
```

```javascript
// MyReactClass.jsx

import React from 'react';

const MyReactClass = (props) => {
  return(
    <li>
      <span>{props.resource.body.title}</span>
      <button onClick={props.onDelete}>Delete</button>
    </li>
  );
}

export default MyReactClass;
```
This example renders list with pagination based on resources from url prop. Single list item is represented by MyReactClass.

### Few words about listElementClass prop
Its necessary to create your own list item React class for display data from url.
```javascript
// MyReactClass.jsx

import React from 'react';

const MyReactClass = (props) => {
  return(
    <li>
      <span>{props.resource.body.title}</span>
      <button onClick={props.onDelete}>Delete</button>
    </li>
  );
}

export default MyReactClass;
```
We highly recommend to use staless function instead of Reac.createClass for render elements but if you want to handle state you can use React.create class as well.
*MyReactClass* creates *li* tag with *span* and *button* inside. Span displays title of single resource and button has special method for removing this single resource. Its very usefull for building CMS-like structures with CRUD operations. You have asccess to resource by *props.resource*

### resource-list props
* ` url` - necessary for GET request. Get resources from this adress. You have access to resource data by *props.resource*. Example

```javascript
url='http://example.com/api/resources/tasks'
```

* `paginate` - decides that the list has pagination or not. If is *false* or not defined, the list renders all resources. If is *true*, the list renders 12 elements by default. Example:
```javascript
paginate={true}
```

* `itemsPerPage` - how many elements per page you want. The default is 12. Example:

```javascript
itemsPerPage={8}
```

* `listElementClass` - you should set your own list element with your own React class. The default element is *li*. Example:

```javascript
listElementClass={MyReactClass}
```
* `containerComponent` - set your own container component. The default is *ul*. Example:

```javascript
containerComponent="div"
```

* `className` - the class name of the div container. Example:

```javascript
className="my-class"
```

* `preprocessEach` - a function that can modify the objects representing the elements of the collection before they're being displayed. Example:

```javascript
preprocessEach={(e)=>e.body.friends}
```

* ```filter```
* ```format```
* ```search```

### react-resource-list methods
**resource-list** allows you to delete each item if you want. You have special method for that passed to all list items by *props.onDelete*. Example
```javascript
<button onClick={props.onDelete}>Delete</button>
```
If you click this button, you use DELETE request to url with resource ID. If you have access rights, this particular resource will be removed.
Example requested adress looks like: ``` "http://example.com/api/resources/tasks/qdg231fsq" ```

# resource-table
Renders table with optional pagination. Full example of use below

```javascript
// App.jsx

import React from 'react';
import ReactDOM from 'react-dom';

import {ResourceTable} from 'react-sealious-components';
import MyReactClass from './MyReactClass.jsx';

ReactDOM.render(
  <ResourceTable
    url='http://example.com/api/resources/tasks'
    paginate={true}
    itemsPerPage={3}
  />,
  document.getElementById('app')
);
```

### the default table row component
ResourceTable renders a table. This is default row component but you can define your own React class or stateless function (recommended).

```javascript
const DefaultRow = (props) => {
	try{
		const body = props.resource.body;
		const cells = Object.keys(body).map((key) => {
			let content = body[key];
			return (
				<td key={key}>
					{content}
				</td>
			)
		});
		return <tr key={props.resource.id}>{cells}</tr>
	}catch(e){
		console.log(e);
	}
}
```

### resource-table props
* ``` url ``` - necessary for GET request. Get resources from this adress. You have access to resource data by *props.resource*. Example
```javascript
url='http://example.com/api/resources/tasks'
```
* ``` paginate ``` - decides that the list has pagination or not. If is *false* or not defined, the list renders all resources. If is *true*, the list renders 12 elements by default. Example
```javascript
paginate={true}
```
* ``` itemsPerPage ``` - how many elements per page you want. The default is 12. Example
```javascript
itemsPerPage={8}
```
* ```rowComponent``` - how looks like single row in table
```javascript
rowComponent={MyReactClass}
```
* ```filter```
* ```format```
* ```search```

# SingleResource
SingleResource is a mixin that allows you to display single resource, update it or delete.

```javascript
// App.jsx

import React from 'react';
import ReactDOM from 'react-dom';

import {SingleResource} from 'react-sealious-components';
import MyReactClass from './MyReactClass.jsx';

const Single = SingleResource(MyReactClass);

ReactDOM.render(
  <Single url='http://example.com/api/resources/tasks/jch9vlefet'/>,
  document.getElementById('app')
);
```
You must pass your own React class as an argument of SingleResource function (higher order function). SingleResource mixin returns new React class that contains your React class but with special methods and props.
