"use client";

import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  return (
    <div className={`prose-sanctum ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h1: ({ children }) => (
            <h1 className="mb-4 mt-6 font-serif text-xl text-text-primary">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="mb-3 mt-5 font-serif text-lg text-text-primary">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-2 mt-4 font-serif text-base font-medium text-text-primary">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="mb-3 font-serif text-sm leading-relaxed text-text-secondary">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="mb-3 ml-4 list-disc space-y-1 font-serif text-sm text-text-secondary">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-3 ml-4 list-decimal space-y-1 font-serif text-sm text-text-secondary">{children}</ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          strong: ({ children }) => (
            <strong className="font-medium text-text-primary">{children}</strong>
          ),
          em: ({ children }) => <em className="italic text-text-secondary">{children}</em>,
          blockquote: ({ children }) => (
            <blockquote className="my-3 border-l-2 border-accent pl-4 italic text-text-tertiary">
              {children}
            </blockquote>
          ),
          code: ({ children, className: codeClassName }) => {
            const isBlock = codeClassName?.includes("language-");
            if (isBlock) {
              return (
                <pre className="my-3 overflow-x-auto rounded-md border border-border bg-surface p-4">
                  <code className="font-mono text-xs text-text-secondary">{children}</code>
                </pre>
              );
            }
            return (
              <code className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-xs text-accent">
                {children}
              </code>
            );
          },
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline decoration-accent/30 transition-colors hover:decoration-accent"
            >
              {children}
            </a>
          ),
          hr: () => <hr className="my-6 border-border" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
