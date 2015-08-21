/**************************************************************
 *	Cubic Bezier 3D curve
 **************************************************************/

THREE.CubicBezierCurve3 = THREE.Curve.create(

	function ( v0, v1, v2, v3 ) {

		this.v0 = v0;
		this.v1 = v1;
		this.v2 = v2;
		this.v3 = v3;

	},

	function ( t ) {

		var vector = new THREE.Vector3();

		vector.setX(THREE.Shape.Utils.b3( t, this.v0.getComponent(0), this.v1.getComponent(0), this.v2.getComponent(0), this.v3.getComponent(0) ));
		vector.setY(THREE.Shape.Utils.b3( t, this.v0.getComponent(1), this.v1.getComponent(1), this.v2.getComponent(1), this.v3.getComponent(1) ));
		vector.setZ(THREE.Shape.Utils.b3( t, this.v0.getComponent(2), this.v1.getComponent(2), this.v2.getComponent(2), this.v3.getComponent(2) ));

		return vector;

	}

);
