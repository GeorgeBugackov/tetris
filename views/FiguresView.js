(function (namespace) {
    namespace.views.FiguresView = Utils.extend(namespace.views.BaseView, {
        initialize: function (params) {
            this.gridView = params.gridView;
            this.scoresView = params.scoresView;
            this.figureConstructors = params.constructors;
        },

        startAnimation:  function () {
            if (!this.currentFigure) {
                this.currentFigure = this.createRandomFigure(this.figureConstructors, this.gridView.centerCell);
            }

            this.renderFigure();

            this.animTimer = setInterval(this.dropFigure.bind(this), 500);
        },

        createRandomFigure: function () {
            var figuresMap = [];

            for (var key in this.figureConstructors) {
                key !== 'BaseFigure' && figuresMap.push(this.figureConstructors[key]);
            }

            return new figuresMap[Utils.getRandomInteger(figuresMap.length - 1, 0)]({
                centerCell: this.gridView.centerCell,
                color: Utils.getRandomColor()
            });
        },

        renderFigure: function () {
            var currentFigure = this.currentFigure;

            this.gridView.clearTableCells(currentFigure.prevState.positions)
                .colorTableCells(currentFigure.state.positions, currentFigure.state.color);
        },

        dropFigure: function () {
            if (this.checkMove(this.currentFigure.moveDown())) {
                this.renderFigure();
            } else {
                this.markFigureLanded();

                if (!this.gridView.isStackFull()) {
                    this.startAnimation();
                } else {
                    this.finishGame();
                }
            };
        },

        checkMove: function (positions) {
            var result = true;

            for (var i = 0; i < positions.length; i++) {
                if (!this.gridView.checkCell(positions[i].x, positions[i].y)) {
                    this.currentFigure.rollPositionsBack();
                    result = false;
                }
            }

            return result;
        },

        markFigureLanded: function () {
            var completedRowsNumber;

            clearInterval(this.animTimer);

            this.gridView.markOccupiedCells(this.currentFigure.state.positions);

            completedRowsNumber = this.gridView.checkOccupiedRows();
            completedRowsNumber && this.scoresView.scoreUp(completedRowsNumber);

            this.currentFigure = null;
        },

        showGameOverText: function () {
            document.querySelector('.header').innerText = 'You\'re awesome! Try again!';
        },

        toggleButton: function (btn, flag) {
            var btnClassList = document.querySelector('.' + btn + 'Button').classList;

            (flag) ? btnClassList.remove('disabled') : btnClassList.add('disabled');

            return this;
        },

        startGame: function () {
            this.toggleButton('start', false)
                .toggleButton('pause', true)
                .toggleButton('stop', true);

            this.gridView.resetTable();
            this.scoresView.resetScores();

            this.startAnimation();
        },

        pauseGame: function () {
            if (this.animTimer) {
                clearInterval(this.animTimer);
                this.animTimer = null;

                this.toggleButton('stop', false);
                document.querySelector('.header').innerText = 'Freeze! Don\'t move! (Paused)';
            } else {
                this.animTimer = setInterval(this.dropFigure.bind(this), 500);
                this.scoresView.setScores();

                this.toggleButton('stop', true);
            }
        },

        finishGame: function () {
            clearInterval(this.animTimer);
            this.currentFigure = null;

            this.showGameOverText();

            this.toggleButton('start', true)
                .toggleButton('pause', false)
                .toggleButton('stop', false);
        }
    });
})(App);
