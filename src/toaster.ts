import './styles.scss'
import { Toast } from './toast'

const toasts: Toast[] = []
let listContainerElement: HTMLOListElement

export interface ToastOptions {
  description?: string
  timeout?: number
}

export function toast (
  title: string,
  options: ToastOptions = { description: '', timeout: 2000 }
): void {
  if (toasts.length === 0) {
    createListContainer()
  }

  render(new Toast(
    title,
    {
      description: options?.description,
      timeout: options?.timeout ?? 2000
    }
  ))
}

function createListContainer (): void {
  const wrapper = document.getElementById('toaster-wrapper')

  if (wrapper == null) {
    console.error('No wrapper element found')
    return
  }

  listContainerElement = document.createElement('ol')
  listContainerElement.className = 'toasts-list'

  wrapper.insertAdjacentElement('afterbegin', listContainerElement)
}

function render (toast: Toast): void {
  toasts.push(toast)
  /* toasts = [
    ...toasts.slice(-2),
    toast
  ] // last two elements + new toast */
  listContainerElement.insertAdjacentElement('afterbegin', toast.htmlElement)

  setTimeout(() => listContainerElement.removeChild(toast.htmlElement), toast.options.timeout)
}
