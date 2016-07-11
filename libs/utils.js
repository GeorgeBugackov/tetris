(function (namespace) {
    namespace.Utils = new Utils();

    function Utils () {
        this.getRandomInteger = function (max, min) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        this.getRandomColor = function () {
            var colors = [
                'brown',
                'red',
                'green',
                'yellow',
                'blue',
                'purple',
                'aqua'
            ];

            return colors[this.getRandomInteger(colors.length-1, 0)];
        };

        this.cloneObject = function (obj) {
            var clone = {};

            for (key in obj) {
            	clone[key] = obj[key];
            }

            return clone;
        };

        this.extend = function (Parent, attributes) {
            var Child = function () {
                    return Parent.apply(this, arguments);
                },
                Func = function () {
                    this.constructor = Child;
                };

            Func.prototype = Parent.prototype;
            Child.prototype = new Func();

            for (var key in attributes) {
                Child.prototype[key] = attributes[key];
            }

            return Child;
        };

        return this;
    }
})(window);
