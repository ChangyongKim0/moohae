import React, { useEffect, useReducer } from "react";
import classNames from "classnames/bind";
import "../util/reset.css";
import styles from "./MemoPage.module.scss";

const cx = classNames.bind(styles);

const title = ["메모."];

const reduceData = (state, action) => {
  let new_state = [...state];
  switch (action.type) {
    case "add":
      return [...new_state, { placeholder: action.data, id: Date.now() }];
    case "remove":
      return new_state.filter((e, idx) => idx != action.position);
    case "remove end":
      return new_state.slice(0, -1);
    default:
      return state;
  }
};

const MemoPage = () => {
  const adjustTextareaHeight = () => {
    let elements = Array.from(document.getElementsByTagName("textarea"));
    let div_elements = Array.from(
      document.getElementsByClassName("div-textarea")
    );
    console.log(div_elements);
    // let length = elements.length;
    elements.forEach((element, idx) => {
      element.style.height = "5px";
      // element.scrollTop = 0;

      div_elements[idx].style.height = element.scrollHeight + "px";
      element.style.height = element.scrollHeight + 50 + "px";
      // console.log(element.scrollHeight);
      if (
        element.value == "" &&
        idx < elements.length - 1 &&
        elements.length > 2
      ) {
        console.log(idx);
        handleData({ type: "remove", position: idx });
      }
    });
    console.log(elements.slice(-1)[0].value);
    if (elements.slice(-1)[0].value != "") {
      handleData({ type: "add", data: "메모를 추가하세요!" });
    }
  };
  const getValue = (element) => {
    console.log(this);
  };

  const [data, handleData] = useReducer(reduceData, [
    { placeholder: "메모를 추가하세요!", id: 0 },
  ]);

  useEffect(() => {
    adjustTextareaHeight();
    // document.getElementsByTagName("textarea")[0].value = <span>fff</span>;
  }, []);

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
              <div
                key={e.id}
                className={cx("frame-textarea") + " div-textarea"}
              >
                <textarea
                  key={e.id}
                  className={cx("content")}
                  placeholder={e.placeholder}
                  spellCheck={false}
                  onKeyUp={adjustTextareaHeight}
                ></textarea>
              </div>
            );
          })}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default MemoPage;
