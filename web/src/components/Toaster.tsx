export const positions = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'] as const
export const types = ['success', 'error', 'warning', 'info', 'loading'] as const
export const extendedTypes = ['default', 'withDescription', ...types] as const

export type Position = (typeof positions)[number]
export type Type = (typeof types)[number]
export type ExtendedType = (typeof extendedTypes)[number]

type ToasterProps = {
  position: Position
  richColors?: boolean
}

export const Toaster = ({ position, richColors }: ToasterProps) => {
  return <section id="toaster-wrapper" data-position={position} data-rich-colors={richColors} />
}
