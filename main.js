function init() {
  var scene = new THREE.Scene();

  var enableFog = false;

  if (enableFog) {
    scene.fog = new THREE.FogExp2(0xffffff, 0.2);
  }

  var box = getBox(1,1,1);
  var plane = getPlane(20);
  var pointLight = getPointLight(1);

  plane.name = 'plane-1';

  box.position.y = box.geometry.parameters.height/2;
  plane.rotation.x = Math.PI/2; // 90 degrees
  pointLight.position.y = 2;


  scene.add(box);
  scene.add(plane);
  scene.add(pointLight);

  var camera = new THREE.PerspectiveCamera(
    45, //field of view
    window.innerWidth / window.innerHeight, //aspect ratio
    1, //near clipping plane
    1000 //far clipping plane
  );


  camera.position.x = 1;
  camera.position.y = 2;
  camera.position.z = 5;

  camera.lookAt(new THREE.Vector3(0,0,0)); //camera looks at center of scene

  var renderer = new THREE.WebGLRenderer();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor('rgb(120, 120, 120)');  //background scene color

  document.getElementById('webgl').appendChild(renderer.domElement);
  update(renderer, scene, camera);

  return scene;
}

function getBox(w, h, d) {
    var geometry = new THREE.BoxGeometry(w, h, d);
  var material = new THREE.MeshPhongMaterial({
    color: 'rgb(120, 120, 120)'
  });
  var mesh = new THREE.Mesh(
    geometry,
    material
    );
return mesh;
}

function getPlane(size) {
    var geometry = new THREE.PlaneGeometry(size, size);
  var material = new THREE.MeshPhongMaterial({
    color: 'rgb(120, 120, 120)',
    side: THREE.DoubleSide
  });
  var mesh = new THREE.Mesh(
    geometry,
    material
    );
return mesh;
}

function getPointLight(intensity) {
  var light = new THREE.PointLight(0xffffff, intensity);
  return light;
}


function update (renderer, scene, camera) {
  renderer.render(
    scene,
    camera
    );

  requestAnimationFrame(function () {
    update(renderer, scene, camera);
  })

}


var scene = init();