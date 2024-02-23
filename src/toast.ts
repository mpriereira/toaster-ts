import { generateUuid } from './utils'

export class Toast {
  id: string
  title: string
  description: string | undefined

  constructor(title: string, description?: string) {
    this.id = generateUuid()
    this.title = title
    this.description = description
    console.log(this.id)
  }

  show(): void {
    console.log(
      `Creating toast message with title "${this.title}" and description "${this.description}"`
    )
  }
}
