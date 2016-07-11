(function (namespace) {
  namespace.controllers.ButtonsController = Utils.extend(namespace.controllers.BaseController, {
    initialize: function (params) {
        this.figuresView = params.figuresView;

        this.startButton = params.startButton;
        this.pauseButton = params.pauseButton;
        this.stopButton = params.stopButton;

        window.addEventListener('keydown', this.onKeyPressed.bind(this));
        this.startButton.addEventListener('click', this.onStartClicked.bind(this));
        this.pauseButton.addEventListener('click', this.onPauseClicked.bind(this));
        this.stopButton.addEventListener('click', this.onStopClicked.bind(this));
    },

    onKeyPressed: function (e) {
        var handlersMap = {
                40: this._onDownPressed.bind(this),
                39: this._onRightPressed.bind(this),
                38: this._onUpPressed.bind(this),
                37: this._onLeftPressed.bind(this)
            };

        handlersMap[e.keyCode] && this.figuresView.currentFigure && handlersMap[e.keyCode]();
    },

    _onDownPressed: function () {
        this._moveFigure(this.figuresView.currentFigure.moveDown());
    },

    _onLeftPressed: function () {
        this._moveFigure(this.figuresView.currentFigure.moveLeft());
    },

    _onRightPressed: function () {
        this._moveFigure(this.figuresView.currentFigure.moveRight());
    },

    _onUpPressed: function () {
        this._moveFigure(this.figuresView.currentFigure.rotate());
    },

    _moveFigure: function (positions) {
        if (this.figuresView.checkMove(positions)) {
            this.figuresView.renderFigure();
        }
    },

    onStartClicked: function () {
        this.figuresView.startGame();
    },

    onPauseClicked: function () {
        this.figuresView.pauseGame();
    },

    onStopClicked: function () {
        this.figuresView.finishGame();
    },
  });
})(App);
