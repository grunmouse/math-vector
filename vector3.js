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
}

module.exports = Vector3;