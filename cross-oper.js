const {
	operators:spec
} = require('@grunmouse/multioperator-spec-mul');

const Vector2 = require('./vector2.js');
const Vector3 = require('./vector3.js');
const Vector7 = require('./vector7.js');

//Псевдоскалярное произведение двухметрых векторов
spec.cross.def(Vector2, Vector2, (a, b)=>(a.y*b.x - a.x*b.y));

//Векторное произведение трёхмерных векторов
spec.cross.def(Vector3, Vector3, (a, b)=>(
	new Vector3(a.z*b.y - a.y*b.z, a.x*b.z - a.z*b.x, a.y*b.x - a.x*b.y)
));

//Векторное произведение семимерных векторов
spec.cross.def(Vector7, Vector7, (x, y)=>(
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

spec.cross.useName(Vector2);
spec.cross.useName(Vector3);
spec.cross.useName(Vector7);