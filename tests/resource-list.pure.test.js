import assert from "assert";
import PureResourceList from "../lib/resource-list.pure.jsx";
import {wrap} from "../lib/resource-list.pure.jsx";


describe("resource-list", function(){
	it("should use the container component class provided in props.containerComponent", function(){
		const result = PureResourceList({
			containerComponent: "div",
			resources: [
				{id: "123", body: {foo: "bar"}}
			]
		});

		assert.equal(result.type, "div");
	});
	
	it("should use className provided in props.className", function(){
		const result = PureResourceList({
			className: "myClass",
			resources: [
				{id: "123", body: {foo: "bar"}}
			]
		});

		assert.equal(result.props.className, "myClass");
	});

	it("wrap should return undefined", function(){
		const result = wrap(undefined, {a: 1});
		assert.equal(result, undefined);
	});

	it("wrap should bind resource to function", function(){
		function testFunction(resource){
			return resource.id;
		}

		const my_resource = {
			id: "1234",
			name: "testname"
		}

		const result = wrap(testFunction, my_resource);

		assert.equal(result(), "1234");
	});

});
