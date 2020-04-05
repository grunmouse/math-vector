
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
	
}

module.exports = Vector;