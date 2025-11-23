'use client';

import { Switch } from '@/components/animation';
import { Button } from '@/components/ui/button';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { type ReactNode, useRef, useState } from 'react';

export function CodeBlock({
  children,
  ...props
}: {
  children?: ReactNode;
  [key: string]: unknown;
}) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    if (!preRef.current) return;

    const codeElement = preRef.current.querySelector('code');
    const textToCopy =
      codeElement?.textContent || preRef.current.textContent || '';

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <pre
      ref={preRef}
      className="bg-card relative overflow-x-auto rounded-xl border p-3 text-sm [&>code]:block [&>code]:overflow-x-auto"
      {...props}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2"
        onClick={handleCopy}
      >
        <Switch
          a={<CheckIcon className="size-3.5" />}
          b={<CopyIcon className="size-3.5" />}
          condition={copied}
        />
      </Button>
      {children}
    </pre>
  );
}
