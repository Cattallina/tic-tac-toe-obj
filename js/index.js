class Field {
    constructor(selector, rowsNum, colsNum) {
        this.field = document.querySelector(selector);
        this.colsNum = colsNum;
        this.rowsNum = rowsNum;

        this.count = 0;
        this.gamerNum = 0;
        this.gamers = ['gamer1', 'gamer2'];

        this.rows = this.createField(this.field, this.rowsNum, this.colsNum);
        this.cols = this.getColumns(this.rows);
        this.diag1 = this.getFirstDiags(this.rows);
        this.diag2 = this.getSecondDiags(this.rows);
        this.lines = this.rows.concat(this.cols, this.diag1, this.diag2);

        this.player = new Player;
    }

    createField(field, rowsNum, colsNum) {
        let rows = [];

        for (let i = 0; i < rowsNum; i++) {
            let tr = document.createElement('tr');
            rows[i] = [];

            for (let j = 0; j < colsNum; j++) {
                let td = document.createElement('td');
                tr.appendChild(td);

                td.addEventListener('click', this.cellClackHandler);

                rows[i][j] = td;
            }
            field.appendChild(tr);
        }

        return rows;
    }

    cellClackHandler() {
        // let count = 0;
        // let gamerNum = 0;
        // let gamers = ['gamer1', 'gamer2'];

        // console.log(this);
        // console.log(gamers);
        // console.log([gamerNum]);

        this.classList.add(this.gamers[this.gamerNum]);
        this.removeEventListener('click', this.cellClackHandler);

        this.isWin(this.gamers, this.lines);

        this.gamerNum++;
        this.count++;
        if (this.gamerNum === this.gamers.length) {
            this.gamerNum = 0;
        }
    }

    getColumns(arr) {
        let result = [];
        for (let i = 0; i < arr.length; i++) { // number arr elems - 3
            for (let j = 0; j < arr[i].length; j++) { // number in arr arrs elems - 3 = 9
                if (result[j] === undefined) {
                    result[j] = [];
                }
                result[j][i] = arr[i][j];
            }
        }

        return result;
        /*
            i = [ [], [], [] ] - 3 массива
            j = [[1, 2, 3], [4, 5, 6], [7, 8, 9]] - элементы выбраного массива - 1, 4, 7 ...
            [
                [1, 4, 9],
                [2, 5, 8],
                [3, 6, 9]
            ]
        */
    }

    getFirstDiags(arr) {
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                if (result[i + j] === undefined) {
                    result[i + j] = [];
                }
                result[i + j].push(arr[i][j]);
            }
        }
        /*
            0 + 0 = 0[1];
            0 + 1 = 1[4];
            0 + 2 = 2[7];

            1 + 0 = 1[2];
            1 + 1 = 2[5];
            1 + 2 = 3[8];

            2 + 0 = 2[3];
            2 + 1 = 3[6];
            2 + 2 = 4[9];

            [
                [1],
                [4, 2],
                [7, 5, 3],
                [8, 6],
                [9]
            ]
        */

        return result
    }

    getSecondDiags(arr) {
        return this.getFirstDiags(this.reverseSubArrs(arr))
    }

    reverseSubArrs(arr) {
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            for (let j = arr[i].length - 1; j >= 0; j--) {
                if (result[i] === undefined) {
                    result[i] = [];
                }
                result[i].push(arr[i][j]);
            }
        }
        return result
    }

    checkWin(gamer, lines) {
        for (let i = 0; i < lines.length; i++) {
            for (let j = 2; j < lines[i].length; j++) {
                if (lines[i][j - 2].classList.contains(gamer) &&
                    lines[i][j - 1].classList.contains(gamer) &&
                    lines[i][j].classList.contains(gamer)) {
                    return true;
                }
            }
        }
        return false;
    }

    isWin(gamers, lines) {
        if (this.count >= 8) {
            let quest = confirm('Try again?');
            if (quest === true) {
                this.clearField();
            } else {
                return true
            }
        }
        for (let i = 0; i < gamers.length; i++) {
            if (this.checkWin(gamers[i], lines)) {
                for (let i = 0; i < lines.length; i++) {
                    for (let j = 0; j < lines[i].length; j++) {
                        if (lines[i][j].classList.contains(gamers[this.gamerNum])) {
                            lines[i][j].classList.add('winner');
                        }
                    }
                }
                this.endGame(gamers[i]);
                break;
            }
        }
    }

    endGame(gamer) {
        setTimeout(() => alert(gamer), 500);
        this.freezeField();
        this.clearField();
    }

    freezeField() {
        let cells = this.field.querySelectorAll('td');
        for (let i = 0; i < cells.length; i++) {
            return cells[i].removeEventListener('click', this.cellClackHandler);
        }
    }

    clearField() {
        return setTimeout(() => location.reload(), 1000)
    }
}

class Player {
    constructor(gamer, elem, row, col, dots) {
        this._gamer = gamer;
        this._elem = elem;
        this._row = row;
        this._col = col;
        this._dots = dots;
    }
}

let field = new Field('#game', 3, 3);
let player = new Player();