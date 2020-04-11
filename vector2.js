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
	
	toJSON(){
		return {x:this.x, y:this.y};
	}
	
	static from(data, mapper){
		if(!data.length && 'x' in data && 'y' in data){
			return super.from([data.x, data.y], mapper);
		}
		else{
			return super.from(data, mapper);
		}
	}
	
	static O(){
		return Vector2(0, 0);
	}

}

module.exports = Vector2;