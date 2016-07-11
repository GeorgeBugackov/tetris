(function (namespace) {
    namespace.views.BaseView = Utils.extend(function () {
        var _proto = this.constructor.prototype;

        _proto.initialize && _proto.initialize(arguments[0]);
    }, {});
})(App)
