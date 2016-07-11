(function (namespace) {
    namespace.figures.BaseFigure = function (params) {
        var _proto = this.constructor.prototype;

        _proto.prevState = {
            positions: [],
            rotationFlag: 0
        };

        _proto.moveDown = function () {
            this.prevState = this.cloneState(this.state);

            for (var i = 0; i < this.state.positions.length; i++) {
                this.state.positions[i].y++;
            }

            return this.state.positions;
        };

        _proto.moveLeft = function () {
            this.prevState = this.cloneState(this.state);

            for (var i = 0; i < this.state.positions.length; i++) {
                this.state.positions[i].x--;
            }

            return this.state.positions;
        };

        _proto.moveRight = function () {
            this.prevState = this.cloneState(this.state);

            for (var i = 0; i < this.state.positions.length; i++) {
                this.state.positions[i].x++;
            }

            return this.state.positions;
        };

        _proto.rollPositionsBack = function () {
            return this.state = this.cloneState(this.prevState);
        };

        _proto.cloneState = function (state) {
            var clonedState = {};

            clonedState.rotationFlag = state.rotationFlag;
            clonedState.color = state.color;
            clonedState.positions = this.clonePositions(state.positions);

            return clonedState;
        };

        _proto.clonePositions = function (positions) {
            var clonedPositions = [];

            for (i = 0; i < positions.length; i++) {
                clonedPositions.push(Utils.cloneObject(positions[i]));
            }

            return clonedPositions;
        };

        _proto.initialize && _proto.initialize(arguments[0]);
    };
})(App)
