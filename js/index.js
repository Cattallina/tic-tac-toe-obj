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

        for (let i = 0; i < this.rowsNum; i++) { // проходит по рядам
            let tr = document.createElement('tr'); // создать необходимое кол-во tr
            rows[i] = []; // create arr for each line

            for (let j = 0; j < this.colsNum; j++) { // проходит через колонки
                let td = document.createElement('td'); // создать необходимое количество td
                tr.appendChild(td); // добавляет td в tr

                //td.addEventListener('click', this.cellClackHandler);
                rows[i][j] = td; // добавляет в arr столбцы
            }
            this.field.appendChild(tr); // добавляет tr в table
        }
        return rows;
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

    getRandNumber1() {
        return Math.floor(Math.random() * 9);
    }

    getRandNumber2() {
        return Math.floor(Math.random() * 3);

    }

    choicePlayer(gamer, lines) {
        let ran1 = this.getRandNumber1();
        let ran2 = this.getRandNumber2();

        for (let i = 0; i < lines.length; i++) {
            for (let j = 0; j < lines[i].length; j++) {
                if (lines[i][j].classList.contains(gamer) === false) {
                    lines[ran1][ran2].classList.add(gamer);
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