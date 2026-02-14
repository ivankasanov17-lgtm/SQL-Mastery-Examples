import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-sql";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language = "sql", className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("relative group rounded-xl overflow-hidden shadow-lg", className)}>
      <div className="absolute right-4 top-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={copyToClipboard}
          className="p-2 rounded-lg bg-background/10 hover:bg-background/20 backdrop-blur-md text-white transition-colors border border-white/10"
          title="Copy to clipboard"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="bg-[#1e1e1e] px-4 py-2 text-xs text-muted-foreground border-b border-white/5 flex items-center justify-between">
        <span className="uppercase font-mono font-semibold tracking-wider text-primary-foreground/50">{language}</span>
      </div>
      <pre className="!m-0 !rounded-none !bg-[#1e1e1e] p-4 overflow-x-auto text-sm">
        <code className={`language-${language}`}>{code.trim()}</code>
      </pre>
    </div>
  );
}
