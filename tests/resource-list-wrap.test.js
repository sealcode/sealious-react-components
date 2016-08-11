import assert from "assert";
import {wrap} from "../lib/resource-list.pure.jsx";


describe("resource-list-wrap", function(){

	it("should return undefined", function(){
		const result = wrap(undefined, {a: 1});
		assert.equal(result, undefined);
	});

	it("should bind resource to function", function(){
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

	//it("should have only pagination")

});
