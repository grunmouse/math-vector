const Vector = require('./vector.js');

class Vector7 extends Vector{
	
	constructor(...arg){
		if(arg.length){
			return Vector7.from({length:7}, (_, i)=>(arg[i]||0));
		}
		else{
			super();
		}
	}
	
	get length(){
		return 7;
	}
}

module.exports = Vector7;