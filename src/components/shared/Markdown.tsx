import type { Components } from 'react-markdown';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';

type CodeBlockProps = ComponentPropsWithoutRef<'code'> & {
  inline?: boolean;
  className?: string;
  children?: ReactNode;
};

const CodeBlock = ({ inline, className, children, ...props }: CodeBlockProps) => {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';

  if (inline) {
    return (
      <code
        className="px-1.5 py-0.5 rounded bg-white/10 text-xs font-mono text-blue-300"
        {...props}
      >
        {children}
      </code>
    );
  }

  return (
    <div className="my-4 rounded-lg overflow-hidden bg-gray-900/50 border border-white/10">
      {language && (
        <div className="px-4 py-2 bg-white/5 border-b border-white/10 text-xs font-mono text-white/60 uppercase">
          {language}
        </div>
      )}
      <div className="relative">
        <pre className="overflow-x-auto p-3 m-0">
          <code className="text-xs font-mono leading-snug" {...props}>
            {children}
          </code>
        </pre>
      </div>
    </div>
  );
};

const baseMarkdownComponents: Components = {
  p: props => <p className="mb-3 last:mb-0 leading-snug text-sm" {...props} />,

  h1: props => <h1 className="text-xl font-bold mt-4 mb-3 first:mt-0" {...props} />,

  h2: props => <h2 className="text-lg font-semibold mt-3 mb-2 first:mt-0" {...props} />,

  h3: props => <h3 className="text-base font-semibold mt-3 mb-2 first:mt-0" {...props} />,

  ul: props => <ul className="list-disc list-outside ml-5 mb-3 space-y-1.5 text-sm" {...props} />,

  ol: props => (
    <ol className="list-decimal list-outside ml-5 mb-3 space-y-1.5 text-sm" {...props} />
  ),

  li: props => <li className="leading-snug" {...props} />,

  code: CodeBlock,

  pre: ({ children }) => <>{children}</>,

  a: props => (
    <a
      className="text-accent underline hover:text-accent/80 transition-colors"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),

  blockquote: props => (
    <blockquote
      className="border-l-4 border-white/20 pl-4 py-1 my-4 italic text-white/80"
      {...props}
    />
  ),

  hr: () => <hr className="my-6 border-white/10" />,

  table: props => (
    <div className="overflow-x-auto mb-4">
      <table className="min-w-full border-collapse" {...props} />
    </div>
  ),

  th: props => (
    <th
      className="border border-white/20 px-4 py-2 bg-white/5 font-semibold text-left"
      {...props}
    />
  ),

  td: props => <td className="border border-white/20 px-4 py-2" {...props} />,

  strong: props => <strong className="font-semibold" {...props} />,

  em: props => <em className="italic" {...props} />,
};

export type MarkdownProps = React.ComponentProps<typeof ReactMarkdown>;

export const Markdown = ({ components, remarkPlugins, ...props }: MarkdownProps) => {
  const providedPlugins = remarkPlugins
    ? Array.isArray(remarkPlugins)
      ? remarkPlugins
      : [remarkPlugins]
    : [];

  const mergedRemarkPlugins = [remarkGfm, ...providedPlugins];

  return (
    <ReactMarkdown
      {...props}
      remarkPlugins={mergedRemarkPlugins}
      components={{ ...baseMarkdownComponents, ...components }}
    />
  );
};

export const markdownComponents = baseMarkdownComponents;
