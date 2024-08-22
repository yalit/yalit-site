import { useState } from "react";

export function useCopyToClipboard() {
    const [copied, setCopied] = useState(false);

    /**
     * Copy a string to the clipboard
     * Sets the `copied` state to true when the copy is successful
     * Clears the `copied` state after the timeout unless a timeout of 0 is specified
     */
    const copyToClipboard = (code: string, timeout: number = 2000) => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        if (timeout === 0) return;
        setTimeout(() => {
            setCopied(false);
        }, timeout);
    };

    return { copied, copyToClipboard };
}

