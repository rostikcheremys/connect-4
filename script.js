let board = Array.from({ length: 7 }, () => Array(6).fill(null));
let turn = 1;
let isGameWon = false;

const columns = document.querySelectorAll(".column");

columns.forEach((element, index) => {
    element.addEventListener("click", () => {
        if (isGameWon) {
            return resetButton();
        }

        const row = board[index].indexOf(null);

        if (row === -1) {
            return;
        }

        const player = turn % 2 !== 0 ? "red" : "yellow";

        board[index][row] = player;
        document.getElementById(`${element.id}r${row + 1}`).classList.add(`${player}-chip`);

        updateGameStatus();
    });
});

function updateGameStatus() {
    if (checkWin()) {
        isGameWon = true;
        document.getElementById('current-player').innerText = turn % 2 !== 0 ? "Reds Won!" : "Yellows Won!";
    } else if (board.every(column => column.every(cell => cell))) {
        document.getElementById('current-player').innerText = "The game ended in a draw. All positions are filled.";
    } else {
        turn++;
        document.getElementById('current-player').innerText = turn % 2 !== 0 ? "Red's Turn" : "Yellow's Turn";
        resetButton();
    }
}

function checkHorizontal() {
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j <= 2; j++) {
            if (checkFourCells(board[i][j], board[i][j + 1], board[i][j + 2], board[i][j + 3])) {
                return true;
            }
        }
    }
    return false;
}

function checkVertical() {
    for (let i = 0; i <= 5; i++) {
        for (let j = 0; j <= 3; j++) {
            if (checkFourCells(board[j][i], board[j + 1][i], board[j + 2][i], board[j + 3][i])) {
                return true;
            }
        }
    }
    return false;
}

function checkDiagonal() {
    for (let i = 0; i <= 3; i++) {
        for (let j = 0; j <= 2; j++) {
            if (checkFourCells(board[i][j], board[i + 1][j + 1], board[i + 2][j + 2], board[i + 3][j + 3])) {
                return true;
            }
        }
    }

    for (let i = 0; i <= 3; i++) {
        for (let j = 5; j >= 3; j--) {
            if (checkFourCells(board[i][j], board[i + 1][j - 1], board[i + 2][j - 2], board[i + 3][j - 3])) {
                return true;
            }
        }
    }
    return false;
}

function checkWin() {
    return (checkHorizontal() || checkVertical() || checkDiagonal());
}

function checkFourCells(cell1, cell2, cell3, cell4) {
    return cell1 && cell1 === cell2 && cell1 === cell3 && cell1 === cell4;
}

function resetButton() {
    document.getElementById('button').addEventListener('click', function() {
        location.reload();
    });
}
