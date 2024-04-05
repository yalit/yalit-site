import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";

type CodeBlockProps = {
  children: {
    props: {
      className: string;
      children: string;
    };
  };
};

export function CodeBlock(props: CodeBlockProps) {
  const className = props.children.props.className || "";
  const code = props.children.props.children.trim();
  const language = className.replace(/language-/, "");

  return (
    <SyntaxHighlighter
      language={language}
      style={nightOwl}
      showLineNumbers={true}
    >
      {code}
    </SyntaxHighlighter>
  );
}
