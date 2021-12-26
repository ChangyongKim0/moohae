import React, { useEffect, useReducer, useState } from "react";
import classNames from "classnames/bind";
import "../util/reset.css";
import styles from "./MemoPage.module.scss";
import Buttons from "../atoms/Buttons";
import { db } from "../index";
import "firebase/firestore";

const cx = classNames.bind(styles);

const title = ["메모."];

const reduceData = (state, action) => {
  let new_state = [...state];
  switch (action.type) {
    case "insert":
      new_state.splice(action.idx, 0, {
        placeholder: action.data,
        id: action.id || String(Date.now()),
      });
      return new_state;
    case "add":
      return [
        ...new_state,
        {
          placeholder: action.data,
          id: action.id || String(Date.now()),
          value: action.value,
        },
      ];
    case "remove":
      return new_state.filter((e, idx) => idx !== action.position);
    case "remove end":
      return new_state.slice(0, -1);
    default:
      return state;
  }
};

const MemoPage = () => {
  const [focus_id, setFocusId] = useState(0);

  const onKeyUpTextArea = (id) => {
    arrageMemoList();
    adjustTextareaHeight();
    updateDataToDB(id);
    highlightArea(id);
    if (document.getElementById(id).value === "") {
      setDataIsEmpty(true);
    } else {
      setDataIsEmpty(false);
    }
  };

  const [data_is_empty, setDataIsEmpty] = useState(true);

  const onFocusTextArea = (id) => {
    setFocusId(id);
    adjustTextareaHeight();
    highlightArea(id);
    if (document.getElementById(id).value === "") {
      setDataIsEmpty(true);
    } else {
      setDataIsEmpty(false);
    }
  };

  const adjustTextareaHeight = () => {
    let elements = Array.from(document.getElementsByTagName("textarea"));
    let div_elements = Array.from(
      document.getElementsByClassName("div-textarea")
    );
    // console.log(div_elements);
    // let length = elements.length;
    elements.forEach((element, idx) => {
      element.style.height = "5px";
      // element.scrollTop = 0;

      div_elements[idx].style.height = element.scrollHeight + "px";
      element.style.height = element.scrollHeight + 10 + "px";
      // console.log(element.scrollHeight);
    });
  };

  const arrageMemoList = () => {
    let elements = Array.from(document.getElementsByTagName("textarea"));
    // console.log(div_elements);
    // let length = elements.length;
    elements.forEach((element, idx) => {
      if (element.value === "" && idx < elements.length - 1) {
        // console.log(idx);
        handleData({
          type: "remove",
          position: idx === elements.length - 2 ? idx + 1 : idx,
        });
      }
    });
    if (elements.slice(-1)[0].value !== "") {
      handleData({ type: "add", data: "메모를 추가해요." });
    }
  };

  const updateDataToDB = (id) => {
    const text =
      Array.from(document.getElementsByTagName("textarea")).filter(
        (e) => e.id === id
      )[0]?.value || "";
    console.log(id);
    console.log(text);
    if (text.length === 0) {
      db.collection("memo")
        .doc("content-" + id)
        .delete();
    } else {
      db.collection("memo")
        .doc("content-" + id)
        .get()
        .then((doc) => {
          if (!doc.exists) {
            console.log(id);
            db.collection("memo")
              .doc("content-" + id)
              .set({
                time_modified: Date.now(),
                time_create: Date.now(),
                content: text,
              });
          } else {
            console.log(id);
            db.collection("memo")
              .doc("content-" + id)
              .update({ time_modified: Date.now(), content: text });
          }
        });
    }
  };

  // const getValue = (element) => {
  //   console.log(this);
  // };

  const highlightArea = (id) => {
    setTimeout(
      () =>
        Array.from(document.getElementsByClassName("div-textarea")).forEach(
          (e, idx) => {
            if (data[idx]?.id === id) {
              // console.log(e.offsetTop);
              document.getElementsByClassName("info-bar-emph")[0].style.top =
                e.offsetTop + "px";
              document.getElementsByClassName("info-bar-emph")[0].style.height =
                e.style.height;
              document.getElementsByClassName("action-area-emph")[0].style.top =
                e.offsetTop + "px";
              document.getElementsByClassName(
                "action-area-emph"
              )[0].style.height = e.style.height;
            }
          }
        ),
      0
    );
  };

  const [data, handleData] = useReducer(reduceData, [
    { placeholder: "첫 메모를 써봐요.", id: String(Date.now()) },
  ]);

  const [data_loaded, setDataLoaded] = useState(false);

  useEffect(() => {
    db.collection("memo")
      .get()
      .then((req) => {
        req.forEach((doc) => {
          if (doc.id.includes("content-")) {
            console.log(doc.id);
            handleData({
              type: "add",
              data: "  ",
              id: doc.id.split("-")[1],
            });
          }
        });
        setDataLoaded(true);
      });
    adjustTextareaHeight(0);
    highlightArea(0);

    // document.getElementsByTagName("textarea")[0].value = <span>fff</span>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener(
      "resize",
      function () {
        adjustTextareaHeight();
        console.log(focus_id);
        highlightArea(focus_id);
      },
      true
    );
  }, [focus_id]);

  useEffect(() => {
    if (data_loaded) {
      const elements = Array.from(document.getElementsByTagName("textarea"));
      Promise.all(
        elements.map((e) => {
          return db
            .collection("memo")
            .doc("content-" + e.id)
            .get();
        })
      ).then((docs) => {
        docs.forEach((doc, idx) => {
          if (doc.exists) {
            elements[idx].value = doc.data().content;
          }
        });
        arrageMemoList();
        adjustTextareaHeight();

        highlightArea(elements.slice(-1)[0].id);
      });
      setDataLoaded(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data_loaded]);

  const insertTextareaBelow = (idx) => {
    handleData({
      type: "insert",
      idx: idx + 1,
      data: "메모를 적어요.",
    });
    setTimeout(
      () =>
        Array.from(document.getElementsByTagName("textarea"))[idx + 1].focus(),
      100
    );
  };

  const insertInnerText = (idx) => {};

  const insertOuterText = (idx) => {};

  const goInsideText = (idx) => {};

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
          <Buttons
            texts={[
              "# 만든 시간 : 2021.12.24 16:45:55",
              "# 수정한 시간 : 2021.12.24 16:45:55",
            ]}
            onClicks={[() => {}, () => {}]}
          />
          <Buttons
            texts={[
              "# ./건축/논문",
              "# 과학/용어/유니코드나 한글을 입력 하시면 자동으로 상호 변환됩니다. 유니코",
              "태그 수정하기.",
            ]}
            onClicks={[() => {}, () => {}]}
          />
        </div>
        <div className={cx("frame-content")}>
          {data.map((e, idx) => {
            return (
              <div key={e.id} className={cx("frame-textbox")}>
                <div
                  id={"div-textarea-" + e.id}
                  className={cx("frame-textarea") + " div-textarea"}
                >
                  <textarea
                    key={e.id}
                    id={e.id}
                    className={cx("content")}
                    placeholder={e.placeholder}
                    spellCheck={false}
                    onKeyUp={() => onKeyUpTextArea(e.id)}
                    onFocus={() => onFocusTextArea(e.id)}
                  ></textarea>
                </div>
                {focus_id === e.id && !data_is_empty ? (
                  <div className={cx("button")}>
                    <Buttons
                      texts={[
                        "하위 메모.",
                        "아래에 추가.",
                        "상위 메모.",
                        "메모 안으로.",
                      ]}
                      onClicks={[() => {}, () => insertTextareaBelow(idx)]}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className={cx("frame-right")}>
        <div className={cx("action-area-emph") + " action-area-emph"}></div>
      </div>
    </div>
  );
};

export default MemoPage;
