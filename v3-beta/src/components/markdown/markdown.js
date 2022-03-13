import React from "react";
import TeX from "@matejmazur/react-katex";
import { MDXProvider } from "@mdx-js/react";
import Highlight, { defaultProps } from "prism-react-renderer";
import { responsiveTable, language as langStyle } from "./markdown.module.scss";
import TabbedImages from "components/tabbed-images/tabbed-images";
import "katex/dist/katex.min.css";

const components = {
  div: (props) => {
    if (props.className !== undefined) {
      if (props.className.includes("math-display")) return <TeX block math={props.children} />;
      if (props.className.includes("tabbed"))
        return <TabbedImages>{props.children.filter((e) => typeof e !== "string")}</TabbedImages>;
    }
    return <div {...props} />;
  },
  span: (props) => {
    if (props.className.includes("math-inline")) {
      return <TeX math={props.children} />;
    }
    return <span {...props} />;
  },
  th: (props) => <th {...props} align="center"></th>,
  table: (props) => (
    <div className={responsiveTable}>
      <table {...props}>{props.children}</table>
    </div>
  ),
  inlineCode: (props) => <code {...props} className="language-text"></code>,
  code: ({ children, className }) => {
    const language = className !== undefined ? className.replace(/language-/, "") : "text";

    return (
      <Highlight {...defaultProps} code={children} language={language} theme={undefined}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => {
          if (tokens.slice(-1)[0][0].content === "\n") {
            tokens.pop();
          }

          return (
            <pre className={className} style={{ ...style }}>
              {language !== "text" ? (
                <div className={langStyle}>
                  <span key="lang">$ {language}</span>
                </div>
              ) : null}
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          );
        }}
      </Highlight>
    );
  },
};

const MdXLayout = ({ children }) => {
  return <MDXProvider components={components}>{children}</MDXProvider>;
};

export default MdXLayout;
