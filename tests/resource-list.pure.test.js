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

});
