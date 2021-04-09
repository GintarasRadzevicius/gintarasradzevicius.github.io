let scene;
let camera;
let renderer;
let width = window.innerWidth;
let height = 50;

setup();
draw();

function setup() {
  setupScene();
  setupRenderer();
  setupCamera();
  setupText();
  setupLights();
  setupEventListeners();
}

function setupScene() {
  scene = new THREE.Scene();
  let background = new THREE.Color(0x1e1e1e);
  scene.background = background;
}

function setupCamera() {
  let res = width / height;
  camera = new THREE.PerspectiveCamera(5, res, 0.1, 1000);
  camera.position.set(-200, -20, 200);
  let controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.update();
}

function setupRenderer() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  document.getElementById('header').appendChild(renderer.domElement);
}

function setupText() {
  let loader = new THREE.FontLoader();

  loader.load(
    "three_js_test/Fonts/Times New Roman_Regular.json",
    function (font) {
      let message = "S k a i č i u o k  d i e n a s";
      let geometry = new THREE.TextGeometry(message, {
        font: font,
        size: 10,
        height: 5,
        curveSegments: 10,
        bevelEnabled: false,
        // bevelThickness: 2,
        // bevelSize: 1,
        // bevelSegments: 1
      });

    let material = new THREE.MeshPhongMaterial({
        color: 0x061466cc,
        // opacity: 0.5,
        // overdraw: 0.5,
        shininess: 70,
      });


      geometry.center();
      let mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
    }
  );
}

function setupLights() {
  let ambientLight = new THREE.AmbientLight(0x444444);
  scene.add(ambientLight);

  let spotLight = new THREE.SpotLight(0xcccccc);
  spotLight.position.set(200, 100, 400);
  spotLight.castShadow = true;
  scene.add(spotLight);

  // let spotLight2 = new THREE.SpotLight(0xcccccc);
  // spotLight2.position.set(0, 0, 50);
  // scene.add(spotLight2);


}

function setupEventListeners() {
  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

function draw() {
  requestAnimationFrame(draw);
  renderer.render(scene, camera);
}
