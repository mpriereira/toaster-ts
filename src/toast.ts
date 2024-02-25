import { generateUuid } from './utils'

export class Toast {
  id: string
  title: string
  description: string | undefined
  htmlElement: HTMLLIElement

  constructor (title: string, description?: string) {
    this.id = generateUuid()
    this.title = title
    this.description = description
    this.htmlElement = document.createElement('li')
    this.htmlElement.setAttribute('id', this.id)
    this.htmlElement.className = 'toast'
    this.htmlElement.innerHTML = `<h3>${this.title}</h3>${this.description != null ? `<p>${this.description}</p>` : ''}`
  }
}
