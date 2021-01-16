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
	
	/**
	 * Поворачивает вектор на угол, кратный прямому
	 * @param {Int} a - множитель угла поворота
	 */
	rotOrto(a){
		let {x, y} = this;
		a = (a%4 + 4)%4;
		if(a & 1){
			[x, y] = [-y, x];
		}
		if(a & 2){
			[x, y] = [-x, -y];
		}
		return new this.constructor(x, y);
	}
	
	phi(){
		return Math.atan2(this.y, this.x);
	}
	
	toPolar(){
		let phi = this.phi();
		let abs = this.abs();
		return {
			phi, abs
		};
	}
	
	swap(){
		return new Vector2(this.y, this.x);
	}
	
	toJSON(){
		return {x:this.x, y:this.y};
	}
	
	/**
	 * Находится ли вектор в секторе между векторами a и b
	 */
	isInSector(a, b){
		let ab = a.cross(b);
		let at = a.cross(this);
		let tb = this.cross(b);
		
		if(ab > 0){
			//левая пара
			return at>0 && tb>0;
		}
		else{
			return tb<0 || at <0;
		}
	}
	
	static from(data, mapper){
		if(!data.length && 'x' in data && 'y' in data){
			return super.from([data.x, data.y], mapper);
		}
		else{
			return super.from(data, mapper);
		}
	}
	
	static fromPolar({phi, abs}){
		return new Vector2(abs*Math.cos(fi), abs*Math.sin(fi));
	}
	
	/**
	 * Орт по углу
	 */
	static fromAngle(phi){
		return return new Vector2(Math.cos(fi), Math.sin(fi));
	}
	
	static O(){
		return new Vector2(0, 0);
	}

}

Vector.Sized[2] = Vector2;

module.exports = Vector2;