import { ReactNode } from 'react';

type PillProps = {
  children: ReactNode
  classNames?: string
  href: string
}

export const Pill = ({ children, classNames, href }: PillProps) => {
  return (
    <a
      className={`
    bg-white
    hover:bg-gray-100
    border border-gray-300 rounded-full
    flex justify-center items-center gap-x-2
    py-1 px-3 md:py-2 md:px-4
    text-sm md:text-base
    transition
    hover:scale-105
    cursor-pointer 
    ${classNames}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}
