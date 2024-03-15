import { MouseEventHandler, ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode
  classNames?: string
  onClick: MouseEventHandler<HTMLButtonElement>
}

export const Button = ({ classNames, children, onClick }: ButtonProps) => {
  return (
    <button
      className={`
        bg-white hover:bg-gray-100 border border-gray-300 py-2 px-3 rounded-full ${classNames}
      `}
      onClick={onClick}>
      {children}
    </button>
  )
}
