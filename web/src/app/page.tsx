"use client"
import { createToast } from '../../../dist';

export default function Home() {
  const handleClick = () => createToast('Toast example')

  return (
    <main className="min-h-screen">
      <button onClick={handleClick}>Toast</button>
      <div id="toaster-wrapper"></div>
    </main>
  );
}
