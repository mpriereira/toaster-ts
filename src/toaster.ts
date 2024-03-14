import './styles.scss'
import { genid } from './utils'

const VIEWPORT_OFFSET = '32px'
const VISIBLE_TOASTS_AMOUNT = 3
const GAP = 14
const TOAST_LIFETIME = 4000
const TIME_BEFORE_UNMOUNT = 200
const TOAST_WIDTH = 356
const DEFAULT_POSITION = 'bottom-right'

export interface ToastOptions {
  description?: string
}

export function toast (msg: string, { description }: ToastOptions = { description: '' }): void {
  const wrapper = document.querySelector('#toaster-wrapper')
  if (wrapper == null) {
    console.error('No wrapper element found')
    return
  }

  if (document.getElementById('toaster-list') == null) {
    renderList()
  }

  setTimeout(() => {
    const wrapper = document.querySelector('#toaster-wrapper') as HTMLElement
    const list = document.getElementById('toaster-list') as HTMLOListElement
    const [yPosition, xPosition] = wrapper.getAttribute('data-position')?.split('-') ?? DEFAULT_POSITION.split('-')
    if (xPosition !== list.getAttribute('data-x-position') || yPosition !== list.getAttribute('data-y-position')) {
      list.setAttribute('data-x-position', xPosition)
      list.setAttribute('data-y-position', yPosition)
      if (list.children.length > 0) {
        for (let i = 0; i < list.children.length; i++) {
          const el = list.children.item(i) as HTMLLIElement
          el.setAttribute('data-x-position', xPosition)
          el.setAttribute('data-y-position', yPosition)
        }
      }
    }
  })

  show(msg, { description })
}

function renderList (): void {
  const wrapper = document.querySelector('#toaster-wrapper') as HTMLElement
  const list = document.createElement('ol')
  wrapper.append(list)

  const [yPosition, xPosition] = wrapper.getAttribute('data-position')?.split('-') ?? DEFAULT_POSITION.split('-')

  list.outerHTML = `
  <ol
  data-x-position="${xPosition}"
  data-y-position="${yPosition}"
  id="toaster-list"
  style="--front-toast-height: 0px; --offset: ${VIEWPORT_OFFSET}; --width: ${TOAST_WIDTH}px; --gap: ${GAP}px">
  </ol>`
}

function show (msg: string, { description }: ToastOptions): void {
  const list = document.getElementById('toaster-list')
  if (list == null) return

  renderToast(list, msg, { description })

  setTimeout(() => {
    const el = list.children[0] as HTMLLIElement
    const height = el.getBoundingClientRect().height

    el.setAttribute('data-mounted', 'true')
    el.setAttribute('data-initial-height', `${height}`)
    el.style.setProperty('--initial-height', `${height}px`)
    list.style.setProperty('--front-toast-height', `${height}px`)

    refreshProperties()
    registerRemoveTimeout(el)
  }, 30)
}

function renderToast (list: HTMLElement, msg: string, { description }: ToastOptions): { toast: HTMLLIElement, id: string } {
  const toast = document.createElement('li')
  list.prepend(toast)
  const id = genid()
  const count = list.children.length
  toast.outerHTML = `<li
  class="toast"
  data-id="${id}"
  data-removed="false"
  data-mounted="false"
  data-front="true"
  data-index="${0}"
  data-y-position="${list.getAttribute('data-y-position') ?? DEFAULT_POSITION.split('-')[0]}"
  data-x-position="${list.getAttribute('data-x-position') ?? DEFAULT_POSITION.split('-')[1]}"
  style="--index: 0; --toasts-before: ${0}; --z-index: ${count}; --offset: 0px; --initial-height: 0px;">
    <h3>${msg}</h3>${description != null ? `<p>${description}</p>` : ''}
  </li>`

  return { toast, id }
}

function refreshProperties (): void {
  const list = document.getElementById('toaster-list')
  if (list == null) return

  let heightsBefore = 0
  let removed = 0

  for (let i = 0; i < list.children.length; i++) {
    const el = list.children[i] as HTMLLIElement
    if (el.getAttribute('data-removed') === 'true') {
      removed++
      continue
    }
    const idx = i - removed
    el.setAttribute('data-index', `${idx}`)
    el.setAttribute('data-front', idx === 0 ? 'true' : 'false')
    el.setAttribute(
      'data-visible',
      idx < VISIBLE_TOASTS_AMOUNT ? 'true' : 'false'
    )
    el.style.setProperty('--index', `${idx}`)
    el.style.setProperty('--toasts-before', `${idx}`)
    el.style.setProperty('--offset', `${GAP * idx + heightsBefore}px`)
    el.style.setProperty('--z-index', `${list.children.length - i}`)
    heightsBefore += Number(el.getAttribute('data-initial-height'))
  }
}

function registerRemoveTimeout (el: HTMLLIElement): void {
  setTimeout(() => {
    remove(el)
  }, TOAST_LIFETIME)
}

function remove (el: HTMLLIElement): void {
  el.setAttribute('data-removed', 'true')
  refreshProperties()

  setTimeout(() => {
    el.parentElement?.removeChild(el)
  }, TIME_BEFORE_UNMOUNT)
}
