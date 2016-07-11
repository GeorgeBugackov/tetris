(function (namespace) {
    namespace.views.ScoresView = Utils.extend(namespace.views.BaseView, {
        scores: 0,

        initialize: function (params) {
            this.$el = params.$el;
        },

        scoreUp: function (completedRowsNumber) {
            this.scores += 100 * completedRowsNumber;

            this.setScores();
        },

        resetScores: function () {
            this.scores = 0;

            this.setScores();
        },

        setScores: function () {
            this.$el.innerText = this.scores;
        }
    });
})(App);
