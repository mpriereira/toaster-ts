export type ToastType = 'success' | 'error' | 'info' | 'warning' | 'loading'

export type PromiseResult<T = any> = string | ((data: T) => string)

export interface PromiseOptions<T = any> {
  loading?: string
  success?: PromiseResult<T>
  error?: PromiseResult<T>
}

export interface ToastOptions {
  description?: string
  type?: ToastType
}

export interface ToastUpdateOptions {
  message: string
  type: ToastType
}
