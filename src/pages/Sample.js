import React from "react";
import classNames from "classnames/bind";
import "../util/reset.css";
import styles from "./Sample.module.scss";

const cx = classNames.bind(styles);

const Sample = () => {
  return <div className={cx("wrapper")}></div>;
};

export default Sample;
