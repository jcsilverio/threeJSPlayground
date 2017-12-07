function init() {
  var scene = new THREE.Scene();
  var gui = new dat.GUI();

  var enableFog = false;

  if (enableFog) {
    scene.fog = new THREE.FogExp2(0xffffff, 0.2);
  }

  var plane = getPlane(30);
  var spotLight = getSpotLight(1);
  var sphere = getSphere(0.05);
  var boxGrid = getBoxGrid(10, 1.5);

  plane.name = 'plane-1';

  plane.rotation.x = Math.PI / 2; // 90 degrees
  spotLight.position.y = 2;
  spotLight.intensity = 2;

  //SCENE
  scene.add(plane);
  spotLight.add(sphere);
  scene.add(spotLight);
  scene.add(boxGrid);

  // UI CONTROLLER
  gui.add(spotLight, 'intensity', 0, 10); //object, property name, min val, max val
  gui.add(spotLight.position, 'y', 0, 5);

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
} // END INIT

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
}

function getBoxGrid(amount, separationMultiplier) {
  var group = new THREE.Group();

  for (var i=0; i < amount; i++) {
    var obj = getBox(1,1,1);
    obj.position.x = i * separationMultiplier;
    obj.position.y = obj.geometry.parameters.height/2;
    group.add(obj);
    for (var j = 1; j < amount; j++) {
      var obj = getBox(1,1,1);
      obj.position.x = i * separationMultiplier;
      obj.position.y = obj.geometry.parameters.height/2;
      obj.position.z = j * separationMultiplier;
      group.add(obj);
    }
  }
  group.position.x = -(separationMultiplier * (amount-1)) /2;
  group.position.z = -(separationMultiplier * (amount-1)) /2;

  return group;
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

function getSpotLight(intensity) {
  var light = new THREE.SpotLight(0xffffff, intensity);
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

var scene = init();