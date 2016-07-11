(function (namespace) {
    namespace.views.GridView = Utils.extend(namespace.views.BaseView, {
        initialize: function (params) {
            this.centerCell = Math.floor(params.columns/2);
            this.rowsNumber = params.rows;
            this.columnsNumber = params.columns;
        },

        render: function ($el) {
            var $row,
                $cell;

            this.$el = document.createElement('table');

            for (var i = 0; i < this.rowsNumber; i++) {
                $row = document.createElement('tr');
                this.$el.appendChild($row);

                for (var j = 0 ; j < this.columnsNumber; j++) {
                    $cell = document.createElement('td');
                    $row.appendChild($cell);
                }
            };

            $el.appendChild(this.$el);
        },

        isBorderCell: function (x,y) {
            return y === this.rowsNumber || x === this.columnsNumber || x < 0 ;
        },

        isOccupiedCell: function (x,y) {
            return  this.isValidCell(x,y) && this.$el.rows[y].cells[x].classList.contains('occupied');
        },

        isValidCell: function (x,y) {
            return y >= 0 && y < this.rowsNumber && x >= 0 && x < this.columnsNumber;
        },

        checkCell: function (x, y) {
            return this.isValidCell(x,y) && !(this.isBorderCell(x,y) || this.isOccupiedCell(x,y));
        },

        checkOccupiedRows: function () {
            var deleteFlag,
                rowsToDelete = [];

            for (var i = this.rowsNumber - 1; i >= 0; i--) {
                deleteFlag = true;

                for (var j = 0; j < this.columnsNumber; j++) {
                    if (!this.isOccupiedCell(j, i)) {
                        deleteFlag = false;
                        break;
                    }
                }

                deleteFlag && rowsToDelete.push(i);
            }

            if (rowsToDelete.length) {
                for (var i = rowsToDelete.length -1; i >= 0; i--) {
                    this.clearOccupiedRow(rowsToDelete[i]);
                }
            }

            return rowsToDelete.length;
        },

        isStackFull: function () {
            var result = false;

            for (var i = 0; i < this.columnsNumber; i++) {
                if (this.isOccupiedCell(i, 0)) {
                    result = true;
                    break;
                }
            }

            return result;
        },

        markOccupiedCells: function (positions) {
            var $cell;

            for (var i = 0; i < positions.length; i++) {
                if (this.isValidCell(positions[i].x, positions[i].y)) {
                    $cell = this.$el.rows[positions[i].y].cells[positions[i].x];
                    $cell.classList.add('occupied');
                }
            }
        },

        colorTableCells: function (positions, color) {
            var $cell;

            for (var i = 0; i < positions.length; i++) {
                if(this.isValidCell(positions[i].x, positions[i].y)) {
                    $cell = this.$el.rows[positions[i].y].cells[positions[i].x];
                    $cell.style.background = color;
                }
            }

            return this;
        },

        clearTableCells: function (positions) {
            var $cell;

            for (var i = 0; i < positions.length; i++) {
                this.isValidCell(positions[i].x, positions[i].y) &&
                    this.clearCell(positions[i].x, positions[i].y);
            }

            return this;
        },

        clearCell: function (x,y) {
            var $cell = this.$el.rows[y].cells[x];

            $cell.style.background = 'none';
            $cell.classList.remove('occupied');
        },

        clearOccupiedRow: function (rowNum) {
            var $clearRow = document.createElement('tr'),
                $table = this.$el;

            for (var i = 0 ; i < this.columnsNumber; i++) {
                $clearRow.appendChild(document.createElement('td'));
            }

            $table.deleteRow(rowNum);
            $table.insertBefore($clearRow, $table.firstChild);
        },

        resetTable: function () {
            for (var i = 0; i < this.rowsNumber; i++) {
                for (var j = 0 ; j < this.columnsNumber; j++) {
                    this.clearCell(j, i);
                }
            };
        }
    });
})(App);
