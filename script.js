let board = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null]
];

let turn = 1;
let isGameWon = false;
let isCheckWins = false;

function check(player) {
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j <= 2; j++) {
            if ( board[i][j] === player && board[i][j + 1] === player && board[i][j + 2] === player && board[i][j + 3] === player) {
                isCheckWins = true;
            }
        }
    }

    for (let i = 0; i <= 5; i++) {
        for (let j = 0; j <= 3; j++) {
            if (board[j][i] === player && board[j + 1][i] === player && board[j + 2][i] === player && board[j + 3][i] === player) {
                isCheckWins = true;
            }
        }
    }

    for (let i = 0; i <= 3; i++) {
        for (let j = 0; j <= 2; j++) {
            if (board[i][j] === player && board[i + 1][j + 1] === player && board[i + 2][j + 2] === player && board[i + 3][j + 3] === player) {
                isCheckWins = true;
            }
        }
    }

    for (let i = 0; i <= 3; i++) {
        for (let j = 5; j >= 3; j--) {
            if (board[i][j] === player && board[i + 1][j - 1] === player && board[i + 2][j - 2] === player && board[i + 3][j - 3] === player) {
                isCheckWins = true;
            }
        }
    }
}

function resetButton() {
    document.getElementById('button').addEventListener('click', function() {
        location.reload();
    });
}

document.querySelectorAll(".column").forEach((element, columnIndex) => {
    element.addEventListener("click", () => {
        if (isGameWon) {
            return resetButton();
        }

        const row = board[columnIndex].indexOf(null);

        if (row === -1) {
            return;
        }

        board[columnIndex][row] = turn % 2 !== 0 ? "Player 1" : "Player 2";

        document.getElementById(`${element.id}r${row + 1}`).classList.add(turn % 2 !== 0 ? 'red-chip' : 'yellow-chip');

        check(turn % 2 !== 0 ? "Player 1" : "Player 2");

        if (board.every(column => column.every(cell => cell !== null))) {
            document.getElementById('current-player').innerText = "The game ended in a draw. All positions are filled."
        } else if (isCheckWins === false) {
            turn++;
            document.getElementById('current-player').innerText = turn % 2 !== 0 ?  "Red's Turn" : "Yellow's Turn";
            resetButton();
        } else {
            isGameWon = true;
            return document.getElementById('current-player').innerText = turn % 2 !== 0 ? "Reds Won!" : "Yellow Won!";
        }
    });
});

