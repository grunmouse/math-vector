const {
	operators:{cross}
} = require('@grunmouse/multioperator-spec-mul');

const {
	operators:{add, sub, mul},
	symbols:{ADD, SUB, MUL}
} = require('@grunmouse/multioperator-ariphmetic');

const Vector2 = require('./vector2.js');
const Vector3 = require('./vector3.js');
const Vector7 = require('./vector7.js');

//Псевдоскалярное произведение двухметрых векторов
cross.def(Vector2, Vector2, (a, b)=>sub.call(a.x[MUL](b.y), a.y[MUL](b.x)));

//Векторное произведение трёхмерных векторов
cross.def(Vector3, Vector3, (a, b)=>(
	new Vector3(
		sub.call(a.y[MUL](b.z), a.z[MUL](b.y)), 
		sub.call(a.z[MUL](b.x), a.x[MUL](b.z)), 
		sub.call(a.x[MUL](b.y), a.y[MUL](b.x))
	)
));

//Векторное произведение семимерных векторов
cross.def(Vector7, Vector7, (x, y)=>(
	Vector7.from({length:7},
		(_, i)=>{
			let akk = 0;
			let a, b;
			
			a = (i+1) % 7;
			b = (i+3) % 7;
			
			akk += x[a]*y[b] - x[b]*y[a];
			
			a = (i+2) % 7;
			b = (i+6) % 7;
			
			akk += x[a]*y[b] - x[b]*y[a];
			
			a = (i+4) % 7;

			a = (i+5) % 7;
			akk += x[a]*y[b] - x[b]*y[a];
			
			return akk;
		}
	)
));

cross.useName(Vector2);
cross.useName(Vector3);
cross.useName(Vector7);