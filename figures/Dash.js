(function (namespace) {
    namespace.figures.Dash = Utils.extend(namespace.figures.BaseFigure, {
        initialize: function (params) {
            this.state = {
                positions: [
                        {
                            x: params.centerCell - 2 || 0,
                            y: -1
                        },
                        {
                            x: params.centerCell - 1 || 1,
                            y: -1
                        },
                        {
                            x: params.centerCell || 2,
                            y: -1
                        },
                        {
                            x: params.centerCell + 1 || 3,
                            y: -1
                        }
                    ],
                rotationFlag: 0,
                color: params.color || 'black'
            };
        },

        rotate: function () {
            var rotationMap = [
                    this._defaultRotation.bind(this),
                    this._rotate90.bind(this)
                ],
                state = this.state;

            this.prevState = this.cloneState(this.state);

            (state.rotationFlag === 1) ? state.rotationFlag = 0 : state.rotationFlag++;

            return rotationMap[state.rotationFlag]();
        },

        _defaultRotation: function () {
            var positions = this.state.positions;

            positions[0].x = positions[0].x - 2;
            positions[0].y = positions[0].y + 2;

            positions[1].x = positions[1].x - 1;
            positions[1].y = positions[1].y + 1;

            positions[3].x = positions[3].x + 1;
            positions[3].y = positions[3].y - 1;

            return positions;
        },

        _rotate90: function () {
            var positions = this.state.positions;

            positions[0].x = positions[0].x + 2;
            positions[0].y = positions[0].y - 2;

            positions[1].x = positions[1].x + 1;
            positions[1].y = positions[1].y - 1;

            positions[3].x = positions[3].x - 1;
            positions[3].y = positions[3].y + 1;

            return positions;
        }
    });
})(App)
