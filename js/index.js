class Field {
    constructor(selector, rowsNum, colsNum) {
        this.field = document.querySelector(selector);
        this.rowsNum = rowsNum;
        this.colsNum = colsNum;
        this.count = 0;
    }

    createField() {
        let rows = [];

        for (let i = 0; i < this.rowsNum; i++) {
            let tr = document.createElement('tr');
            rows[i] = [];

            for (let j = 0; j < this.colsNum; j++) {
                let td = document.createElement('td');
                tr.appendChild(td);

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
        this.counter = 0;
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
        this.count = 0;

        this.rows = field.createField(field.field, field.rowsNum, field.colsNum);
        this.cols = field.getColumns(this.rows);
        this.diag1 = field.getFirstDiags(this.rows);
        this.diag2 = field.getSecondDiags(this.rows);
        this.lines = this.rows.concat(this.cols, this.diag1, this.diag2);

        this.player = new Player(['bot', 'gamer1']);
        this.gamer = this.player.getGamer();
        this.run();
    }

    getRandNumber1() {
        return Math.floor(Math.random() * 3);
    }

    choicePlayer(count, gamer, lines, player, isWin, checkWin, endGame, freezeField, clearField, getRandNumber1) {
        let ran1 = 0;
        let ran2 = 0;
        for (let i = 0; i < lines.length; i++) {
            for (let j = 0; j < lines[i].length; j++) {
                if (!(lines[i][j].classList.contains(gamer))) {
                    lines[i][j].addEventListener('click', function () {
                        this.classList.add(gamer);

                        isWin(count, player, lines, checkWin, endGame, freezeField, clearField);
                        ran1 = getRandNumber1();
                        ran2 = getRandNumber1();
                        count++;
                        if (lines[ran1][ran2].classList.contains(gamer) === false) {
                            setTimeout(() => {
                                let bot = player.getGamer();
                                lines[ran1][ran2].classList.add(bot);
                            }, 2000);
                        } else {
                            setTimeout(() => {
                                let bot = player.getGamer();
                                lines[ran1][ran2].classList.add(bot);

                            }, 1000);
                        }
                    });
                }
            }
        }
    }

    run() {
        this.choicePlayer(this.count, this.gamer, this.lines, this.player, this.isWin, this.checkWin, this.endGame, this.freezeField, this.clearField, this.getRandNumber1);
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

    isWin(count, gamers, lines, checkWin, endGame, freezeField, clearField, player) {
        for (let i = 0; i < gamers.gamers.length; i++) {
            if (checkWin(gamers.gamers[i], lines)) {
                for (let i = 0; i < lines.length; i++) {
                    for (let j = 0; j < lines[i].length; j++) {
                        if (lines[i][j].classList.contains(gamers.gamers[j])) {
                            lines[i][j].classList.add('winner');
                        }
                    }
                }
                endGame(gamers.gamers[i], freezeField, clearField);
                setTimeout(() => {
                    if (count >= 8) {
                        let quest = confirm('Try again?');
                        if (quest === true) {
                            clearField();
                        } else {
                            return true
                        }
                    }
                }, 1000);
            }
        }
    }

    endGame(gamer, freezeField, clearField) {
        setTimeout(() => alert(gamer), 800);
        freezeField(gamer);
        clearField();
    }

    freezeField(gamer) {
        let cells = document.querySelectorAll('td');
        for (let i = 0; i < cells.length; i++) {

            cells[i].removeEventListener('click', function () {
                this.classList.add(gamer);
            })
        }
    }

    clearField() {
        setTimeout(() => location.reload(), 1000)
    }
}

const game = new Game();
