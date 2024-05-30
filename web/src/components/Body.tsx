import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { SectionContainer } from '@/components/SectionContainer';
import { positions, extendedTypes, Position, Type, ExtendedType } from '@/components/Toaster';
import { Button } from '@/components/Button';
import { CodeBlock } from '@/components/CodeBlock';
import { Toggle } from '@/components/Toggle';
import { useIsMount } from '@/hooks/useIsMount';
import { toast } from 'toaster-ts';

type BodyProps = {
  position: Position
  setPosition: Dispatch<SetStateAction<Position>>
  richColors: boolean
  setRichColors: Dispatch<SetStateAction<boolean>>
}

export const Body = ({ position: currentPosition, setPosition, richColors, setRichColors }: BodyProps) => {

  const isMount = useIsMount()
  const [currentType, setCurrentType] = useState<ExtendedType>('default')

  useEffect(() => {
    if (isMount) {
      showToast({ type: currentType })
    }
  }, [currentPosition, richColors])

  const isStandardType = (type: ExtendedType): type is Type => {
    return type !== 'default' && type !== 'withDescription'
  }

  const showToast = ({ type, description }: { type: ExtendedType, description?: string }) => {
    toast(`${isStandardType(type) ? `${type} toast message` : 'Default toast message'}`, {
      description,
      type: isStandardType(type) ? type : undefined
    })
  }

  const changeType = ({ type, description }: { type: ExtendedType, description?: string }) => {
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

  const activateRichColors = (event: ChangeEvent<HTMLInputElement>) => {
    setRichColors(event.target.checked)
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
          {extendedTypes.map(type =>
            <Button
              key={type}
              classNames={type === currentType ? 'bg-gray-50 border-gray-400' : ''}
              onClick={() => changeType({ type, description: type === 'withDescription' ? 'Includes a description' : undefined })}>
              {type}
            </Button>
          )}
        </div>
        <CodeBlock>
          {`toast${isStandardType(currentType) ?`.${currentType}` : `${currentType === 'withDescription' ? `.message` : ''}`}(${isStandardType(currentType) ? `'${currentType} toast message'` : `${currentType === 'withDescription' ? `'Generic toast message', { description: 'Includes a description' }` : `'Generic toast message'`}`})`}
        </CodeBlock>
      </SectionContainer>

      <SectionContainer classNames="py-4 flex flex-col gap-y-6">
        <h2 className="text-xl font-semibold">Customize position</h2>
        <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-6 gap-2.5 justify-between">
          {positions.map(position =>
            <Button
              key={position}
              classNames={position === currentPosition ? 'bg-gray-50 border-gray-400' : ''}
              onClick={() => changePosition(position)}>
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
        <Toggle
          label={'Rich colors'}
          labelClassNames={'text-xl font-semibold'}
          onChange={activateRichColors} />
        <CodeBlock>
          {`<section id="toaster-wrapper" ${richColors ? 'data-rich-colors' : ''} />`}
        </CodeBlock>
      </SectionContainer>
    </>
  )
}
