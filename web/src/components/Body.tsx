import { SectionContainer } from '@/components/SectionContainer';
import { Code } from '@nextui-org/code';
import { Position, positions } from '@/components/Toaster';
import { Button } from '@/components/Button';
import { toast } from '../../../dist';
import { useIsMount } from '@/hooks/useIsMount';
import { Dispatch, SetStateAction, useEffect } from 'react';

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
        <Code className="mr-auto px-5 py-3 bg-gray-200/50" size="sm">npm install ts-toaster</Code>
      </SectionContainer>

      <SectionContainer classNames="py-4 flex flex-col gap-2.5">
        <h2 className="text-xl font-semibold">Usage</h2>
        <Code className="mr-auto px-5 py-3 bg-gray-200/50" size="sm">
          {`
          import { toast } from 'toaster-ts';
          `}
          <br /><br />
          {`
          toast('My first toast');
          `}
        </Code>
      </SectionContainer>

      <SectionContainer classNames="py-4 flex flex-col gap-y-6">
        <h2 className="text-xl font-semibold">Customize position</h2>
        <div className="flex gap-2.5 justify-between">
          {positions.map(position =>
            <Button key={position} classNames="text-sm" onClick={() => handleClick(position)}>
              {position}
            </Button>
          )}
        </div>
        <Code className="p-5 bg-gray-200/50" size="sm">
          {`<section id="toaster-wrapper" data-position="${currentPosition}" />`}
        </Code>
      </SectionContainer>
    </>
  )
}
