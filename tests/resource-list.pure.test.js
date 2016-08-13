import assert from "assert";
import PureResourceList from "../lib/resource-list.pure.jsx";
import {wrap} from "../lib/resource-list.pure.jsx";
import React from 'react';
import { shallow } from 'enzyme';
import Pagination from "../lib/resource-list-pagination.jsx";
//import expect from "expect.js";

const m = {
	resources: [
		{id: "1234", body: {foo: "bar"}},
		{id: "1234", body: {foo: "bar"}},

	]
};

const w = shallow(<PureResourceList {...m} paginate={true} pagination={{page:1, items:12}}/>);
// console.log(w.find(Pagination));

describe("resource-list", function(){
	const minProps = {
		resources: [
			{id: "1234", body: {foo: "bar"}},
			{id: "1234", body: {foo: "bar"}},
			{id: "1234", body: {foo: "bar"}},
		]
	};

	it("renders correctly", function(){
		const wrapper = shallow(<PureResourceList {...minProps} />);
		assert.equal(wrapper.length, 1);
	});

	it("should have pagination", function(){
		const wrapper = shallow(<PureResourceList {...minProps} paginate={true} pagination={{page:1, items:12}} itemsPerPage={2}/>);
		assert.equal(wrapper.find(Pagination).length, 2);
		//expect(wrapper.find(Pagination)).to.have.length(1);
	});

	it("shouldn't have pagination", function(){
		const wrapper = shallow(<PureResourceList {...minProps} paginate={false} pagination={{page:1, items:12}}/>);
		assert.equal(wrapper.find(Pagination).length, 0);
	});


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

	/*it("", function(){
		const result = PureResourceList({
			className: "myClass",
			resources: [
				{id: "123", body: {foo: "bar"}}
			]
		});

		assert.equal(result.props.className, "myClass");
	});*/
});
