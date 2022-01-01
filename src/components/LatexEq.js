import React, { useEffect } from "react";
// import "./styles.css";
import ReactMarkdown from "react-markdown";
import MathJax from "react-mathjax";
import RemarkMathPlugin from "remark-math";
//var Latex = require("react-latex");

const LatexEq = ({ children }) => {
  //   console.log(props);
  //   const newProps = {
  //     ...props,
  //     plugins: [RemarkMathPlugin],
  //     renderers: {
  //       ...props.renderers,
  //       math: ({ node, ...props }) => {
  //         console.log(props);
  //         return <MathJax.Node formula={props.value} />;
  //       },
  //       inlineMath: ({ node, ...props }) => (
  //         <MathJax.Node inline formula={props.value} />
  //       ),
  //     },
  //   };

  //   useEffect(() => {
  //     Array.from(document.getElementsByClassName("MathJax_Preview")).forEach(
  //       (e) => {
  //         e.style.display = "none";
  //       }
  //     );
  //   });
  return (
    <MathJax.Provider>
      <MathJax.Node formula={children} />
    </MathJax.Provider>
  );
};

export default LatexEq;
