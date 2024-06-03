import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red" });

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cubeMesh);

// initialize the camera
/* const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 35);
 */

const aspectRatio = window.innerWidth / window.innerHeight;

const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 200);
camera.position.z = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
	antialias: true,
	canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);
const maxPixelRation = Math.min(window.devicePixelRatio, 2);

// Anti-aliasing solution
renderer.setPixelRatio(window.devicePixelRatio);
console.log(window.devicePixelRatio);

// instantiate controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.autoRotate = true;

window.addEventListener("resize", () => {
	camera.aspect = aspectRatio;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
});

// render the scene
const renderloop = () => {
	controls.update();

	renderer.render(scene, camera);

	window.requestAnimationFrame(renderloop);
};

renderloop();
