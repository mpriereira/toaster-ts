import { beforeAll, expect, test } from 'vitest'
import { toast } from '../src';

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
