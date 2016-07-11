(function (namespace) {
    namespace.figures.Cube = Utils.extend(namespace.figures.BaseFigure, {
        initialize: function (params) {
            this.state = {
                positions: [
                        {
                            x: params.centerCell - 1 || 0,
                            y: -1
                        },
                        {
                            x: params.centerCell || 1,
                            y: -1
                        },
                        {
                            x: params.centerCell - 1 || 0,
                            y: 0
                        },
                        {
                            x: params.centerCell || 1,
                            y: 0
                        }
                    ],
                rotationFlag: 0,
                color: params.color || 'black'
            };
        },

        rotate: function () {
            return this.state.positions;
        }
    });
})(App)
