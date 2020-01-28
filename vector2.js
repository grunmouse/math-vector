const Vector = require('./vector.js');

class Vector2 extends Vector{
	
	constructor(x, y){
		super(x||0, y||0);
	}
	
	get length(){
		return 2;
	}

	get x(){
		return this[0];
	}
	get y(){
		return this[1];
	}

}

module.exports = Vector2;