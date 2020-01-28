const {
	operators:oper,
	symbols
} = require('@grunmouse/multioperator-ariphmetic');

const {
	operators:spec
} = require('@grunmouse/multioperator-spec-mul');

const Vector = require('./vector.js');

oper.eq.def(Vector, Vector, (a, b)=>{
	//console.log(a, b);
	console.log(a[1] === b[1]);
	return a.length === b.length && a.every((x, i)=>(x[symbols.EQ](b[i])));
});

oper.ne.def(Vector, Vector, (a, b)=>(!a[symbols.EQ](b)));

oper.add.def(Vector, Vector, (a,b)=>{
	if(a.length !== b.length){
		throw new TypeError('Vectors is not equimetric');
	}
	return Vector.from(a, (_, i)=>(a[i][symbols.ADD](b[i])));
});


oper.sub.def(Vector, Vector, (a,b)=>{
	if(a.length !== b.length){
		throw new TypeError('Vectors is not equimetric');
	}
	return Vector.from(a, (_, i)=>(a[i][symbols.SUB](b[i])));
});

oper.neg.def(Vector, (a)=>{
	return Vector.from(a, (x)=>(x[symbols.NEG]()));
});


/* Умножение на число */
oper.mul.def(Vector, Number, (v, a)=>(
	Vector.from(v, (x)=>(x[symbols.MUL](a)))
));

oper.mul.def(Number, Vector, (a, v)=>(
	Vector.from(v, (x)=>(x[symbols.MUL](a)))
));

oper.eq.useName(Vector);
oper.ne.useName(Vector);

oper.add.useName(Vector);
oper.sub.useName(Vector);
oper.neg.useName(Vector);

oper.mul.useName(Vector);

/* Скалярное произведение */
spec.dot.def(Vector, Vector, (a, b)=>{
	if(a.length !== b.length){
		throw new TypeError('Vectors is not equimetric');
	}
	return a.reduce((akk, _, i)=>(akk[symbols.ADD](a[i][symbols.MUL](b[i]))), 0);
});

spec.dot.useName(Vector);
