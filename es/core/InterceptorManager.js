var InterceptorsManger = /** @class */ (function () {
    function InterceptorsManger() {
        this.handlers = [];
        this.handlers = [];
    }
    InterceptorsManger.prototype.use = function (fulfilled, rejected) {
        this.handlers.push({ fulfilled: fulfilled, rejected: rejected });
        return this.handlers.length - 1;
    };
    InterceptorsManger.prototype.eject = function (id) {
        if (this.handlers[id]) {
            this.handlers[id] = null;
        }
    };
    InterceptorsManger.prototype.forEach = function (fn) {
        this.handlers.forEach(function (handler) {
            if (handler !== null) {
                fn(handler);
            }
        });
    };
    return InterceptorsManger;
}());
export default InterceptorsManger;
