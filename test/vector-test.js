const {
	Vector,
	Vector2,
	Vector3,
	Vector7
} = require('../index.js');

const assert = require('assert');
const jsc = require('jsverify');

function instanceSized(instance, len){
	return Object.entries(Vector.Sized).every(([size, Ctor])=>{
		return (+size === len) === (instance instanceof Ctor)
	});
}

describe('constructor', ()=>{
	describe('exists', ()=>{
		it('Vector', ()=>{
			assert.ok(Vector);
		});
		it('Vector2', ()=>{
			assert.ok(Vector2);
		});
		it('Vector3', ()=>{
			assert.ok(Vector3);
		});
		it('Vector7', ()=>{
			assert.ok(Vector7);
		});
		it('Vector.Sized', ()=>{
			assert.ok(Vector.Sized);
		});
		it('Vector.Sized[2]', ()=>{
			assert.equal(Vector.Sized[2], Vector2);
		});
		it('Vector.Sized[3]', ()=>{
			assert.equal(Vector.Sized[3], Vector3);
		});
		it('Vector.Sized[7]', ()=>{
			assert.equal(Vector.Sized[7], Vector7);
		});
	});
	
	describe('create as factory', ()=>{
		jsc.property('Vector(x,y) => Vector2', "number", "number", (x,y)=>{
			let instance = new Vector(x, y);
			return instance instanceof Vector2 && instance instanceof Vector;
		});
		jsc.property('Vector(x,y,z) => Vector3', "number", "number", "number", (x,y, z)=>{
			let instance = new Vector(x, y, z);
			return instance instanceof Vector3 && instance instanceof Vector;
		});
		jsc.property('Vector(x,y,z) => Vector3', "number", "number", "number", (x,y,z)=>{
			let instance = new Vector(x, y, z);
			return instance instanceof Vector3 && instance instanceof Vector;
		});
		jsc.property('Vector(x,y,z,t) => Vector', "number", "number", "number", "number", (x,y,z,t)=>{
			let instance = new Vector(x, y, z, t);
			return instance instanceof Vector && instanceSized(instance, 4);
		});
		jsc.property('Vector(...arr[7]) => Vector7', 
			"number", "number", "number", "number", "number", "number", "number", 
			(...arr)=>{
			let instance = new Vector(...arr);
			return instance instanceof Vector && instanceSized(instance, 7);
		});
		jsc.property('Vector(...arr[2..])', "number", "number", "[number]", (x, y, arr)=>{
			let instance = new Vector(x, y, ...arr);
			return instance instanceof Vector && instanceSized(instance, 2+arr.length);
		});
		jsc.property('Vector(...arr)', "[number]", (arr)=>{
			let instance = new Vector(...arr);
			return instance instanceof Vector && instanceSized(instance, arr.length);
		});
	});
	
	describe('create default args', ()=>{
		jsc.property('Vector2(x) => Vector2(x,0)', "number", (x)=>{
			return jsc.utils.isEqual(new Vector2(x), new Vector2(x,0));
		});
		jsc.property('Vector2(x,y,z) => Vector2(x,y)', "number","number","number", (x,y,z)=>{
			return jsc.utils.isEqual(new Vector2(x,y,z), new Vector2(x,y));
		});
		jsc.property('Vector2(falsy,y) => Vector2(0,y)', "falsy","number", (x,y)=>{
			return jsc.utils.isEqual(new Vector2(x,y), new Vector2(0,y));
		});
		jsc.property('Vector3(x) => Vector3(x,0,0)', "number", (x)=>{
			return jsc.utils.isEqual(new Vector3(x), new Vector3(x,0,0));
		});
		jsc.property('Vector3(x,y,z,t) => Vector3(x,y,z)', "number","number","number","number", (x,y,z,t)=>{
			return jsc.utils.isEqual(new Vector2(x,y,z,t), new Vector2(x,y,z));
		});
		jsc.property('Vector7() => Vector.O(7)', ()=>{
			return jsc.utils.isEqual(new Vector7(), Vector.O(7));
		});
	});
	
});

describe('special vectors', ()=>{
	jsc.property('Vector.O', 'nat', (len)=>{
		let v = Vector.O(len);
		return v.length === len && v.abs()===0;
	});
});