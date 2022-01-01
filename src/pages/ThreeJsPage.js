import React from "react";
import classNames from "classnames/bind";
import "../util/reset.css";
import styles from "./ThreeJsPage.module.scss";
import { Link } from "react-router-dom";
import TitleBox from "../components/TitleBox";

const cx = classNames.bind(styles);

const ThreeJsPage = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("title")}>THREE.JS.</div>
      {/* <div className={cx("frame-logo")}>
        <img
          src="images/xprnc-revert.png"
          alt="Experience"
          className={cx("logo-xprnc")}
        />
        <div className={cx("logo-times")}>×</div>
        <img
          src="images/moohae.jpg"
          alt="Experience"
          className={cx("logo-moohae")}
        />
      </div> */}
      <div className={cx("frame-button")}>
        <Link to="/three-js/torus">
          <TitleBox
            title="Torus."
            icon="images/threejs-02.jpg"
            summary="움직이는 도넛"
            color="#333333"
          />
        </Link>
        <Link to="/">
          <TitleBox
            title="뒤로가기."
            icon="images/moohae.jpg"
            summary=""
            color="#555555"
          />
        </Link>
      </div>
    </div>
  );
};

export default ThreeJsPage;
