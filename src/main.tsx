import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


// const loader = new THREE.ObjectLoader();

// loader.load("", (object) => {
//   // Create a new Mesh object from the loaded geometry
//   const mesh = new THREE.Mesh(object.children[0].geometry, material);

//   // Remove the original mesh from the scene
//   scene.remove(mesh);

//   // Add the new mesh to the scene
//   scene.add(mesh);

// })

const scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: 0x00ff83,
})

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 10, 10);
scene.add(light);

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1)
camera.position.z = 10;
scene.add(camera);

const canvas = document.querySelector(".webgl") as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas });

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2); // This makes it render better - default is 1
renderer.render(scene, camera);

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  // renderer.render(scene, camera);
})

const rerenderLoop = () => {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(rerenderLoop);
}

rerenderLoop();
