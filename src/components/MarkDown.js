import React, { useEffect } from "react";
// import "./styles.css";
import ReactMarkdown from "react-markdown";
import MathJax from "react-mathjax";
import RemarkMathPlugin from "remark-math";
//var Latex = require("react-latex");

const MarkDown = (props) => {
  //   console.log(props);
  const newProps = {
    ...props,
    plugins: [RemarkMathPlugin],
    components: {
      ...props.renderers,

      span: ({ node, ...props }) => {
        console.log(props);
        return <MathJax.Node inline formula={props.children[0]} />;
      },
      inlineMath: ({ node, ...props }) => {
        console.log(props);
        return <MathJax.Node inline formula={props.value} />;
      },
    },
  };

  //   useEffect(() => {
  //     Array.from(document.getElementsByClassName("MathJax_Preview")).forEach(
  //       (e) => {
  //         e.style.display = "none";
  //       }
  //     );
  //   });
  return (
    <MathJax.Provider>
      <ReactMarkdown {...newProps} />
    </MathJax.Provider>
  );
};

export default MarkDown;
