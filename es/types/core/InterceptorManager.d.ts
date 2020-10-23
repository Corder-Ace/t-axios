interface Handlers<V> {
    fulfilled: (value: V) => V | Promise<V>;
    rejected?: (error: any) => any;
}
declare class InterceptorsManger<T> {
    private handlers;
    constructor();
    use(fulfilled: (value: T) => T | Promise<T>, rejected: (error: any) => any): number;
    eject(id: number): void;
    forEach(fn: (interceptor: Handlers<T>) => void): void;
}
export default InterceptorsManger;
