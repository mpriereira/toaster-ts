import { ReactNode } from 'react';
import { Code } from '@nextui-org/code';

type CodeBlockProps = {
  children: ReactNode
}

export const CodeBlock = ({ children }: CodeBlockProps) => {
  return (
    <Code className="px-5 py-3 bg-gray-200/50 overflow-x-auto text-xs sm:text-sm" size="sm">
      {children}
    </Code>
  )
}
