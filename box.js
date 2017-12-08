function initBox() {
  var scene = new THREE.Scene();
  var gui = new dat.GUI();

  var enableFog = false;

  if (enableFog) {
    scene.fog = new THREE.FogExp2(0xffffff, 0.2);
  }

  var box = getBox(1, 1, 1);
  var plane = getPlane(20);
  var pointLight = getPointLight(1);
  var sphere = getSphere(0.05);

  plane.name = 'plane-1';

  box.position.y = box.geometry.parameters.height / 2;
  plane.rotation.x = Math.PI / 2; // 90 degrees
  pointLight.position.y = 2;
  pointLight.intensity = 2;

  //SCENE
  scene.add(box);
  scene.add(plane);
  pointLight.add(sphere);
  scene.add(pointLight);

  // UI CONTROLLER
  gui.add(pointLight, 'intensity', 0, 10); //object, property name, min val, max val
  gui.add(pointLight.position, 'y', 0, 5);

  //CAMERA
  var camera = new THREE.PerspectiveCamera(
    45, //field of view
    window.innerWidth / window.innerHeight, //aspect ratio
    1, //near clipping plane
    1000 //far clipping plane
  );

  camera.position.x = 1;
  camera.position.y = 2;
  camera.position.z = 5;

  camera.lookAt(new THREE.Vector3(0, 0, 0)); //camera looks at center of scene


  //RENDERER
  var renderer = new THREE.WebGLRenderer();
  renderer.shadowMap.enabled = true;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor('rgb(120, 120, 120)'); //background scene color
  document.getElementById('webgl').appendChild(renderer.domElement);

  var controls = new THREE.OrbitControls(camera, renderer.domElement);

  update(renderer, scene, camera, controls);

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
  mesh.castShadow = true;

  return mesh;
} // END INIT

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
  mesh.receiveShadow = true;

  return mesh;
}

function getSphere(size) {
  var geometry = new THREE.SphereGeometry(size, 24, 24); // radius, width segments, height segments
  var material = new THREE.MeshBasicMaterial({
    color: 'rgb(255, 255, 255)' //pure light
  });
  var mesh = new THREE.Mesh(
    geometry,
    material
  );

  return mesh;
}

function getPointLight(intensity) {
  var light = new THREE.PointLight(0xffffff, intensity);
  light.castShadow = true;
  return light;
}

function update(renderer, scene, camera, controls) {
  renderer.render(
    scene,
    camera
  );

  controls.update();

  requestAnimationFrame(function() {
    update(renderer, scene, camera, controls);
  })
}

// var scene = initBox();