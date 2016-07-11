(function (namespace) {
    namespace.figures.ZigzagR = Utils.extend(namespace.figures.Zigzag, {
        initialize: function (params) {
            this.state = {
                positions: [
                        {
                            x: params.centerCell -1 || 0,
                            y: -1
                        },
                        {
                            x: params.centerCell || 0,
                            y: -1
                        },
                        {
                            x: params.centerCell || 1,
                            y: 0
                        },
                        {
                            x: params.centerCell + 1 || 2,
                            y: 0
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

            positions[2].x = positions[2].x + 1;

            positions[3].x = positions[3].x + 1;
            positions[3].y = positions[3].y + 2;

            return positions;
        },

        _rotate90: function () {
            var positions = this.state.positions;

            positions[2].x = positions[2].x - 1;

            positions[3].x = positions[3].x - 1;
            positions[3].y = positions[3].y - 2;

            return positions;
        }
    });
})(App)
