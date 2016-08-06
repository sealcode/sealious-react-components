const assert = require("assert");

const PureResourceList = require("../lib/resource-list.pure.jsx");

describe("resource-list", function(){
	it("should use the container component class provided in props.containerComponent", function(){
		var result = PureResourceList({
			containerComponent: "div",
			resources: [
				{id: "123", body: {foo: "bar"}}
			]
		});
		assert.equal(result.type, "div");
	})
});
