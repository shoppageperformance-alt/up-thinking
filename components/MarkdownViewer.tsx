import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownViewerProps {
  content: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content }) => {
  return (
    <div className="prose prose-invert prose-blue max-w-none break-words">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          pre: ({ node, ...props }) => (
            <div className="bg-slate-900 rounded-lg overflow-hidden my-4 border border-slate-700 shadow-lg">
              <pre {...props} className="p-4 overflow-x-auto font-mono text-sm text-blue-100" />
            </div>
          ),
          code: ({ node, ...props }) => {
            // @ts-ignore
            const isInline = props.inline || !String(props.className).includes('language-');
            return isInline ? (
              <code {...props} className="bg-slate-800 text-blue-200 px-1.5 py-0.5 rounded text-sm font-mono" />
            ) : (
              <code {...props} />
            );
          },
          h1: ({ node, ...props }) => <h1 {...props} className="text-3xl font-bold text-white mb-6 border-b border-slate-700 pb-2 mt-8" />,
          h2: ({ node, ...props }) => <h2 {...props} className="text-2xl font-bold text-blue-400 mb-4 mt-8 flex items-center gap-2" />,
          h3: ({ node, ...props }) => <h3 {...props} className="text-xl font-semibold text-blue-200 mb-3 mt-6" />,
          p: ({ node, ...props }) => <p {...props} className="text-slate-300 leading-relaxed mb-4 text-base" />,
          ul: ({ node, ...props }) => <ul {...props} className="list-disc list-outside ml-6 space-y-2 mb-4 text-slate-300" />,
          ol: ({ node, ...props }) => <ol {...props} className="list-decimal list-outside ml-6 space-y-2 mb-4 text-slate-300" />,
          blockquote: ({ node, ...props }) => (
            <blockquote {...props} className="border-l-4 border-blue-500 pl-4 py-1 italic text-slate-400 bg-slate-800/30 rounded-r my-6" />
          ),
          a: ({ node, ...props }) => <a {...props} className="text-blue-400 hover:text-blue-300 underline underline-offset-4" target="_blank" rel="noopener noreferrer" />,
          table: ({ node, ...props }) => <div className="overflow-x-auto mb-6"><table {...props} className="min-w-full divide-y divide-slate-700" /></div>,
          th: ({ node, ...props }) => <th {...props} className="px-3 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider bg-slate-800" />,
          td: ({ node, ...props }) => <td {...props} className="px-3 py-3 whitespace-nowrap text-sm text-slate-400 border-t border-slate-700" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownViewer;
