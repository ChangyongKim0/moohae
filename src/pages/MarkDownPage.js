import React, { useEffect, useReducer, useState } from "react";
import classNames from "classnames/bind";
import "../util/reset.css";
import styles from "./MarkDownPage.module.scss";
import Buttons from "../atoms/Buttons";
import { Link } from "react-router-dom";
import LatexEq from "../components/LatexEq";
import MarkDown from "../components/MarkDown";

const cx = classNames.bind(styles);

const title = ["마크다운."];

const reduceFontSize = (state, action) => {
  switch (action.type) {
    case "increase":
      return state * 1.1;
    case "decrease":
      return state / 1.1;
    default:
      return state;
  }
};

const MarkDownPage = () => {
  const [latex_code, setLatexCode] = useState("");

  const [font_size, handleFontSize] = useReducer(reduceFontSize, 16);

  useEffect(() => {
    document.getElementsByClassName("math-content")[0].style["font-size"] =
      font_size + "px";
    setTimeout(adjustTextareaHeight, 0);
  }, [font_size]);

  const updateEquation = () => {
    if (document.getElementsByClassName("content")[0].innerText === "\n") {
      document.getElementsByClassName("content")[0].innerText = "";
    }
    setLatexCode(
      document
        .getElementsByClassName("content")[0]
        .innerHTML.replaceAll("\n", "\\enter")
        .replace(/<b>/g, "\\emph-start")
        .replace(/<\/b>/g, "\\emph-end")
        .replace(/<b class="emph">/g, "\\emph-start")
        .replace(/<div><br><\/div>/g, "\\enter")
        .replace(/<div>/g, "\\enter")
        .replace(/<br>/g, "\\enter")
        .replace(/<(.*?\n*?)*?>/g, "")
        .replace(/\\enter/g, "\n")
        .replaceAll("\\emph-start", '<b class="emph">')
        .replaceAll("\\emph-end", "</b>")
    );
    setTimeout(adjustTextareaHeight, 0);
    setTimeout(adjustTextareaHeight, 500);
  };
  const adjustTextareaHeight = () => {
    let text_element = Array.from(
      document.getElementsByClassName("content")
    )[0];
    let math_element = Array.from(
      document.getElementsByClassName("math-content")
    )[0];

    text_element.style.height = "5px";
    math_element.style.height = "5px";
    // element.scrollTop = 0;;
    text_element.style.height = text_element.scrollHeight + "px";
    math_element.style.height = math_element.scrollHeight + "px";
    // console.log(element.scrollHeight);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("frame-left")}>
        <div className={cx("info-bar-emph") + " info-bar-emph"}></div>
      </div>
      <div className={cx("frame-main")}>
        {title.map((e, idx) => {
          return (
            <div key={idx} className={cx("title")}>
              {e}
            </div>
          );
        })}
        <div className={cx("frame-main-button")}>
          <Buttons texts={["뒤로 가기."]} onClicks={[() => {}, () => {}]} />
        </div>
        <div className={cx("frame-content")}>
          <div className={cx("frame-textbox")}>
            <div
              id={"div-textarea"}
              className={cx("frame-textarea") + " div-textarea"}
            >
              <div
                contentEditable
                className={cx("content") + " content"}
                placeholder="수식을 입력하세요."
                spellCheck={false}
                onKeyUp={updateEquation}
              ></div>
            </div>

            <div className={cx("button")}>
              <Buttons
                texts={["Bold", "Italic", "수식 크기 설정."]}
                onClicks={[
                  () => {
                    handleFontSize({ type: "increase" });
                  },
                  () => {
                    handleFontSize({ type: "decrease" });
                  },
                  () => {},
                ]}
              />
            </div>
          </div>
          <div
            className={cx("math-content") + " math-content"}
            spellCheck={false}
            onKeyUp={updateEquation}
          >
            <MarkDown>{latex_code}</MarkDown>
          </div>
        </div>
      </div>
      <div className={cx("frame-right")}>
        <div className={cx("action-area-emph") + " action-area-emph"}></div>
      </div>
    </div>
  );
};

export default MarkDownPage;
