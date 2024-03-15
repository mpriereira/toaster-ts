import { ReactNode } from 'react';

type SectionContainerProps = {
  children: ReactNode
  classNames: string
}

export const SectionContainer = ({ children, classNames }: SectionContainerProps) => {
  return (
    <section className={`mx-auto w-full lg:w-[740px] ${classNames}`}>
      {children}
    </section>
  )
}
