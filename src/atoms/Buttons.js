import React from "react";
import classNames from "classnames/bind";
import "../util/reset.css";
import styles from "./Buttons.module.scss";

const cx = classNames.bind(styles);

const Buttons = ({ texts, onClicks, type = "text" }) => {
  return (
    <div className={cx("wrapper")}>
      {texts.map((e, idx) => {
        return (
          <div key={idx} onClick={onClicks[idx]} className={cx("text")}>
            {e}
          </div>
        );
      })}
    </div>
  );
};

Buttons.defaultProps = {
  texts: ["button1", "button2"],
  onClicks: [() => {}, () => {}],
};

export default Buttons;
