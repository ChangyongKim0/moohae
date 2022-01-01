import React, { useEffect } from "react";
import classNames from "classnames/bind";
import "../util/reset.css";
import styles from "./TitleBox.module.scss";

const cx = classNames.bind(styles);

const TitleBox = ({ title, icon, summary, color }) => {
  return (
    <div className={cx("wrapper")}>
      <img src={icon} alt={title} className={cx("logo")} />
      <div className={cx("frame-content")}>
        <div className={cx("title")} style={{ color: color }}>
          {title}
        </div>
        <div className={cx("summary")}>{summary}</div>
      </div>
    </div>
  );
};

export default TitleBox;
