import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { SectionContainer } from '@/components/SectionContainer';
import { positions, Position } from '@/components/Toaster';
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

const promiseCode = '`${data.name} has been added`'

const allTypes = [
  {
    name: 'Default',
    snippet: `toast('Event has been created')`,
    action: () => toast('Event has been created'),
  },
  {
    name: 'Description',
    snippet: `toast.message('Event has been created', {
  description: 'Monday, January 3rd at 6:00pm',
})`,
    action: () =>
      toast('Event has been created', {
        description: 'Monday, January 3rd at 6:00pm',
      }),
  },
  {
    name: 'Success',
    snippet: `toast.success('Event has been created')`,
    action: () => toast.success('Event has been created'),
  },
  {
    name: 'Info',
    snippet: `toast.info('Be at the area 10 minutes before the event time')`,
    action: () => toast.info('Be at the area 10 minutes before the event time'),
  },
  {
    name: 'Warning',
    snippet: `toast.warning('Event start time cannot be earlier than 8am')`,
    action: () => toast.warning('Event start time cannot be earlier than 8am'),
  },
  {
    name: 'Error',
    snippet: `toast.error('Event has not been created')`,
    action: () => toast.error('Event has not been created'),
  },
  {
    name: 'Promise',
    snippet: `const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Toast' }), 2000));

toast.promise(promise, {
  loading: 'Loading...',
  success: (data) => {
    return ${promiseCode};
  },
  error: 'Error',
});`,
    action: () =>
      toast.promise<{ name: string }>(
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({ name: 'Toast' });
          }, 2000);
        }),
        {
          loading: 'Loading...',
          success: (data) => {
            return `${data.name} has been added`;
          },
          error: 'Error',
        },
      ),
  }
]

export const Body = ({ position: currentPosition, setPosition, richColors, setRichColors }: BodyProps) => {

  const isMount = useIsMount()
  const [activeType, setActiveType] = useState(allTypes[0])

  useEffect(() => {
    if (isMount) {
      activeType.action()
    }
  }, [currentPosition, richColors])

  const changeType = (type: typeof allTypes[number]) => {
    setActiveType(type)
    type.action()
  }

  const changePosition = (position: Position) => {
    if (position !== currentPosition) {
      setPosition(position)
      return
    }
    activeType.action()
  }

  const activateRichColors = (event: ChangeEvent<HTMLInputElement>) => {
    setRichColors(event.target.checked)
  }

  return (
    <>
      <SectionContainer classNames="py-4 flex flex-col gap-2.5">
        <h2 className="text-xl font-semibold">Installation</h2>
        <CodeBlock>
          npm install toaster-ts
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
          {allTypes.map(type =>
            <Button
              key={type.name}
              classNames={type.name === activeType.name ? 'bg-gray-50 border-gray-400' : ''}
              onClick={() => changeType(type)}>
              {type.name}
            </Button>
          )}
        </div>
        <CodeBlock>
          {`${activeType.snippet}`}
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
          {`<section id="toaster-wrapper" ${richColors ? 'data-rich-colors="true"' : ''} />`}
        </CodeBlock>
      </SectionContainer>
    </>
  )
}
