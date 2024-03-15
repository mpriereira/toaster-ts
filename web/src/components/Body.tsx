import { SectionContainer } from '@/components/SectionContainer';
import { Position, positions } from '@/components/Toaster';
import { Button } from '@/components/Button';
import { toast } from '../../../dist';
import { useIsMount } from '@/hooks/useIsMount';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { CodeBlock } from '@/components/CodeBlock';

type BodyProps = {
  position: Position
  setPosition:  Dispatch<SetStateAction<Position>>
}

export const Body = ({ position: currentPosition, setPosition }: BodyProps) => {

  const isMount = useIsMount()

  useEffect(() => {
    if (isMount) {
      showToast()
    }
  }, [currentPosition])

  const showToast = () => {
    toast('toaster-ts', {
      description: 'A universal library for toast notifications'
    })
  }

  const handleClick = (position: Position) => {
    if (position !== currentPosition) {
      setPosition(position)
      return
    }
    showToast()
  }

  return (
    <>
      <SectionContainer classNames="py-4 flex flex-col gap-2.5">
        <h2 className="text-xl font-semibold">Installation</h2>
        <CodeBlock>
          npm install ts-toaster
        </CodeBlock>
      </SectionContainer>

      <SectionContainer classNames="py-4 flex flex-col gap-2.5">
        <h2 className="text-xl font-semibold">Usage</h2>
        <CodeBlock>
          {`
          import { toast } from 'toaster-ts';
          `}
          <br /><br />
          {`
          toast('My first toast');
          `}
        </CodeBlock>
      </SectionContainer>

      <SectionContainer classNames="py-4 flex flex-col gap-y-6">
        <h2 className="text-xl font-semibold">Customize position</h2>
        <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-flow-col-dense gap-2.5 justify-between flex-wrap">
          {positions.map(position =>
            <Button key={position} classNames="text-sm" onClick={() => handleClick(position)}>
              {position}
            </Button>
          )}
        </div>
        <CodeBlock>
          {`<section id="toaster-wrapper" data-position="${currentPosition}" />`}
        </CodeBlock>
      </SectionContainer>
    </>
  )
}
