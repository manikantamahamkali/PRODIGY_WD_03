let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(cell) {
    const cellIndex = parseInt(cell.id.split('-')[1]);
    if (board[cellIndex] === '' && gameActive) {
        board[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        if (checkWin()) {
            gameActive = false;
            document.getElementById('status').textContent = `Player ${currentPlayer} wins!`;
        } else if (board.every(cell => cell !== '')) {
            gameActive = false;
            document.getElementById('status').textContent = 'It\'s a draw!';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return board[index] === currentPlayer;
        });
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
    document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;
}

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', () => handleCellClick(cell));
});
