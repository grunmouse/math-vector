
class Vector extends Array{
	
	constructor(...values){
		let len = values.length;
		if(Vector.Sized[len]){
			let Ctor = Vector.Sized[len];
			if(Ctor !== new.target){
				return new Ctor(...values);
			}
		}
		super(...values);
	}
	
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
		let Ctor = this;
		return new Ctor(...new Array(len).fill(0));
	}
	
	/**
	 * Создаёт расширенный вектор, добавляя измерения к данному
	 */
	extend(...values){
		return new Vector(...this, ...values);
	}
	
	/**
	 * Создаёт обрезанный вектор, 
	 */
	cut(size){
		return new Vector(...this.slice(0, size));
	}
}

Vector.Sized = {};

module.exports = Vector;