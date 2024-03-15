"use client"
import { toast } from '../../../dist';
import { useEffect, useState } from 'react';
import { useIsMount } from '@/hooks/useIsMount';
import { Button } from '@/components/Button';
import { SectionContainer } from '@/components/SectionContainer';
import { Position, positions, Toaster } from '@/components/Toaster';

export default function Home() {

  const isMount = useIsMount()
  const [currentPosition, setPosition] = useState<Position>('bottom-right')

  useEffect(() => {
    if (isMount) {
      showToast()
    }
  }, [currentPosition]);

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
    <main className="p-4">
      <SectionContainer classNames="py-3 flex flex-col items-center gap-2.5">
        <h1 className="text-3xl font-bold">toaster-ts</h1>
        <p className="text-base font-light">A library to render notifications no matter your framework</p>
      </SectionContainer>
      <SectionContainer classNames="py-4 flex justify-center gap-2.5">
        {positions.map(position =>
          <Button label={position} onClick={() => handleClick(position)} />
        )}
      </SectionContainer>
      <Toaster position={currentPosition} />
    </main>
  );
}
