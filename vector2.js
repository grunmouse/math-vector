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
	
	static O(){
		return Vector2(0, 0);
	}

}

Vector.Sized[2] = Vector2;

module.exports = Vector2;