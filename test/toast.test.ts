import { beforeAll, expect, test } from 'vitest'
import { toast } from '../src';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

beforeAll(() => {
  const wrapper = document.createElement('section')
  document.body.insertAdjacentElement('beforeend', wrapper)
  wrapper.outerHTML = '<section id="toaster-wrapper"></section>'
})

test('toast is rendered in document', () => {
  const toastElement = toast('Toast notification')
  expect(document.querySelector('#toaster-wrapper')).toContain(toastElement)
})

test('toast text content is correct', () => {
  const toastElement = toast('Toast notification')
  expect(toastElement!.textContent).toContain('Toast notification')
})

test('toast is cleared after timeout', async () => {
  const toastElement = toast('Toast notification')
  expect(document.querySelector('#toaster-wrapper')).toContain(toastElement)

  await delay(4500)

  expect(document.querySelector('#toaster-wrapper')).not.toContain(toastElement)
})
