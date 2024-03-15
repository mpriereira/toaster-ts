export const positions = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'] as const

export type Position = (typeof positions)[number]

type ToasterProps = {
  position: Position
}

export const Toaster = ({ position }: ToasterProps) => {
  return <section id="toaster-wrapper" data-position={position} />
}
