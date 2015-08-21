/*global THREE*/

/**
 * @author mrdoob / http://mrdoob.com/
 * @author *kile / http://kile.stravaganza.org/
 * @author philogb / http://blog.thejit.org/
 * @author mikael emtinger / http://gomo.se/
 * @author egraether / http://egraether.com/
 * @author WestLangley / http://github.com/WestLangley
 */

if (typeof window.SIMD === 'undefined') {
  console.log('CUSTOM window.SIMD OBJECT!');
  console.log(window.SIMD);
  window.SIMD = {
    Float32x4: function() {}
  };
} else {
  console.log('Having global window.SIMD anyway!');
}

THREE.Vector3 = function(x, y, z) {

  // this.x = x || 0;
  // this.y = y || 0;
  // this.z = z || 0;
  this.vector3d = window.SIMD.Float32x4(x, y, z);

};

THREE.Vector3.prototype = {

  constructor: THREE.Vector3,

  set: function(x, y, z) {

    // this.x = x;
    // this.y = y;
    // this.z = z;
    this.vector3d = window.SIMD.Float32x4(x, y, z);

    return this;

  },

  setX: function(x) {

    // this.x = x;
    this.vector3d = window.SIMD.Float32x4.replaceLane(this.vector3d, 0, x);

    return this;

  },

  setY: function(y) {

    // this.y = y;
    this.vector3d = window.SIMD.Float32x4.replaceLane(this.vector3d, 1, y);

    return this;

  },

  setZ: function(z) {

    // this.z = z;
    this.vector3d = window.SIMD.Float32x4.replaceLane(this.vector3d, 2, z);

    return this;

  },

  setComponent: function(index, value) {

    if (index >= 0 && index <= 2) {
      this.vector3d = window.SIMD.Float32x4.replaceLane(this.vector3d, index, value);
    } else {
      throw new Error('index is out of range: ' + index);
    }

  },

  getComponent: function(index) {

    if (index >= 0 && index <= 2) {
      return window.SIMD.Float32x4.extractLane(this.vector3d, index);
    } else {
      throw new Error('index is out of range: ' + index);
    }

  },

  copy: function(v) {

    // this.x = v.x;
    // this.y = v.y;
    // this.z = v.z;
    // this.vector3d = window.SIMD.Float32x4(v.x, v.y, v.z);
		// assume v is a window.SIMD.Float32x4 vector
    // if (typeof v.x !== 'undefined') {
    //   console.log('SOMETHING WILL GO WRONG IN COPY FUNCTION!');
    // }

    this.vector3d = v.vector3d;

    return this;

  },

  add: function(v, w) {

    if (w !== undefined) {

      THREE.warn('THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
      return this.addVectors(v, w);

    }

    // this.x += v.x;
    // this.y += v.y;
    // this.z += v.z;
    // if (typeof v.x !== 'undefined') {
    //   console.log('SOMETHING WILL GO WRONG IN ADD FUNCTION!');
    // }
    this.vector3d = window.SIMD.Float32x4.add(this.vector3d, v.vector3d);

    return this;

  },

  addScalar: function(s) {

    // this.x += s;
    // this.y += s;
    // this.z += s;
    this.vector3d = window.SIMD.Float32x4.add(this.vector3d, window.SIMD.Float32x4(s, s, s));

    return this;

  },

  addVectors: function(a, b) {

    // this.x = a.x + b.x;
    // this.y = a.y + b.y;
    // this.z = a.z + b.z;
    // if (typeof a.x !== 'undefined' || typeof b.x !== 'undefined') {
    //   console.log('SOMETHING WILL GO WRONG IN ADDVECTORS FUNCTION!');
    // }
    this.vector3d = window.SIMD.Float32x4.add(a.vector3d, b.vector3d);

    return this;

  },

  sub: function(v, w) {

    if (w !== undefined) {

      THREE.warn('THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
      return this.subVectors(v, w);

    }

    // this.x -= v.x;
    // this.y -= v.y;
    // this.z -= v.z;
    // if (typeof v.x !== 'undefined') {
    //   console.log('SOMETHING WILL GO WRONG IN SUB FUNCTION!');
    // }
    this.vector3d = window.SIMD.Float32x4.sub(this.vector3d, v.vector3d);

    return this;

  },

  subScalar: function(s) {

    // this.x -= s;
    // this.y -= s;
    // this.z -= s;
    this.vector3d = window.SIMD.Float32x4.sub(this.vector3d, window.SIMD.Float32x4(s, s, s));

    return this;

  },

  subVectors: function(a, b) {

    // this.x = a.x - b.x;
    // this.y = a.y - b.y;
    // this.z = a.z - b.z;
    // if (typeof a.x !== 'undefined' || typeof b.x !== 'undefined') {
    //   console.log('SOMETHING WILL GO WRONG IN subVECTORS FUNCTION!');
    //   console.log(a);
    //   console.log(b);
    //   throw new Error('check it out you!')
    // }
    this.vector3d = window.SIMD.Float32x4.sub(a.vector3d, b.vector3d);

    return this;

  },

  multiply: function(v, w) {

    if (w !== undefined) {

      THREE.warn('THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.');
      return this.multiplyVectors(v, w);

    }

    // this.x *= v.x;
    // this.y *= v.y;
    // this.z *= v.z;
    // if (typeof v.x !== 'undefined') {
    //   console.log('SOMETHING WILL GO WRONG IN multiply FUNCTION!');
    // }
    this.vector3d = window.SIMD.Float32x4.mul(this.vector3d, v.vector3d);

    return this;

  },

  multiplyScalar: function(scalar) {

    // this.x *= scalar;
    // this.y *= scalar;
    // this.z *= scalar;
    this.vector3d = window.SIMD.Float32x4.mul(this.vector3d, window.SIMD.Float32x4(scalar, scalar, scalar));

    return this;

  },

  multiplyVectors: function(a, b) {

    // this.x = a.x * b.x;
    // this.y = a.y * b.y;
    // this.z = a.z * b.z;
    // if (typeof a.x !== 'undefined' || typeof b.x !== 'undefined') {
    //   console.log('SOMETHING WILL GO WRONG IN multiplyVectors FUNCTION!');
    // }
    this.vector3d = window.SIMD.Float32x4.mul(a.vector3d, b.vector3d);

    return this;

  },

  applyEuler: function() {

    var quaternion;

    return function(euler) {

      if (euler instanceof THREE.Euler === false) {

        THREE.error('THREE.Vector3: .applyEuler() now expects a Euler rotation rather than a Vector3 and order.');

      }

      if (quaternion === undefined) quaternion = new THREE.Quaternion();

      this.applyQuaternion(quaternion.setFromEuler(euler));

      return this;

    };

  }(),

  applyAxisAngle: function() {

    var quaternion;

    return function(axis, angle) {

      if (quaternion === undefined) quaternion = new THREE.Quaternion();

      this.applyQuaternion(quaternion.setFromAxisAngle(axis, angle));

      return this;

    };

  }(),

  applyMatrix3: function(m) {

    var x = window.SIMD.Float32x4.extractLane(this.vector3d, 0);
    var y = window.SIMD.Float32x4.extractLane(this.vector3d, 1);
    var z = window.SIMD.Float32x4.extractLane(this.vector3d, 2);

    // this.vector3d = window.SIMD.Float32x4.replaceLane(this.vector3d, 0, bla)
    // this.vector3d = window.SIMD.Float32x4.replaceLane(this.vector3d, 1, bla)
    // this.vector3d = window.SIMD.Float32x4.replaceLane(this.vector3d, 2, bla)

    var e = m.elements;

		if (typeof e === 'undefined') {
			console.log('ERROR IN applyMatrix3');
		}

    var newX = e[0] * x + e[3] * y + e[6] * z;
    var newY = e[1] * x + e[4] * y + e[7] * z;
    var newZ = e[2] * x + e[5] * y + e[8] * z;

    this.vector3d = window.SIMD.Float32x4(newX, newY, newZ);

    return this;

  },

  applyMatrix4: function(m) {

    // input: THREE.Matrix4 affine matrix

    var x = window.SIMD.Float32x4.extractLane(this.vector3d, 0);
    var y = window.SIMD.Float32x4.extractLane(this.vector3d, 1);
    var z = window.SIMD.Float32x4.extractLane(this.vector3d, 2);

    var e = m.elements;

		if (typeof e === 'undefined') {
			console.log('ERROR IN applyMatrix4');
		}


    var newX = e[0] * x + e[4] * y + e[8] * z + e[12];
    var newY = e[1] * x + e[5] * y + e[9] * z + e[13];
    var newZ = e[2] * x + e[6] * y + e[10] * z + e[14];

    this.vector3d = window.SIMD.Float32x4(newX, newY, newZ);

    return this;

  },

  applyProjection: function(m) {

    // input: THREE.Matrix4 projection matrix

    var x = window.SIMD.Float32x4.extractLane(this.vector3d, 0);
    var y = window.SIMD.Float32x4.extractLane(this.vector3d, 1);
    var z = window.SIMD.Float32x4.extractLane(this.vector3d, 2);

    var e = m.elements;
    var d = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]); // perspective divide

    var newX = (e[0] * x + e[4] * y + e[8] * z + e[12]) * d;
    var newY = (e[1] * x + e[5] * y + e[9] * z + e[13]) * d;
    var newZ = (e[2] * x + e[6] * y + e[10] * z + e[14]) * d;

    this.vector3d = window.SIMD.Float32x4(newX, newY, newZ);

    return this;

  },

  applyQuaternion: function(q) {

    var x = window.SIMD.Float32x4.extractLane(this.vector3d, 0);
    var y = window.SIMD.Float32x4.extractLane(this.vector3d, 1);
    var z = window.SIMD.Float32x4.extractLane(this.vector3d, 2);

    var qx = q.x;
    var qy = q.y;
    var qz = q.z;
    var qw = q.w;

    // calculate quat * vector

    var ix = qw * x + qy * z - qz * y;
    var iy = qw * y + qz * x - qx * z;
    var iz = qw * z + qx * y - qy * x;
    var iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat

    var newX = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    var newY = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    var newZ = iz * qw + iw * -qz + ix * -qy - iy * -qx;

    this.vector3d = window.SIMD.Float32x4(newX, newY, newZ);

    return this;

  },

  project: function() {

    var matrix;

    return function(camera) {

      if (matrix === undefined) matrix = new THREE.Matrix4();

      matrix.multiplyMatrices(camera.projectionMatrix, matrix.getInverse(camera.matrixWorld));
      return this.applyProjection(matrix);

    };

  }(),

  unproject: function() {

    var matrix;

    return function(camera) {

      if (matrix === undefined) matrix = new THREE.Matrix4();

      matrix.multiplyMatrices(camera.matrixWorld, matrix.getInverse(camera.projectionMatrix));
      return this.applyProjection(matrix);

    };

  }(),

  transformDirection: function(m) {

    // input: THREE.Matrix4 affine matrix
    // vector interpreted as a direction

    var x = window.SIMD.Float32x4.extractLane(this.vector3d, 0);
    var y = window.SIMD.Float32x4.extractLane(this.vector3d, 1);
    var z = window.SIMD.Float32x4.extractLane(this.vector3d, 2);

    var e = m.elements;

    var newX = e[0] * x + e[4] * y + e[8] * z;
    var newY = e[1] * x + e[5] * y + e[9] * z;
    var newZ = e[2] * x + e[6] * y + e[10] * z;

    this.vector3d = window.SIMD.Float32x4(newX, newY, newZ);

    this.normalize();

    return this;

  },

  divide: function(v) {

    this.vector3d = window.SIMD.Float32x4.div(this.vector3d, v.vector3d);

    return this;

  },

  divideScalar: function(scalar) {

    if (scalar !== 0) {

      this.vector3d = window.SIMD.Float32x4.div(this.vector3d, window.SIMD.Float32x4(scalar, scalar, scalar));

    } else {

      this.vector3d = window.SIMD.Float32x4(0, 0, 0);

    }

    return this;

  },

  min: function(v) {

    // v = window.SIMD.Floa t32x4(v.x, v.y, v.z);
    this.vector3d = window.SIMD.Float32x4.minNum(this.vector3d, v.vector3d);

    // if ( this.x > v.x ) {
    //
    // 	this.x = v.x;
    //
    // }
    //
    // if ( this.y > v.y ) {
    //
    // 	this.y = v.y;
    //
    // }
    //
    // if ( this.z > v.z ) {
    //
    // 	this.z = v.z;
    //
    // }

    return this;

  },

  max: function(v) {

    // v = window.SIMD.Float32x4(v.x, v.y, v.z);
    this.vector3d = window.SIMD.Float32x4.maxNum(this.vector3d, v.vector3d);

    // if ( this.x < v.x ) {
    //
    // 	this.x = v.x;
    //
    // }
    //
    // if ( this.y < v.y ) {
    //
    // 	this.y = v.y;
    //
    // }
    //
    // if ( this.z < v.z ) {
    //
    // 	this.z = v.z;
    //
    // }

    return this;

  },

  clamp: function(min, max) {

    // This function assumes min < max, if this assumption isn't true it will not operate correctly

    // var v_max = window.SIMD.Float32x4(max.x, max.y, max.z);
    this.vector3d = window.SIMD.Float32x4.maxNum(this.vector3d, max.vector3d);

    // var v_min = window.SIMD.Float32x4(min.x, min.y, min.z);
    this.vector3d = window.SIMD.Float32x4.minNum(this.vector3d, min.vector3d);

    // if ( this.x < min.x ) {
    //
    // 	this.x = min.x;
    //
    // } else if ( this.x > max.x ) {
    //
    // 	this.x = max.x;
    //
    // }
    //
    // if ( this.y < min.y ) {
    //
    // 	this.y = min.y;
    //
    // } else if ( this.y > max.y ) {
    //
    // 	this.y = max.y;
    //
    // }
    //
    // if ( this.z < min.z ) {
    //
    // 	this.z = min.z;
    //
    // } else if ( this.z > max.z ) {
    //
    // 	this.z = max.z;
    //
    // }

    return this;

  },

  clampScalar: (function() {

    var min, max;

    return function(minVal, maxVal) {

      if (min === undefined) {

        min = new THREE.Vector3();
        max = new THREE.Vector3();

      }

      min.set(minVal, minVal, minVal);
      max.set(maxVal, maxVal, maxVal);

      return this.clamp(min, max);

    };

  })(),

  floor: function() {

    var x = Math.floor(window.SIMD.Float32x4.extractLane(this.vector3d, 0));
    var y = Math.floor(window.SIMD.Float32x4.extractLane(this.vector3d, 1));
    var z = Math.floor(window.SIMD.Float32x4.extractLane(this.vector3d, 2));

    this.vector3d = window.SIMD.Float32x4(x, y, z);

    return this;

  },

  ceil: function() {

    var x = Math.ceil(window.SIMD.Float32x4.extractLane(this.vector3d, 0));
    var y = Math.ceil(window.SIMD.Float32x4.extractLane(this.vector3d, 1));
    var z = Math.ceil(window.SIMD.Float32x4.extractLane(this.vector3d, 2));

    this.vector3d = window.SIMD.Float32x4(x, y, z);

    return this;

  },

  round: function() {

    var x = Math.round(window.SIMD.Float32x4.extractLane(this.vector3d, 0));
    var y = Math.round(window.SIMD.Float32x4.extractLane(this.vector3d, 1));
    var z = Math.round(window.SIMD.Float32x4.extractLane(this.vector3d, 2));

    this.vector3d = window.SIMD.Float32x4(x, y, z);

    return this;

  },

  roundToZero: function() {

    var x = window.SIMD.Float32x4.extractLane(this.vector3d, 0);
    var y = window.SIMD.Float32x4.extractLane(this.vector3d, 1);
    var z = window.SIMD.Float32x4.extractLane(this.vector3d, 2);

    x = (x < 0) ? Math.ceil(x) : Math.floor(x);
    y = (y < 0) ? Math.ceil(y) : Math.floor(y);
    z = (z < 0) ? Math.ceil(z) : Math.floor(z);

    this.vector3d = window.SIMD.Float32x4(x, y, z);

    return this;

  },

  negate: function() {

    this.vector3d = window.SIMD.Float32x4.mul(this.vector3d, window.SIMD.Float32x4(-1, -1, -1));

    return this;

  },

  dot: function(v) {

    var v3 = window.SIMD.Float32x4.mul(this.vector3d, v);
    var sum = window.SIMD.Float32x4.extractLane(v3, 0) +
			window.SIMD.Float32x4.extractLane(v3, 1) +
			window.SIMD.Float32x4.extractLane(v3, 2);

    return sum;

  },

  lengthSq: function() {

    // return this.x * this.x + this.y * this.y + this.z * this.z;
    // square each value then sum it up
    var squaredVector = window.SIMD.Float32x4.mul(this.vector3d, this.vector3d);

    var extract = window.SIMD.Float32x4.extractLane;

    return extract(squaredVector, 0) + extract(squaredVector, 1) + extract(squaredVector, 2);

  },

  length: function() {

    // return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );
    return Math.sqrt(this.lengthSq());

  },

  lengthManhattan: function() {
    var extract = window.SIMD.Float32x4.extractLane;
    var v3 = this.vector3d;
    return Math.abs(extract(v3, 0)) + Math.abs(extract(v3, 1)) + Math.abs(extract(v3, 2));

  },

  normalize: function() {

    return this.divideScalar(this.length());

  },

  setLength: function(l) {

    var oldLength = this.length();

    if (oldLength !== 0 && l !== oldLength) {

      this.multiplyScalar(l / oldLength);
    }

    return this;

  },

  lerp: function(v, alpha) {

    // this.x += ( v.x - this.x ) * alpha;
    // this.y += ( v.y - this.y ) * alpha;
    // this.z += ( v.z - this.z ) * alpha;
    var v_alpha = window.SIMD.Float32x4(alpha, alpha, alpha);
    // v = window.SIMD.Float32x4(v.x, v.y, v.z);
    this.vector3d = window.SIMD.Float32x4.mul(
      window.SIMD.Float32x4.sub(v.vector3d, this.vector3d),
      v_alpha
    );

    return this;

  },

  lerpVectors: function(v1, v2, alpha) {

    this.subVectors(v2.vector3d, v1.vector3d).multiplyScalar(alpha).add(v1.vector3d);

    return this;

  },

  cross: function(v, w) {

    if (w !== undefined) {

      THREE.warn('THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.');
      return this.crossVectors(v, w);

    }

    // var x = this.x, y = this.y, z = this.z;
    // var x = window.SIMD.Float32x4.extractLane(this.vector3d, 0);
    // var y = window.SIMD.Float32x4.extractLane(this.vector3d, 1);
    // var z = window.SIMD.Float32x4.extractLane(this.vector3d, 2);

    // var newX = y * v.z - z * v.y;
    // var newY = z * v.x - x * v.z;
    // var newZ = x * v.y - y * v.x;

    this.vector3d = window.SIMD.Float32x4.sub(
			window.SIMD.Float32x4.mul(
        window.SIMD.Float32x4.swizzle(this.vector3d, 1, 2, 0, 3),
        window.SIMD.Float32x4.swizzle(v.vector3d, 2, 0, 1, 3)
      ),
			window.SIMD.Float32x4.mul(
        window.SIMD.Float32x4.swizzle(this.vector3d, 2, 0, 1, 3),
        window.SIMD.Float32x4.swizzle(v.vector3d, 1, 2, 0, 3)
      )
		);

    // this.vector3d = window.SIMD.Float32x4(newX, newY, newZ);

    return this;

  },

  crossVectors: function(a, b) {

    // var ax = a.x,
    //   ay = a.y,
    //   az = a.z;
    // var bx = b.x,
    //   by = b.y,
    //   bz = b.z;
    //
    // var newX = ay * bz - az * by;
    // var newY = az * bx - ax * bz;
    // var newZ = ax * by - ay * bx;
    //
    // this.vector3d = window.SIMD.Float32x4(newX, newY, newZ);

    this.vector3d = window.SIMD.Float32x4.sub(
			window.SIMD.Float32x4.mul(
        window.SIMD.Float32x4.swizzle(a.vector3d, 1, 2, 0, 3),
        window.SIMD.Float32x4.swizzle(b.vector3d, 2, 0, 1, 3)
      ),
			window.SIMD.Float32x4.mul(
        window.SIMD.Float32x4.swizzle(a.vector3d, 2, 0, 1, 3),
        window.SIMD.Float32x4.swizzle(b.vector3d, 1, 2, 0, 3)
      )
		);

    return this;

  },

  projectOnVector: function() {

    var v1, dot;

    return function(vector) {

      if (v1 === undefined) v1 = new THREE.Vector3();

      v1.copy(vector).normalize();

      dot = this.dot(v1);

      return this.copy(v1).multiplyScalar(dot);

    };

  }(),

  projectOnPlane: function() {

    var v1;

    return function(planeNormal) {

      if (v1 === undefined) v1 = new THREE.Vector3();

      v1.copy(this).projectOnVector(planeNormal);

      return this.sub(v1);

    };

  }(),

  reflect: function() {

    // reflect incident vector off plane orthogonal to normal
    // normal is assumed to have unit length

    var v1;

    return function(normal) {

      if (v1 === undefined) v1 = new THREE.Vector3();

      return this.sub(v1.copy(normal).multiplyScalar(2 * this.dot(normal)));

    };

  }(),

  angleTo: function(v) {

    var theta = this.dot(v) / (this.length() * v.length());

    // clamp, to handle numerical problems

    return Math.acos(THREE.Math.clamp(theta, -1, 1));

  },

  distanceTo: function(v) {

    return Math.sqrt(this.distanceToSquared(v));

  },

  distanceToSquared: function(v) {

    // var dx = this.x - v.x;
    // var dy = this.y - v.y;
    // var dz = this.z - v.z;
    var vector3d = window.SIMD.Float32x4.sub(this.vector3d, v.vector3d);
    vector3d = window.SIMD.Float32x4.mul(vector3d, vector3d);
    var sum = window.SIMD.Float32x4.extractLane(vector3d, 0) +
      window.SIMD.Float32x4.extractLane(vector3d, 1) +
      window.SIMD.Float32x4.extractLane(vector3d, 2);

    return sum;

  },

  setEulerFromRotationMatrix: function() {

    THREE.error('THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.');

  },

  setEulerFromQuaternion: function() {

    THREE.error('THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.');

  },

  getPositionFromMatrix: function(m) {

    THREE.warn('THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition().');

    return this.setFromMatrixPosition(m);

  },

  getScaleFromMatrix: function(m) {

    THREE.warn('THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale().');

    return this.setFromMatrixScale(m);
  },

  getColumnFromMatrix: function(index, matrix) {

    THREE.warn('THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn().');

    return this.setFromMatrixColumn(index, matrix);

  },

  setFromMatrixPosition: function(m) {

    // this.x = m.elements[ 12 ];
    // this.y = m.elements[ 13 ];
    // this.z = m.elements[ 14 ];
    this.vector3d = window.SIMD.Float32x4(m.elements[12], m.elements[13], m.elements[14]);

    return this;

  },

  setFromMatrixScale: function(m) {

    var sx = this.set(m.elements[0], m.elements[1], m.elements[2]).length();
    var sy = this.set(m.elements[4], m.elements[5], m.elements[6]).length();
    var sz = this.set(m.elements[8], m.elements[9], m.elements[10]).length();

    this.vector3d = window.SIMD.Float32x4(sx, sy, sz);

    return this;
  },

  setFromMatrixColumn: function(index, matrix) {

    var offset = index * 4;

    var me = matrix.elements;

    // this.x = me[ offset ];
    // this.y = me[ offset + 1 ];
    // this.z = me[ offset + 2 ];

    this.vector3d = window.SIMD.Float32x4(me[offset], me[offset + 1], me[offset + 2]);

    return this;

  },

  equals: function(v) {
    var x = window.SIMD.Float32x4.extractLane(this.vector3d, 0);
    var y = window.SIMD.Float32x4.extractLane(this.vector3d, 1);
    var z = window.SIMD.Float32x4.extractLane(this.vector3d, 2);

    return ((v.x === x) && (v.y === y) && (v.z === z));

  },

  fromArray: function(array, offset) {

    if (offset === undefined) offset = 0;

    // this.x = array[ offset ];
    // this.y = array[ offset + 1 ];
    // this.z = array[ offset + 2 ];
    this.vector3d = window.SIMD.Float32x4(array[offset], array[offset + 1], array[offset + 2]);

    return this;

  },

  toArray: function(array, offset) {

    if (array === undefined) array = [];
    if (offset === undefined) offset = 0;

    array[offset] = window.SIMD.Float32x4.extractLane(this.vector3d, 0);
    array[offset + 1] = window.SIMD.Float32x4.extractLane(this.vector3d, 1);
    array[offset + 2] = window.SIMD.Float32x4.extractLane(this.vector3d, 2);

    return array;

  },

  fromAttribute: function(attribute, index, offset) {

    if (offset === undefined) offset = 0;

    index = index * attribute.itemSize + offset;

    // this.x = attribute.array[ index ];
    // this.y = attribute.array[ index + 1 ];
    // this.z = attribute.array[ index + 2 ];
    this.vector3d = window.SIMD.Float32x4(attribute.array[index], attribute.array[index + 1], attribute.array[index + 2]);

    return this;

  },

  clone: function() {
    // console.log(this);
    var x = window.SIMD.Float32x4.extractLane(this.vector3d, 0);
    var y = window.SIMD.Float32x4.extractLane(this.vector3d, 1);
    var z = window.SIMD.Float32x4.extractLane(this.vector3d, 2);
    return new THREE.Vector3(x, y, z);

  }

};
