interface Handlers<V> {
  fulfilled: (value: V) => V | Promise<V>
  rejected?: (error: any) => any
}
export default class InterceptorsManger<V> {
  private handlers: (Handlers<V> | null)[] = []

  constructor() {
    this.handlers = []
  }

  public use(fulfilled: (value: V) => V | Promise<V>, rejected: (error: any) => any): number {
    this.handlers.push({ fulfilled, rejected })
    return this.handlers.length - 1
  }

  public eject(id: number): void {
    if (this.handlers[id]) {
      this.handlers[id] = null
    }
  }

  public forEach(fn: (interceptor: Handlers<V>) => void): void {
    this.handlers.forEach(handler => {
      if (handler !== null) {
        fn(handler)
      }
    })
  }
}
