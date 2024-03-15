import { MouseEventHandler } from 'react';

type ButtonProps = {
  label: string
  onClick: MouseEventHandler<HTMLButtonElement>
}

export const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button
      className="bg-white hover:bg-gray-100 border border-gray-300 py-2 px-3 rounded-md text-sm"
      onClick={onClick}>
      {label}
    </button>
  )
}
