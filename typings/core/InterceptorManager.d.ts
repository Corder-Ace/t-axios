interface Handlers<V> {
    fulfilled: (value: V) => V | Promise<V>;
    rejected?: (error: any) => any;
}
export default class InterceptorsManger<V> {
    private handlers;
    constructor();
    use(fulfilled: (value: V) => V | Promise<V>, rejected: (error: any) => any): number;
    eject(id: number): void;
    forEach(fn: (interceptor: Handlers<V>) => void): void;
}
export {};
