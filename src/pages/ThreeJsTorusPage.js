import React, { useEffect } from "react";
import classNames from "classnames/bind";
import "../util/reset.css";
import styles from "./ThreeJsTorusPage.module.scss";

import * as THREE from "three";
import oc from "three-orbit-controls";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const cx = classNames.bind(styles);

// const OrbitControls = oc(THREE);

const ThreeJsTorusPage = () => {
  const size = { width: window.innerWidth, height: window.innerHeight };

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    size.width / size.height,
    0.1,
    2000
  );
  const renderer = new THREE.WebGLRenderer({ antialias: true });

  camera.position.x = 300;
  //   camera.position.y = 0;
  //   camera.position.z = 3;

  scene.add(camera);

  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  renderer.setClearColor(new THREE.Color("#21282a"), 1);

  const box_geometry = new THREE.BoxGeometry();
  const box_material = new THREE.MeshBasicMaterial({ color: 0x00ff80 });
  const cube = new THREE.Mesh(box_geometry, box_material);

  const torus_geometry = new THREE.TorusGeometry(300, 100, 32, 200);
  const torus_material = new THREE.PointsMaterial({
    size: 1.5,
    color: 0x87a7ca,
  });
  const torus = new THREE.Points(torus_geometry, torus_material);
  const torus2 = new THREE.Points(
    new THREE.TorusGeometry(300, 150, 32, 200),
    torus_material
  );

  //   const stars = new THREE.

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 1;
  controls.maxDistance = 2000;
  controls.target = new THREE.Vector3(300, 100, 0);
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;
  //   controls.screenSpacePanning = false;

  //   scene.add(cube);
  scene.add(torus);
  scene.add(torus2);

  const animate = () => {
    requestAnimationFrame(animate);
    torus.rotation.z += 0.001;
    torus2.rotation.z -= 0.001;
    torus.rotation.y -= 0.001;
    torus2.rotation.y -= 0.001;
    // cube.rotation.y += 0.01;
    controls.update();
    // camera.lookAt(new THREE.Vector3(3, 0.1, 0));
    renderer.render(scene, camera);
  };

  //   renderer.render(scene, camera);

  animate();

  useEffect(() => {
    window.addEventListener("resize", () => {
      size.width = window.innerWidth;
      size.height = window.innerHeight;
      // Update camera
      camera.aspect = size.width / size.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(size.width, size.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
    document
      .getElementsByClassName("three-js-container")[0]
      .append(renderer.domElement);
  }, []);

  return (
    <div className={cx("wrapper") + " three-js-container"}>
      <div className={cx("frame")}>
        <h1>TORUS</h1>
      </div>
    </div>
  );
};

export default ThreeJsTorusPage;
