"use client"
import { useState } from 'react';
import { Position, Toaster } from '@/components/Toaster';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Body } from '@/components/Body';

export default function Home() {

  const [position, setPosition] = useState<Position>('bottom-right')

  return (
    <>
      <main className="py-2 px-10">
        <Header/>
        <Body position={position} setPosition={setPosition}/>
      </main>
      <Footer/>
      <Toaster position={position}/>
    </>
  );
}
