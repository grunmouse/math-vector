const Vector = require('./vector.js');

class Vector7 extends Vector{
	
	constructor(...arg){
		if(arg.length){
			super(...Array.from({length:7}, (_, i)=>(arg[i]||0)));
		}
		else{
			super(0,0,0,0,0,0,0);
		}
	}
	
	get length(){
		return 7;
	}
}

Vector.Sized[7] = Vector7;

module.exports = Vector7;