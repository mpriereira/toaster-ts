import { SectionContainer } from '@/components/SectionContainer';
import { Pill } from '@/components/Pill';
import Image from 'next/image';
import GitHubIcon from '../../public/github.svg';
import NpmIcon from '../../public/npm.svg';
import BellIcon from '../../public/bell.svg'
import { Button } from '@/components/Button';
import { toast } from '../../../dist';

export const Header = () => {

  const showToast = () => {
    toast('toaster-ts', {
      description: 'A universal library for toast notifications'
    })
  }

  return (
    <>
      <SectionContainer classNames="pt-20 flex flex-col items-center gap-2.5">
        <h1 className="text-4xl font-bold">toaster-ts</h1>
        <p className="text-xl font-normal">A library to render notifications no matter your framework</p>
      </SectionContainer>
      <SectionContainer classNames="pt-6 pb-12 grid grid-flow-col-dense justify-center gap-3">
        <Pill href="https://github.com/mpriereira/toaster-ts">
          <Image src={GitHubIcon} alt="GitHub icon" className="size-6" />
          GitHub
        </Pill>
        <Pill href="https://www.npmjs.com/package/toaster-ts">
          <Image src={NpmIcon} alt="npm icon" className="size-6" />
          npm
        </Pill>
        <Button classNames="flex justify-center gap-x-1.5 font-sm row-start-2 col-start-1 col-end-3" onClick={() => showToast()}>
          <Image src={BellIcon} alt="npm icon" className="size-5" />
          Try it!
        </Button>
      </SectionContainer>
    </>
  )
}
