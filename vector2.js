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
	
	static from(data){
		if(!data.length && 'x' in data && 'y' in data){
			return super.from([data.x, data.y]);
		}
		else{
			return super.from(data);
		}
	}

}

module.exports = Vector2;