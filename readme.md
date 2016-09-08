# sealious -react-components

**sealious-react-components** makes it easy to create list and tables with pagination, select input and single component based on resources from url

# installation

```
npm install sealious-react-components --save
```

# How to use it
The use of components is simple and declarative. Look at example below
```javascript
<ResourceList
  url="http://example.com/api/resources/tasks"
  listElementClass={MyReactClass}
  paginate={true}
/>
```
It renders list with pagination based on resources from url property. Every list item is represented by React class created by user (*MyReactClass* in that case).

See our [Api reference](https://github.com/sealcode/sealious-react-components/blob/unit_tests/reference.md) to discover other components and how to use them.
