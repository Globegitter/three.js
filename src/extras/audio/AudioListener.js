/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.AudioListener = function () {

	THREE.Object3D.call( this );

	this.type = 'AudioListener';

	this.context = new ( window.AudioContext || window.webkitAudioContext )();

};

THREE.AudioListener.prototype = Object.create( THREE.Object3D.prototype );
THREE.AudioListener.prototype.constructor = THREE.AudioListener;

THREE.AudioListener.prototype.updateMatrixWorld = ( function () {

	var position = new THREE.Vector3();
	var quaternion = new THREE.Quaternion();
	var scale = new THREE.Vector3();

	var orientation = new THREE.Vector3();
	var velocity = new THREE.Vector3();

	var positionPrev = new THREE.Vector3();

	return function ( force ) {

		THREE.Object3D.prototype.updateMatrixWorld.call( this, force );

		var listener = this.context.listener;
		var up = this.up;

		this.matrixWorld.decompose( position, quaternion, scale );

		orientation.set( 0, 0, -1 ).applyQuaternion( quaternion );
		velocity.subVectors( position, positionPrev );

		listener.setPosition( position.getComponent(0), position.getComponent(1), position.getComponent(2) );
		listener.setOrientation( orientation.getComponent(0), orientation.getComponent(1), orientation.getComponent(2), up.getComponent(0), up.getComponent(1), up.getComponent(2) );
		listener.setVelocity( velocity.getComponent(0), velocity.getComponent(1), velocity.getComponent(2) );

		positionPrev.copy( position );

	};

} )();
