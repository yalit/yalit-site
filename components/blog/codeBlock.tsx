import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import classnames from "@/lib/classnames";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

export type CodeBlockProps = {
    children: {
        props: {
            className: string;
            children: string;
        };
    };
};

export default function CodeBlock(props: CodeBlockProps) {
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
                showLineNumbers={true}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
}

