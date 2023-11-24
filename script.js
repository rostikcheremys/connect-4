let player1 = "Player 1";
let player2 = "Player 2";

/*let player1 = prompt("Введіть ім'я першого грався:");
let player2 = prompt("Введіть ім'я другого грався:");

if (player1 === '') {
    player1 = "Player 1";
}

if (player2 === '') {
    player2 = "Player 2";
}*/

// Define the matrix to represent the game board
let board = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null]
];

// Initialize other variables
let turn = 1;

// Checking the winner
function check(player) {
    setTimeout(() => {
        // Check for a winning condition using the 'board' matrix
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j <= 2; j++) {
                if (
                    board[i][j] === player &&
                    board[i][j + 1] === player &&
                    board[i][j + 2] === player &&
                    board[i][j + 3] === player
                ) {
                    alert(`${player} wins`);
                    location.reload();
                }
            }
        }

        for (let i = 0; i <= 5; i++) {
            for (let j = 0; j <= 3; j++) {
                if (
                    board[j][i] === player &&
                    board[j + 1][i] === player &&
                    board[j + 2][i] === player &&
                    board[j + 3][i] === player
                ) {
                    alert(`${player} wins`);
                    location.reload();
                }
            }
        }

        for (let i = 0; i <= 3; i++) {
            for (let j = 0; j <= 2; j++) {
                if (
                    board[i][j] === player &&
                    board[i + 1][j + 1] === player &&
                    board[i + 2][j + 2] === player &&
                    board[i + 3][j + 3] === player
                ) {
                    alert(`${player} wins`);
                    location.reload();
                }
            }
        }

        for (let i = 0; i <= 3; i++) {
            for (let j = 5; j >= 3; j--) {
                if (
                    board[i][j] === player &&
                    board[i + 1][j - 1] === player &&
                    board[i + 2][j - 2] === player &&
                    board[i + 3][j - 3] === player
                ) {
                    alert(`${player} wins`);
                    location.reload();
                }
            }
        }

    }, 200);
}

// Playing
document.querySelectorAll(".column").forEach((e, columnIndex) => {
    e.addEventListener("click", () => {
        const row = board[columnIndex].indexOf(null);

        if (row !== -1) {
            // Update the 'board' matrix
            board[columnIndex][row] = turn % 2 !== 0 ? player1 : player2;

            // Update the visual representation
            document.getElementById(`${e.id}r${row + 1}`).classList.add(turn % 2 !== 0 ? 'red-chip' : 'yellow-chip');

            // Check for a winner
            check(turn % 2 !== 0 ? player1 : player2);

            // Switch turns
            turn++;

            // Update the turn indicator
            document.getElementById("current-player").innerText = turn % 2 !== 0 ?  "Red's Turn" : "Yellow's Turn";
        }
    });
});