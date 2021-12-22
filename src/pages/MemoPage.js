import React, { useEffect } from "react";
import classNames from "classnames/bind";
import "../util/reset.css";
import styles from "./MemoPage.module.scss";

const cx = classNames.bind(styles);

const title = ["무 해 한", "메 모 장"];

const MemoPage = () => {
  const adjustTextareaHeight = () => {
    let elements = Array.from(document.getElementsByTagName("textarea"));
    elements.forEach((element) => {
      element.style.height = "10px";
      // element.scrollTop = 0;
      element.style.height = element.scrollHeight + 10 + "px";
      console.log(element.scrollHeight);
    });
  };
  const getValue = (element) => {
    console.log(this);
  };

  const data = ["dkdkdkdkd", "dddddd"];

  useEffect(() => adjustTextareaHeight(), []);

  return (
    <div className={cx("wrapper")}>
      <div></div>
      <div className={cx("frame-main")}>
        {title.map((e, idx) => {
          return (
            <div key={idx} className={cx("title")}>
              {e}
            </div>
          );
        })}
        <div className={cx("frame-content")}>
          {data.map((e, idx) => {
            return (
              <textarea
                key={idx}
                className={cx("content")}
                placeholder={e}
                spellCheck={false}
                onKeyUp={adjustTextareaHeight}
              ></textarea>
            );
          })}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default MemoPage;
