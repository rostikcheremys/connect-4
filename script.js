let board = Array.from({ length: 7 }, () => Array(6).fill(null));
let isGameWon = false;
let turn = 1;

const columns = document.querySelectorAll(".column");
const currentPlayer = document.getElementById('current-player');

const isRedTurn = () => turn % 2 !== 0;

columns.forEach((element, index) => {
    element.addEventListener('click', () => {
        if (isGameWon) return resetButton();

        const row = board[index].indexOf(null);

        if (row === -1) return;

        const player = isRedTurn() ? "red" : "yellow";

        board[index][row] = player;
        document.getElementById(`${element.id}r${row + 1}`).classList.add(`${player}-chip`);

        updateGameStatus();
    });
});

function updateGameStatus() {
    if (checkHorizontal() || checkVertical() || checkDiagonal()) {
        isGameWon = true;
        currentPlayer.innerText = isRedTurn() ? "Reds Won!" : "Yellows Won!";
    } else if (board.every(column => column.every(cell => cell))) {
        currentPlayer.innerText = "The game ended in a draw. All positions are filled.";
    } else {
        turn++;
        currentPlayer.innerText = isRedTurn() ? "Red's Turn" : "Yellow's Turn";
    }

    resetButton();
}

function checkHorizontal() {
    for (let i = 0; i <= 6; i++) {
        for (let j = 0; j <= 2; j++) {
            if (isConnectFour(board[i][j], board[i][j + 1], board[i][j + 2], board[i][j + 3])) {
                return true;
            }
        }
    }
}

function checkVertical() {
    for (let i = 0; i <= 5; i++) {
        for (let j = 0; j <= 3; j++) {
            if (isConnectFour(board[j][i], board[j + 1][i], board[j + 2][i], board[j + 3][i])) {
                return true;
            }
        }
    }
}

function checkDiagonal() {
    for (let i = 0; i <= 3; i++) {
        for (let j = 0; j <= 2; j++) {
            if (isConnectFour(board[i][j], board[i + 1][j + 1], board[i + 2][j + 2], board[i + 3][j + 3])) {
                return true;
            }
        }
    }

    for (let i = 0; i <= 3; i++) {
        for (let j = 5; j >= 3; j--) {
            if (isConnectFour(board[i][j], board[i + 1][j - 1], board[i + 2][j - 2], board[i + 3][j - 3])) {
                return true;
            }
        }
    }
}

function isConnectFour(cell1, cell2, cell3, cell4) {
    return cell1 && cell1 === cell2 && cell1 === cell3 && cell1 === cell4;
}

function resetButton() {
    document.getElementById('button').addEventListener('click', function() {
        this.classList.add('fade-in');
        this.addEventListener('animationend', () => this.classList.remove('fade-in'), { once: true });
        location.reload();
    });
}

