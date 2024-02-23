import './styles.css'
import { Toast } from './toast'

const toasts: Toast[] = []

export function createToast(title: string, description?: string): void {
  const toast = new Toast(title, description)
  toasts.push(toast)
  render(toast)
}

function render(toast: Toast): void {
  const wrapper = document.getElementById('toaster-wrapper')
  const toastElement = document.createElement('div')
  toastElement.id = toast.id
  toastElement.innerHTML = `<span>${toast.title}</span>`
  wrapper?.insertAdjacentElement('beforeend', toastElement)

  // toast.show()
}
