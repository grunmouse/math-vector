
class Vector extends Array{
	abs(){
		return Math.hypot(...this);
	}
	ort(){
		let a = this.abs();
		return this.map((x)=>(x/a));
	}
	
	static cosDiff(a, b){
		return a.dot(b)/a.abs()/b.abs();
	}
	
	static angle(a, b){
		return Math.acos(this.cosDiff(a, b));
	}
	
	static O(len){
		let Ctor = this.constructor;
		return new Ctor(new Array(len).fill(0));
	}
}

module.exports = Vector;