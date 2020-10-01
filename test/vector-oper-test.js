const {
	Vector,
	Vector2,
	Vector3,
	Vector7
} = require('../index.js');

const assert = require('assert');
const jsc = require('jsverify');

describe('equal', ()=>{
	jsc.property('equal', '[number]', (arr)=>{
		let a = new Vector(...arr), b = new Vector(...arr);
		
		return a.eq(b);
	});
	jsc.property('random', '[number]', '[number]', (arr, brr)=>{
		let a = new Vector(...arr), b = new Vector(...brr);
		
		return a.eq(b) === jsc.utils.isEqual(a, b);
	});
});


//Создаёт массив векторов одинаковой размерности
const vectors = (count)=>jsc.bless({
	generator:(size)=>{
		let length = jsc.random(2, 10);
		const repl = jsc.compile(Array(length).fill('number').join(' & '));
		let arr = Array.from({length:count}, ()=>(repl.generator(size)));
		return arr.map(a=>(new Vector(...a)));
	},
	show:val=>(val.map(v=>('Vector('+v.join(',')+')').toString()))
});

const isRelApproxEqual=(a, b, depth)=>{
	let diff = Math.abs(a-b);
	let scale = Math.abs(a/2)+Math.abs(b/2);
	
	return scale ? diff/scale<=depth : diff <= depth;
};

const isApproxVector = (a, b, depth)=>{
	return a.every((_, i)=>isRelApproxEqual(a[i], b[i], depth));
}



describe('addition', ()=>{
	
	jsc.property('a+0=a', '[number]', (arr)=>{
		let a = new Vector(...arr), o = Vector.O(arr.length);
		
		return a.add(o).eq(a);
	});
	
	jsc.property('a+b=b+a', vectors(2), ([a,b])=>{

		return a.add(b).eq(b.add(a));
	});
	
	jsc.property('a+a=2a', vectors(1), ([a])=>(a.add(a).eq(a.mul(2))));
	
});

/*describe('multiple', ()=>{
	jsc.property('|na| = |n||a|', vectors(1), 'number', ([a], n)=>{
		let an = a.mul(n).abs(), na = a.abs()*Math.abs(n);
		return isRelApproxEqual(an, na, Number.EPSILON*2);
	});
	jsc.property('na + nb = n(a+b)', vectors(2), 'number', ([a,b], n)=>{
		return isApproxVector(a.mul(n).add(b.mul(n)), a.add(b).mul(n), Number.EPSILON*4);
	});
});*/

it('myerror', ()=>{
	try{
		//assert.deepEqual([1,2,3], [1,3,3,4]);
	}
	catch(err){
		console.log(Object.keys(err));
		console.log(err.operator);
		throw err;
	}
});

assert.deepEqual([1,2,3], [1,3,3,4]);