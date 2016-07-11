var App = {
    figures: {},
    views: {},
    controllers: {}
};

window.onload = function () {
    App.gridView = new App.views.GridView({
        rows: 20,
        columns: 10
    });

    App.scoresView = new App.views.ScoresView({
        $el: document.querySelector('.header')
    });

    App.figuresView = new App.views.FiguresView({
        gridView: App.gridView,
        scoresView: App.scoresView,
        constructors: App.figures
    });
    
    App.buttonsController = new App.controllers.ButtonsController({
        figuresView: App.figuresView,
        startButton: document.querySelector('.startButton'),
        pauseButton: document.querySelector('.pauseButton'),
        stopButton: document.querySelector('.stopButton'),
    });

    App.gridView.render(document.querySelector('.screen'));
};
