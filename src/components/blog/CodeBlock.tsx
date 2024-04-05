import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";

import "../../styles/codeblock.scss";
import classnames from "../../helpers/classnames";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";

type CodeBlockProps = {
  children: {
    props: {
      className: string;
      children: string;
    };
  };
};

export function CodeBlock(props: CodeBlockProps) {
  const { copied, copyToClipboard } = useCopyToClipboard();
  const className = props.children.props.className || "";
  const code = props.children.props.children.trim();
  const language = className.replace(/language-/, "");

  return (
    <div className="code-block">
      <button
        className={classnames("copy-button", copied && "copied")}
        onClick={() => copyToClipboard(code, 1000)}
      >
        <p>{copied ? "Copied" : " Copy "}</p>
      </button>
      <SyntaxHighlighter
        language={language}
        style={nightOwl}
        showLineNumbers={true}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
