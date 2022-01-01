import React from "react";
import classNames from "classnames/bind";
import "../util/reset.css";
import styles from "./HomePage.module.scss";
import { Link } from "react-router-dom";
import TitleBox from "../components/TitleBox";

const cx = classNames.bind(styles);

const HomePage = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("title")}>MOO, HAE.</div>
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
        <Link to="/memo">
          <TitleBox
            title="메모."
            icon="images/memo.jpg"
            summary="빠르게 쓰고 간편하게 읽어요"
          />
        </Link>
        <Link to="/math-eq">
          <TitleBox
            title="LaTeX."
            icon="images/matheq.jpg"
            summary="코드를 바로 수식으로"
            color="#716e96"
          />
        </Link>
        <Link to="/markdown">
          <TitleBox
            title="마크다운."
            icon="images/markdown.jpg"
            summary="군더더기 없는 마크다운 편집기"
            color="#659996"
          />
        </Link>
        <Link to="/scheduler">
          <TitleBox
            title="스케쥴러."
            icon="images/scheduler-02.jpg"
            summary="글로 쓰는 스케쥴러"
            color="#ff3737"
          />
        </Link>
        <Link to="/three-js">
          <TitleBox
            title="Three.js."
            icon="images/threejs-02.jpg"
            summary="Three.js 데모 페이지"
            color="#333333"
          />
        </Link>
        <Link to="/">
          <TitleBox
            title="기타."
            icon="images/moohae.jpg"
            summary="추가 예정입니다!"
            color="#555555"
          />
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
