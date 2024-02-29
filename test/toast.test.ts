import { beforeAll, expect, test } from 'vitest'
import { toast } from '../src';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

beforeAll(() => {
  const wrapper = document.createElement('div')
  wrapper.id = 'toaster-wrapper'
  document.body.insertAdjacentElement('beforeend', wrapper)
})

test('toast is rendered in document', () => {
  toast('Toast notification')
  const toastElement = document.querySelector('.toast')
  expect(document.querySelector('#toaster-wrapper')).toContain(toastElement)
})

test('toast text content is correct', () => {
  toast('Toast notification')
  const toastElement = document.querySelector('.toast')
  expect(toastElement!.textContent).toBe('Toast notification')
})

test('toast is cleared after timeout', async () => {
  toast('Toast notification', { timeout: 10 })
  const toastElement = document.querySelector('.toast')
  expect(document.querySelector('#toaster-wrapper')).toContain(toastElement)

  await delay(10)

  expect(document.querySelector('#toaster-wrapper')).not.toContain(toastElement)
})
