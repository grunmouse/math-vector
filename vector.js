
class Vector extends Array{
	
	constructor(...values){
		let len = values.length;
		if(Vector.Sized[len]){
			let Ctor = Vector.Sized[len];
			if(Ctor !== new.target){
				return new Ctor(...values);
			}
		}
		if(len===1){
			super(1);
			this[0]=values[0];
		}
		else if(len === 0){
			super();
		}
		else{
			super(...values);
		}
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
	
	static e(len, i){
		let data = Array.from({length:len}, (_,j)=>(i === j ? 1 : 0));
		return new Vector(data);
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
	
	/**
	 * Преобразует вектор из проективной системы координат в аффинную
	 */
	fromProjective(){
		let len = this.length;
		let w = this[len-1];
		let data = Array.from({length:len-1}, (_,i)=>(this[i]/w));
		return new Vector(...data);
	}
	
	/**
	 * Преобразует вектор из аффинной системы координат в проективную
	 */
	toProjective(){
		return this.extend(1);
	}
}

Vector.Sized = {};

module.exports = Vector;