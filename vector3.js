const Vector = require('./vector.js');

class Vector3 extends Vector{
	
	constructor(x, y, z){
		super(x||0, y||0, z||0);
	}
	
	get length(){
		return 3;
	}

	get x(){
		return this[0];
	}
	get y(){
		return this[1];
	}
	get z(){
		return this[2];
	}
	
	/**
	 * Произвольный вектор, нормальный данному
	 * Это такой ненулевой вектор, который при скалярном умножени на данный даёт ноль.
	 */
	someNormal(){
		let [x,y,z] = this;
		if(Math.abs(x) <= Number.EPSILON){
			return new Vector(0, z, -y);
		}
		else{
			return new Vector(y, -x, 0);
		}
	}
	
	static O(){
		return new Vector3(0, 0, 0);
	}
}

Vector3.relAngle = function(start, target, rel){
	return Vector.angle(start, target) * Math.sign(start.cross(target).dot(rel));
};

Vector.Sized[3] = Vector3;

module.exports = Vector3;