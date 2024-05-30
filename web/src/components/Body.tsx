import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { SectionContainer } from '@/components/SectionContainer';
import { positions, types, Position, Type } from '@/components/Toaster';
import { Button } from '@/components/Button';
import { CodeBlock } from '@/components/CodeBlock';
import { useIsMount } from '@/hooks/useIsMount';
import { toast } from '../../../dist';
import { ToastOptions } from '../../../dist/toaster';

type BodyProps = {
  position: Position
  setPosition: Dispatch<SetStateAction<Position>>
  richColors: boolean
  setRichColors: Dispatch<SetStateAction<boolean>>
}

export const Body = ({ position: currentPosition, setPosition, richColors, setRichColors }: BodyProps) => {

  const isMount = useIsMount()
  const [currentType, setCurrentType] = useState<Type | undefined>(undefined)
  const [withDescription, setWithDescription] = useState<boolean>(false)

  useEffect(() => {
    if (isMount) {
      showToast({ type: currentType })
    }
  }, [currentPosition, richColors])

  const showToast = ({ type, description }: ToastOptions) => {
    toast(`${type ? `${type} toast message` : 'Generic toast message'}`, {
      description,
      type
    })
  }

  const changeType = (type?: Type, description?: string) => {
    setRichColors(false)
    setWithDescription(!!description)
    setCurrentType(type)
    showToast({ type, description })
  }

  const changePosition = (position: Position) => {
    if (position !== currentPosition) {
      setPosition(position)
      return
    }
    showToast({ type: currentType })
  }

  const activateRichColors = (type?: Type) => {
    setCurrentType(type)
    if (!richColors) {
      setRichColors(true)
    } else {
      showToast({ type })
    }
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
          <pre>
{`import { toast } from 'toaster-ts';

<!DOCTYPE html>
<html lang="en">
  <body>
    <section
        id="toaster-wrapper"
        data-position="bottom-left" />
  </body>
</html>`}
          </pre>
        </CodeBlock>
      </SectionContainer>

      <SectionContainer classNames="py-4 flex flex-col gap-2.5">
        <h2 className="text-xl font-semibold">Types</h2>
        <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-6 gap-2.5 justify-between">
          <Button key="default" classNames="text-sm" onClick={() => changeType(undefined)}>
            default
          </Button>
          <Button key="description" classNames="text-sm" onClick={() => changeType(undefined, 'Includes a description')}>
            description
          </Button>
          {types.map(type =>
            <Button key={type} classNames="text-sm" onClick={() => changeType(type)}>
              {type}
            </Button>
          )}
        </div>
        <CodeBlock>
          {`toast${currentType ? `.${currentType}` : `${withDescription ? `.message` : ''}`}(${currentType ? `'${currentType} toast message'` : `${withDescription ? `'Generic toast message', { description: 'Includes a description' }` : `'Generic toast message'`}`})`}
        </CodeBlock>
      </SectionContainer>

      <SectionContainer classNames="py-4 flex flex-col gap-y-6">
        <h2 className="text-xl font-semibold">Customize position</h2>
        <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-flow-col-dense gap-2.5 justify-between">
          {positions.map(position =>
            <Button key={position} classNames="text-sm" onClick={() => changePosition(position)}>
              {position}
            </Button>
          )}
        </div>
        <CodeBlock>
          <pre>
{`<section
    id="toaster-wrapper"
    data-position="${currentPosition}" />`}
          </pre>
        </CodeBlock>
      </SectionContainer>

      <SectionContainer classNames="py-4 flex flex-col gap-y-6">
        <h2 className="text-xl font-semibold">Other</h2>
        <div className="grid grid-cols-2 sm:grid-flow-col-dense gap-2.5 justify-between">
          {types.map(type =>
            <Button key={type} classNames="text-sm" onClick={() => activateRichColors(type)}>
              rich colors {type}
            </Button>
          )}
        </div>
        <CodeBlock>
          <pre>
{`toast${currentType ? `.${currentType}` : '.success'}('${currentType ? currentType : 'success'} toast message')

<section
    id="toaster-wrapper"
    data-rich-colors />`}
          </pre>
        </CodeBlock>
      </SectionContainer>
    </>
  )
}
