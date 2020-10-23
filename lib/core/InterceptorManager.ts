interface Handlers<V> {
    fulfilled: (value: V) => V | Promise<V>;
    rejected?: (error: any) => any;
}

class InterceptorsManger<T> {
    private handlers: (Handlers<T> | null)[] = [];

    constructor() {
        this.handlers = [];
    }

    use(fulfilled: (value: T) => T | Promise<T>, rejected: (error: any) => any): number {
        this.handlers.push({ fulfilled, rejected });
        return this.handlers.length - 1;
    }

    eject(id: number): void {
        if (this.handlers[id]) {
            this.handlers[id] = null;
        }
    }

    forEach(fn: (interceptor: Handlers<T>) => void): void {
        this.handlers.forEach(handler => {
            if (handler !== null) {
                fn(handler)
            }
        })
    }
}

export default InterceptorsManger


