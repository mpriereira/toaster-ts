import './loader.scss'
import './toaster.scss'
import { genid } from './utils'
import { PromiseOptions, ToastOptions, ToastType, ToastUpdateOptions } from './types'
import { ErrorIcon, InfoIcon, LoadingIcon, SuccessIcon, WarningIcon } from './assets'

const VIEWPORT_OFFSET = '32px'
const VISIBLE_TOASTS_AMOUNT = 3
const GAP = 14
const TOAST_LIFETIME = 4000
const TIME_BEFORE_UNMOUNT = 200
const TOAST_WIDTH = 356
const DEFAULT_POSITION = 'bottom-right'

function basicToast (
  message: string,
  { description, type }: ToastOptions = { description: '' }
): HTMLLIElement {
  if (document.querySelector('#toaster-wrapper') == null) {
    throw new Error('No wrapper element found, please follow documentation')
  }

  if (document.getElementById('toaster-list') == null) {
    renderToaster()
  }

  updatePosition()
  updateRichColors()
  const { toast } = create(message, { description, type })

  return toast
}

function renderToaster (): void {
  const el = document.querySelector('#toaster-wrapper') as HTMLElement
  const ol = document.createElement('ol')
  el.append(ol)

  const [y, x] = el.getAttribute('data-position')?.split('-') ?? DEFAULT_POSITION.split('-')
  const richColors = el.getAttribute('data-rich-colors') === 'true'

  ol.outerHTML = `
  <ol
  data-sonner-toaster="true"
  data-theme="light"
  data-x-position="${x}"
  data-y-position="${y}"
  ${
    richColors ? 'data-rich-colors="true"' : ''
  }
  id="toaster-list"
  style="--front-toast-height: 0px; --offset: ${VIEWPORT_OFFSET}; --width: ${TOAST_WIDTH}px; --gap: ${GAP}px">
  </ol>`

  registerMouseOver()
}

function updatePosition (): void {
  const list = document.getElementById('toaster-list') as HTMLOListElement
  const [y, x] = list.parentElement?.getAttribute('data-position')?.split('-') ?? DEFAULT_POSITION.split('-')
  if (x !== list.getAttribute('data-x-position') || y !== list.getAttribute('data-y-position')) {
    list.setAttribute('data-x-position', x)
    list.setAttribute('data-y-position', y)
    for (let i = 0; i < list.children.length; i++) {
      const el = list.children.item(i) as HTMLLIElement
      el.setAttribute('data-x-position', x)
      el.setAttribute('data-y-position', y)
    }
  }
}

function updateRichColors (): void {
  const list = document.getElementById('toaster-list') as HTMLOListElement
  const richColors = list.parentElement?.getAttribute('data-rich-colors') ?? ''
  if (list.getAttribute('data-rich-colors') !== richColors) {
    list.setAttribute('data-rich-colors', richColors)
  }
}

function registerMouseOver (): void {
  const ol = document.getElementById('toaster-list') as HTMLOListElement
  ol.addEventListener('mouseenter', () => {
    for (let i = 0; i < ol.children.length; i++) {
      const el = ol.children[i] as HTMLLIElement
      if (el.getAttribute('data-expanded') === 'true') continue
      el.setAttribute('data-expanded', 'true')

      clearRemoveTimeout(el)
    }
  })
  ol.addEventListener('mouseleave', () => {
    for (let i = 0; i < ol.children.length; i++) {
      const el = ol.children[i] as HTMLLIElement
      if (el.getAttribute('data-expanded') === 'false') continue
      el.setAttribute('data-expanded', 'false')

      registerRemoveTimeout(el)
    }
  })
}

function create (message: string, { description, type }: ToastOptions): { toast: HTMLLIElement, id: string } {
  const list = document.getElementById('toaster-list') as HTMLOListElement

  const { toast, id } = renderToast(list, message, { description, type })

  window.setTimeout(() => {
    const el = list.children[0] as HTMLLIElement
    const height = el.getBoundingClientRect().height

    el.setAttribute('data-mounted', 'true')
    el.setAttribute('data-initial-height', `${height}`)
    el.style.setProperty('--initial-height', `${height}px`)
    list.style.setProperty('--front-toast-height', `${height}px`)

    refreshProperties()
    registerRemoveTimeout(el)
  }, 16)

  return { toast, id }
}

function renderToast (list: HTMLElement, message: string, { description, type }: ToastOptions): { toast: HTMLLIElement, id: string } {
  const toast = document.createElement('li')
  list.prepend(toast)
  const id = genid()
  const count = list.children.length
  const asset = type != null ? getAsset(type) : null
  toast.outerHTML = `<li
  class="toast"
  data-id="${id}"
  data-type="${type != null ? type : ''}"
  data-removed="false"
  data-mounted="false"
  data-front="true"
  data-expanded="false"
  data-index="${0}"
  data-y-position="${list.getAttribute('data-y-position') ?? DEFAULT_POSITION.split('-')[0]}"
  data-x-position="${list.getAttribute('data-x-position') ?? DEFAULT_POSITION.split('-')[1]}"
  style="--index: 0; --toasts-before: ${0}; --z-index: ${count}; --offset: 0px; --initial-height: 0px;">
    ${
      asset !== null
        ? `
      <div data-icon="" class="">
        ${asset}
      </div>
  `
        : ''
    }
    <div data-content="">
      <div data-title="">
        ${message}
      </div>
      ${
        description != null
          ? `<div data-description="">${description}</div>`
          : ''
      }
    </div>
  </li>`

  return { toast: list.children[0] as HTMLLIElement, id }
}

function refreshProperties (): void {
  const list = document.getElementById('toaster-list') as HTMLOListElement

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
  const tid = window.setTimeout(() => {
    remove(el)
  }, TOAST_LIFETIME)
  el.setAttribute('data-remove-tid', `${tid}`)
}

function clearRemoveTimeout (el: HTMLLIElement): void {
  const tid = el.getAttribute('data-remove-tid')
  if (tid != null) window.clearTimeout(+tid)
}

function remove (el: HTMLLIElement): void {
  el.setAttribute('data-removed', 'true')
  refreshProperties()

  const tid = window.setTimeout(() => {
    el.parentElement?.removeChild(el)
  }, TIME_BEFORE_UNMOUNT)
  el.setAttribute('data-unmount-tid', `${tid}`)
}

function getAsset (type: ToastType): string {
  switch (type) {
    case 'success':
      return SuccessIcon

    case 'info':
      return InfoIcon

    case 'warning':
      return WarningIcon

    case 'error':
      return ErrorIcon

    case 'loading':
      return LoadingIcon
  }
}

function promiseToast<T> (promise: Promise<T>, data: PromiseOptions<T>): void {
  const toastElement = basicToast(data.loading ?? 'Loading...', { type: 'loading' })
  promise
    .then((response) => {
      const success = typeof data.success === 'function' ? data.success(response) : data.success
      updateToast(toastElement, { message: success ?? 'Success', type: 'success' })
    })
    .catch((err) => {
      const error = typeof data.error === 'function' ? data.error(err) : data.error
      updateToast(toastElement, { message: error ?? 'Error', type: 'error' })
    })
}

function updateToast (toast: HTMLLIElement, { message, type }: ToastUpdateOptions): void {
  const asset = getAsset(type)
  const iconElement = toast.querySelector('[data-icon]')
  const messageElement = toast.querySelector('[data-title]')
  if (iconElement != null) {
    iconElement.outerHTML = asset
  }
  if (messageElement != null) {
    messageElement.replaceWith(message)
  }
  toast.setAttribute('data-type', type)
}

export const toast = Object.assign(
  basicToast,
  {
    success: (message: string) => basicToast(message, { type: 'success' }),
    info: (message: string) => basicToast(message, { type: 'info' }),
    warning: (message: string) => basicToast(message, { type: 'warning' }),
    error: (message: string) => basicToast(message, { type: 'error' }),
    loading: (message: string) => basicToast(message, { type: 'loading' }),
    promise: <T>(promise: Promise<T>, data: PromiseOptions<T>) => promiseToast(promise, data),
    message: (message: string, { description }: ToastOptions) => basicToast(message, { description })
  }
)
