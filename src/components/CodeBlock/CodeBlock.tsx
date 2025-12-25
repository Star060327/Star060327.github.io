import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import hljs from 'highlight.js';
import '@/styles/highlight-theme.scss'; // Use custom theme with CSS variables
import styles from './index.module.scss';
interface CodeBlockProps {
  children?: React.ReactNode;
  className?: string;
  meta?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className, meta }) => {
  const [copied, setCopied] = useState(false);
  // Normalize language to lowercase to ensure 'JS', 'JavaScript' etc. are treated consistently
  const rawLanguage = className ? className.replace(/language-/, '') : 'text';
  const language = rawLanguage.toLowerCase();

  // Extract text content from children
  let code = '';

  if (typeof children === 'string') {
    code = children;
  } else if (
    React.isValidElement(children) &&
    children.props &&
    typeof children.props === 'object' &&
    'children' in children.props
  ) {
    code = String((children.props as { children: React.ReactNode }).children);
  } else if (Array.isArray(children)) {
    code = children
      .map((child) =>
        typeof child === 'string'
          ? child
          : React.isValidElement(child) &&
              child.props &&
              typeof child.props === 'object' &&
              'children' in child.props
            ? String((child.props as { children: React.ReactNode }).children)
            : ''
      )
      .join('');
  }

  // Remove trailing newline
  code = code.replace(/\n$/, '');

  // Parse meta for highlighted lines
  const highlightedLines = new Set<number>();
  if (meta) {
    // Format: {1-3,5}
    const match = meta.match(/{([\d,-]+)}/);
    if (match) {
      const ranges = match[1].split(',');
      ranges.forEach((range) => {
        if (range.includes('-')) {
          const [start, end] = range.split('-').map(Number);
          for (let i = start; i <= end; i++) highlightedLines.add(i);
        } else {
          highlightedLines.add(Number(range));
        }
      });
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  // Use highlight.js to highlight code
  let highlightedCode = '';
  try {
    if (language && hljs.getLanguage(language)) {
      highlightedCode = hljs.highlight(code, { language }).value;
    } else {
      highlightedCode = hljs.highlightAuto(code).value;
    }
  } catch (error) {
    console.error('Highlight error:', error);
    highlightedCode = code; // Fallback to plain text
  }

  return (
    <div className={styles.codeBlock}>
      {/* Header - Separate color from code area */}
      <div className={styles.header}>
        <span className={styles.language}>
          {language === 'javascript' ? 'JavaScript' : language}
        </span>
        <button
          onClick={handleCopy}
          title={copied ? '已复制' : '复制代码'}
          className={`${styles.copyButton} ${copied ? styles.copied : ''}`}
        >
          {copied ? (
            <>
              <Check />
              <span>已复制</span>
            </>
          ) : (
            <>
              <Copy />
              <span>复制</span>
            </>
          )}
        </button>
      </div>

      {/* Code content with Line Highlighting */}
      <div className={styles.content}>
        <pre>
          <code
            className={`language-${language}`}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>
        {/* Line Highlighting Overlay */}
        <div className={styles.highlightOverlay} aria-hidden="true">
          {code.split('\n').map((_, index) => (
            <div
              key={index}
              className={`${styles.line} ${highlightedLines.has(index + 1) ? styles.highlighted : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;
