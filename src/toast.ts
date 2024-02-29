import { generateUuid } from './utils'
import { ToastOptions } from './toaster'

export class Toast {
  id: string
  title: string
  options: ToastOptions
  htmlElement: HTMLLIElement

  constructor (title: string, options: ToastOptions) {
    this.id = generateUuid()
    this.title = title
    this.options = options
    this.htmlElement = document.createElement('li')
    this.htmlElement.setAttribute('id', this.id)
    this.htmlElement.className = 'toast'
    this.htmlElement.innerHTML = `<h3>${this.title}</h3>${options.description != null ? `<p>${options.description}</p>` : ''}`
  }
}
