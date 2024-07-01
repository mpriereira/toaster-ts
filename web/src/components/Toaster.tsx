export const positions = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'] as const

export type Position = (typeof positions)[number]

type ToasterProps = {
  position: Position
  richColors?: boolean
}

export const Toaster = ({ position, richColors }: ToasterProps) => {
  return <section id="toaster-wrapper" data-position={position} data-rich-colors={richColors} />
}
