/**************************************************************
 *	Spline 3D curve
 **************************************************************/


THREE.SplineCurve3 = THREE.Curve.create(

	function ( points /* array of Vector3 */) {

		this.points = ( points == undefined ) ? [] : points;

	},

	function ( t ) {

		var points = this.points;
		var point = ( points.length - 1 ) * t;

		var intPoint = Math.floor( point );
		var weight = point - intPoint;

		var point0 = points[ intPoint == 0 ? intPoint : intPoint - 1 ];
		var point1 = points[ intPoint ];
		var point2 = points[ intPoint > points.length - 2 ? points.length - 1 : intPoint + 1 ];
		var point3 = points[ intPoint > points.length - 3 ? points.length - 1 : intPoint + 2 ];

		var vector = new THREE.Vector3();

		vector.setX(THREE.Curve.Utils.interpolate( point0.getComponent(0), point1.getComponent(0), point2.getComponent(0), point3.getComponent(0), weight ));
		vector.setY(THREE.Curve.Utils.interpolate( point0.getComponent(1), point1.getComponent(1), point2.getComponent(1), point3.getComponent(1), weight ));
		vector.setZ(THREE.Curve.Utils.interpolate( point0.getComponent(2), point1.getComponent(2), point2.getComponent(2), point3.getComponent(2), weight ));

		return vector;

	}

);
