class Field {
    constructor(selector, rowsNum, colsNum) {
        this.field = document.querySelector(selector);
        this.rowsNum = rowsNum;
        this.colsNum = colsNum;
        this.count = 0;

        this.createField()
    }

    createField() {
        let rows = [];

        for (let i = 0; i < this.rowsNum; i++) {
            let tr = document.createElement('tr');
            rows[i] = [];

            for (let j = 0; j < this.colsNum; j++) {
                let td = document.createElement('td');
                tr.appendChild(td);

                //td.addEventListener('click', this.cellClackHandler);
                rows[i][j] = td;
            }
            this.field.appendChild(tr);
        }
        return rows;
    }

    getColumns(arr) {
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                if (result[j] === undefined) {
                    result[j] = [];
                }
                result[j][i] = arr[i][j];
            }
        }

        return result;
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
}

class Player {
    constructor(gamers) {
        this.gamers = gamers;
        this.length = this.gamers.length;
        this.counter = 1;
    }

    getCount() {
        this.counter++;
        if (this.counter === this.length) {
            this.counter = 0;
        }
        return this.counter;
    }

    getGamer() {
        return this.gamers[this.getCount()]
    }
}

class Game {
    constructor() {
        const field = new Field('.field', 3, 3);

        this.rows = field.createField(field.field, field.rowsNum, field.colsNum);
        this.cols = field.getColumns(this.rows);
        this.diag1 = field.getFirstDiags(this.rows);
        this.diag2 = field.getSecondDiags(this.rows);
        this.lines = this.rows.concat(this.cols, this.diag1, this.diag2);

        this.player = new Player(['gamer1', 'bot']);
        this.gamer = this.player.getGamer();
        this.choicePlayer(this.gamer, this.lines)
    }

    choicePlayer(gamer, lines) {
        let random = Math.floor(Math.random() * 9);

        for (let i = 0; i < lines.length; i++) {
            for (let j = 0; j < lines[i].length; j++) {
                console.log(lines[i][j].classList.contains('bot'));
                if (lines[i][j].classList.contains(gamer) === false) {
                    lines[random][random].classList.add(gamer)
                } else {
                    lines[i][j].addEventListener('click', function () {
                        this.classList.add(gamer);
                    });
                }
            }
        }

    }
}

const game = new Game();