import Image from 'next/image';
import { SectionContainer } from '@/components/SectionContainer';
import { Pill } from '@/components/Pill';
import { Button } from '@/components/Button';
import { toast } from '../../../dist';
import GitHubIcon from '../../public/github.svg';
import NpmIcon from '../../public/npm.svg';
import BellIcon from '../../public/bell.svg'

export const Header = () => {

  const showSampleToast = () => {
    toast.message('toaster-ts', {
      description: 'A universal library for toast notifications'
    })
  }

  return (
    <>
      <SectionContainer classNames="pt-20 flex flex-col items-center gap-2.5">
        <h1 className="text-3xl sm:text-4xl font-bold">toaster-ts</h1>
        <p className="text-lg sm:text-xl font-normal">A library to render notifications no matter your framework</p>
      </SectionContainer>
      <SectionContainer classNames="pt-6 pb-3 grid grid-flow-col-dense justify-center gap-3">
        <Pill href="https://github.com/mpriereira/toaster-ts">
          <Image src={GitHubIcon} alt="GitHub icon" className="size-6" />
          GitHub
        </Pill>
        <Pill href="https://www.npmjs.com/package/toaster-ts">
          <Image src={NpmIcon} alt="npm icon" className="size-6" />
          npm
        </Pill>
        <Button classNames="flex justify-center gap-x-1.5 mx-auto row-start-2 col-start-1 col-end-3" onClick={() => showSampleToast()}>
          <Image src={BellIcon} alt="Bell icon" className="size-5" />
          <span className="text-sm md:text-base">Try it!</span>
        </Button>
      </SectionContainer>
      <SectionContainer classNames="pt-2 pb-12 flex justify-center">
        <a
          className="text-sm text-gray-700 underline"
          href="https://github.com/mpriereira/toaster-ts#readme"
          target="_blank"
          rel="noopener noreferrer">
          Documentation
        </a>
      </SectionContainer>
    </>
  )
}
