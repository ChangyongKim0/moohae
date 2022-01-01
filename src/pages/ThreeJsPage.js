import React, { useEffect } from "react";
import classNames from "classnames/bind";
import "../util/reset.css";
import styles from "./ThreeJsPage.module.scss";

import * as THREE from "three";
import oc from "three-orbit-controls";

const cx = classNames.bind(styles);

const OrbitControls = oc(THREE);

const ThreeJsPage = () => {
  const size = { width: window.innerWidth, height: window.innerHeight };

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    size.width / size.height,
    1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ antialias: true });

  camera.position.z = 5;
  scene.add(camera);

  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  renderer.setClearColor(new THREE.Color("#21282a"), 1);

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff80 });
  const cube = new THREE.Mesh(geometry, material);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 1;
  controls.maxDistance = 500;

  scene.add(cube);

  const animate = () => {
    requestAnimationFrame(animate);
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    controls.update();
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

  return <div className={cx("wrapper") + " three-js-container"}></div>;
};

export default ThreeJsPage;
