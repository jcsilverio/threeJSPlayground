function init() {
  var scene = new THREE.Scene();

  var box = getBox(1,1,1);

  scene.add(box);

  var camera = new THREE.PerspectiveCamera(
    45, //field of view
    window.innerWidth / window.innerHeight, //aspect ratio
    1, //near clipping plane
    1000 //far clipping plane
  );

  camera.position.z = 5;

  var renderer = new THREE.WebGLRenderer();

  renderer.setSize(window.innerWidth, window.innerHeight);

  document.getElementById('webgl').appendChild(renderer.domElement);
  renderer.render(
    scene,
    camera
  );
}

function getBox(w, h, d) {
    var geometry = new THREE.BoxGeometry(1,1,1);
  var material = new THREE.MeshBasicMaterial({
    color: 0x00ff00
  });
  var mesh = new THREE.Mesh(
    geometry,
    material
    );
return mesh;
}



init();