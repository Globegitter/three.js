/**************************************************************
 *	Closed Spline 3D curve
 **************************************************************/


THREE.ClosedSplineCurve3 = THREE.Curve.create(

	function ( points /* array of Vector3 */) {

		this.points = ( points == undefined ) ? [] : points;

	},

	function ( t ) {

		var points = this.points;
		var point = ( points.length - 0 ) * t; // This needs to be from 0-length +1

		var intPoint = Math.floor( point );
		var weight = point - intPoint;

		intPoint += intPoint > 0 ? 0 : ( Math.floor( Math.abs( intPoint ) / points.length ) + 1 ) * points.length;

		var point0 = points[ ( intPoint - 1 ) % points.length ];
		var point1 = points[ ( intPoint     ) % points.length ];
		var point2 = points[ ( intPoint + 1 ) % points.length ];
		var point3 = points[ ( intPoint + 2 ) % points.length ];

		var vector = new THREE.Vector3();

		vector.setX(THREE.Curve.Utils.interpolate( point0.getComponent(0), point1.getComponent(0), point2.getComponent(0), point3.getComponent(0), weight ));
		vector.setY(THREE.Curve.Utils.interpolate( point0.getComponent(1), point1.getComponent(1), point2.getComponent(1), point3.getComponent(1), weight ));
		vector.setZ(THREE.Curve.Utils.interpolate( point0.getComponent(2), point1.getComponent(2), point2.getComponent(2), point3.getComponent(2), weight ));

		return vector;

	}

);
