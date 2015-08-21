/*global THREE SIMD*/

/**
 * @author mrdoob / http://mrdoob.com/
 * @author *kile / http://kile.stravaganza.org/
 * @author philogb / http://blog.thejit.org/
 * @author mikael emtinger / http://gomo.se/
 * @author egraether / http://egraether.com/
 * @author WestLangley / http://github.com/WestLangley
 */

THREE.Vector3 = function(x, y, z) {

  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
  this.vector3d = SIMD.Float32x4(x, y, z);

};

THREE.Vector3.prototype = {

  constructor: THREE.Vector3,

  set: function(x, y, z) {

    // this.x = x;
    // this.y = y;
    // this.z = z;
    this.vector3d = SIMD.Float32x4(x, y, z);

    return this;

  },

  setX: function(x) {

    // this.x = x;
    this.vector3d = SIMD.Float32x4.replaceLane(this.vector3d, 0, x);

    return this;

  },

  setY: function(y) {

    // this.y = y;
    this.vector3d = SIMD.Float32x4.replaceLane(this.vector3d, 1, y);

    return this;

  },

  setZ: function(z) {

    // this.z = z;
    this.vector3d = SIMD.Float32x4.replaceLane(this.vector3d, 2, z);

    return this;

  },

  setComponent: function(index, value) {

    if (index >= 0 && index <= 2) {
      this.vector3d = SIMD.Float32x4.replaceLane(this.vector3d, index, value);
    } else {
      throw new Error('index is out of range: ' + index);
    }

  },

  getComponent: function(index) {

    if (index >= 0 && index <= 2) {
      return SIMD.Float32x4.extractLane(this.vector3d, index);
    } else {
      throw new Error('index is out of range: ' + index);
    }

  },

  copy: function(v) {

    // this.x = v.x;
    // this.y = v.y;
    // this.z = v.z;
    this.vector3d = SIMD.Float32x4(v.x, v.y, v.z);

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
    this.vector3d = SIMD.Float32x4.add(this.vector3d, SIMD.Float32x4(v.x, v.y, v.z));

    return this;

  },

  addScalar: function(s) {

    // this.x += s;
    // this.y += s;
    // this.z += s;
    this.vector3d = SIMD.Float32x4.add(this.vector3d, SIMD.Float32x4(s, s, s));

    return this;

  },

  addVectors: function(a, b) {

    // this.x = a.x + b.x;
    // this.y = a.y + b.y;
    // this.z = a.z + b.z;
    this.vector3d = SIMD.Float32x4.add(SIMD.Float32x4(a.x, a.y, a.z), SIMD.Float32x4(b.x, b.y, b.z));

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
    this.vector3d = SIMD.Float32x4.sub(this.vector3d, SIMD.Float32x4(v.x, v.y, v.z));

    return this;

  },

  subScalar: function(s) {

    // this.x -= s;
    // this.y -= s;
    // this.z -= s;
    this.vector3d = SIMD.Float32x4.sub(this.vector3d, SIMD.Float32x4(s, s, s));

    return this;

  },

  subVectors: function(a, b) {

    // this.x = a.x - b.x;
    // this.y = a.y - b.y;
    // this.z = a.z - b.z;
    this.vector3d = SIMD.Float32x4.sub(SIMD.Float32x4(a.x, a.y, a.z), SIMD.Float32x4(b.x, b.y, b.z));

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
    this.vector3d = SIMD.Float32x4.mul(this.vector3d, SIMD.Float32x4(v.x, v.y, v.z));

    return this;

  },

  multiplyScalar: function(scalar) {

    // this.x *= scalar;
    // this.y *= scalar;
    // this.z *= scalar;
    this.vector3d = SIMD.Float32x4.mul(this.vector3d, SIMD.Float32x4(scalar, scalar, scalar));

    return this;

  },

  multiplyVectors: function(a, b) {

    // this.x = a.x * b.x;
    // this.y = a.y * b.y;
    // this.z = a.z * b.z;
    this.vector3d = SIMD.Float32x4.mul(SIMD.Float32x4(a.x, a.y, a.z), SIMD.Float32x4(b.x, b.y, b.z));

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

    var x = SIMD.Float32x4.extractLane(this.vector3d, 0);
    var y = SIMD.Float32x4.extractLane(this.vector3d, 1);
    var z = SIMD.Float32x4.extractLane(this.vector3d, 2);

    // this.vector3d = SIMD.Float32x4.replaceLane(this.vector3d, 0, bla)
    // this.vector3d = SIMD.Float32x4.replaceLane(this.vector3d, 1, bla)
    // this.vector3d = SIMD.Float32x4.replaceLane(this.vector3d, 2, bla)

    var e = m.elements;

    var newX = e[0] * x + e[3] * y + e[6] * z;
    var newY = e[1] * x + e[4] * y + e[7] * z;
    var newZ = e[2] * x + e[5] * y + e[8] * z;

    this.vector3d = SIMD.Float32x4(newX, newY, newZ);

    return this;

  },

  applyMatrix4: function(m) {

    // input: THREE.Matrix4 affine matrix

    var x = SIMD.Float32x4.extractLane(this.vector3d, 0);
    var y = SIMD.Float32x4.extractLane(this.vector3d, 1);
    var z = SIMD.Float32x4.extractLane(this.vector3d, 2);

    var e = m.elements;

    var newX = e[0] * x + e[4] * y + e[8] * z + e[12];
    var newY = e[1] * x + e[5] * y + e[9] * z + e[13];
    var newZ = e[2] * x + e[6] * y + e[10] * z + e[14];

    this.vector3d = SIMD.Float32x4(newX, newY, newZ);

    return this;

  },

  applyProjection: function(m) {

    // input: THREE.Matrix4 projection matrix

    var x = SIMD.Float32x4.extractLane(this.vector3d, 0);
    var y = SIMD.Float32x4.extractLane(this.vector3d, 1);
    var z = SIMD.Float32x4.extractLane(this.vector3d, 2);

    var e = m.elements;
    var d = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]); // perspective divide

    var newX = (e[0] * x + e[4] * y + e[8] * z + e[12]) * d;
    var newY = (e[1] * x + e[5] * y + e[9] * z + e[13]) * d;
    var newZ = (e[2] * x + e[6] * y + e[10] * z + e[14]) * d;

    this.vector3d = SIMD.Float32x4(newX, newY, newZ);

    return this;

  },

  applyQuaternion: function(q) {

    var x = SIMD.Float32x4.extractLane(this.vector3d, 0);
    var y = SIMD.Float32x4.extractLane(this.vector3d, 1);
    var z = SIMD.Float32x4.extractLane(this.vector3d, 2);

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

    this.vector3d = SIMD.Float32x4(newX, newY, newZ);

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

    var x = SIMD.Float32x4.extractLane(this.vector3d, 0);
    var y = SIMD.Float32x4.extractLane(this.vector3d, 1);
    var z = SIMD.Float32x4.extractLane(this.vector3d, 2);

    var e = m.elements;

    var newX = e[0] * x + e[4] * y + e[8] * z;
    var newY = e[1] * x + e[5] * y + e[9] * z;
    var newZ = e[2] * x + e[6] * y + e[10] * z;

    this.vector3d = SIMD.Float32x4(newX, newY, newZ);

    this.normalize();

    return this;

  },

  divide: function(v) {

    this.vector3d = SIMD.Float32x4.div(this.vector3d, SIMD.Float32x4(v.x, v.y, v.z));

    return this;

  },

  divideScalar: function(scalar) {

    if (scalar !== 0) {

      this.vector3d = SIMD.Float32x4.div(this.vector3d, SIMD.Float32x4(scalar, scalar, scalar));

    } else {

      this.vector3d = SIMD.Float32x4(0, 0, 0);

    }

    return this;

  },

  min: function(v) {

    v = SIMD.Float32x4(v.x, v.y, v.z);
    this.vector3d = SIMD.Float32x4.minNum(this.vector3d, v);

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

    v = SIMD.Float32x4(v.x, v.y, v.z);
    this.vector3d = SIMD.Float32x4.maxNum(this.vector3d, v);

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

    var v_max = SIMD.Float32x4(max.x, max.y, max.z);
    this.vector3d = SIMD.Float32x4.maxNum(this.vector3d, v_max);

    var v_min = SIMD.Float32x4(min.x, min.y, min.z);
    this.vector3d = SIMD.Float32x4.minNum(this.vector3d, v_min);

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

    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    this.z = Math.floor(this.z);

    return this;

  },

  ceil: function() {

    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    this.z = Math.ceil(this.z);

    return this;

  },

  round: function() {

    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    this.z = Math.round(this.z);

    return this;

  },

  roundToZero: function() {

    this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
    this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
    this.z = (this.z < 0) ? Math.ceil(this.z) : Math.floor(this.z);

    return this;

  },

  negate: function() {

    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;

    return this;

  },

  dot: function(v) {

    return this.x * v.x + this.y * v.y + this.z * v.z;

  },

  lengthSq: function() {

    // return this.x * this.x + this.y * this.y + this.z * this.z;
    // square each value then sum it up
    var squaredVector = SIMD.Int32x4.shiftLeftByScalar(this.vector3d, 1);

    var extract = SIMD.Int32x4.extractLane;

    return extract(squaredVector, 0) + extract(squaredVector, 1) + extract(squaredVector, 2);

  },

  length: function() {

    // return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );
    return Math.sqrt(this.lengthSq());

  },

  lengthManhattan: function() {
    var extract = SIMD.Int32x4.extractLane;
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
    var v_alpha = SIMD.Float32x4(alpha, alpha, alpha);
    v = SIMD.Float32x4(v.x, v.y, v.z);
    this.vector3d = SIMD.Float32x4.mul(
      SIMD.Float32x4.sub(v, this.vector3d),
      v_alpha
    );

    return this;

  },

  lerpVectors: function(v1, v2, alpha) {

    this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);

    return this;

  },

  cross: function(v, w) {

    if (w !== undefined) {

      THREE.warn('THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.');
      return this.crossVectors(v, w);

    }

    // var x = this.x, y = this.y, z = this.z;
    var x = SIMD.Float32x4.extractLane(this.vector3d, 0);
    var y = SIMD.Float32x4.extractLane(this.vector3d, 1);
    var z = SIMD.Float32x4.extractLane(this.vector3d, 2);

    var newX = y * v.z - z * v.y;
    var newY = z * v.x - x * v.z;
    var newZ = x * v.y - y * v.x;

    this.vector3d = SIMD.Float32x4(newX, newY, newZ);

    return this;

  },

  crossVectors: function(a, b) {

    var ax = a.x,
      ay = a.y,
      az = a.z;
    var bx = b.x,
      by = b.y,
      bz = b.z;

    var newX = ay * bz - az * by;
    var newY = az * bx - ax * bz;
    var newZ = ax * by - ay * bx;

    this.vector3d = SIMD.Float32x4(newX, newY, newZ);

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
    var vector3d = SIMD.Float32x4.sub(this.vector3d, SIMD.Float32x4(v.x, v.y, v.z));
    vector3d = SIMD.Float32x4.mul(vector3d, vector3d);
    var sum = SIMD.Float32x4.extractLane(vector3d, 0) +
      SIMD.Float32x4.extractLane(vector3d, 1) +
      SIMD.Float32x4.extractLane(vector3d, 2);

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
    this.vector3d = SIMD.Float32x4(m.elements[12], m.elements[13], m.elements[14]);

    return this;

  },

  setFromMatrixScale: function(m) {

    var sx = this.set(m.elements[0], m.elements[1], m.elements[2]).length();
    var sy = this.set(m.elements[4], m.elements[5], m.elements[6]).length();
    var sz = this.set(m.elements[8], m.elements[9], m.elements[10]).length();

    this.vector3d = SIMD.Float32x4(sx, sy, sz);

    return this;
  },

  setFromMatrixColumn: function(index, matrix) {

    var offset = index * 4;

    var me = matrix.elements;

    // this.x = me[ offset ];
    // this.y = me[ offset + 1 ];
    // this.z = me[ offset + 2 ];

    this.vector3d = SIMD.Float32x4(me[offset], me[offset + 1], me[offset + 2]);

    return this;

  },

  equals: function(v) {
    var x = SIMD.Float32x4.extractLane(this.vector3d, 0);
    var y = SIMD.Float32x4.extractLane(this.vector3d, 1);
    var z = SIMD.Float32x4.extractLane(this.vector3d, 2);

    return ((v.x === x) && (v.y === y) && (v.z === z));

  },

  fromArray: function(array, offset) {

    if (offset === undefined) offset = 0;

    // this.x = array[ offset ];
    // this.y = array[ offset + 1 ];
    // this.z = array[ offset + 2 ];
    this.vector3d = SIMD.Float32x4(array[offset], array[offset + 1], array[offset + 2]);

    return this;

  },

  toArray: function(array, offset) {

    if (array === undefined) array = [];
    if (offset === undefined) offset = 0;

    array[offset] = SIMD.Float32x4.extractLane(this.vector3d, 0);
    array[offset + 1] = SIMD.Float32x4.extractLane(this.vector3d, 1);
    array[offset + 2] = SIMD.Float32x4.extractLane(this.vector3d, 2);

    return array;

  },

  fromAttribute: function(attribute, index, offset) {

    if (offset === undefined) offset = 0;

    index = index * attribute.itemSize + offset;

    // this.x = attribute.array[ index ];
    // this.y = attribute.array[ index + 1 ];
    // this.z = attribute.array[ index + 2 ];
    this.vector3d = SIMD.Float32x4(attribute.array[index], attribute.array[index + 1], attribute.array[index + 2]);

    return this;

  },

  clone: function() {
    var x = SIMD.Float32x4.extractLane(this.vector3d, 0);
    var y = SIMD.Float32x4.extractLane(this.vector3d, 1);
    var z = SIMD.Float32x4.extractLane(this.vector3d, 2);
    return new THREE.Vector3(x, y, z);

  }

};
