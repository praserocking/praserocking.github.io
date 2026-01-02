/**
 * Modern Tic-Tac-Toe Game
 * Enhanced version with better UX, responsive design, and improved AI
 * Original AI logic by Shenbaga Prasanna (Minimax Algorithm)
 */

class TicTacToeGame {
    constructor() {
        this.symbol = "O"; // Player symbol
        this.aiSymbol = "X"; // AI symbol
        this.mapGrid = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
        this.scores = { x: 0, o: 0, draw: 0 };
        this.gameActive = true;
        this.currentPlayer = "O";
        
        this.initializeGame();
        this.bindEvents();
        this.updateScoreDisplay();
        this.updateGameStatus();
    }

    initializeGame() {
        // Get DOM elements
        this.gameBoard = document.getElementById('game-board');
        this.cells = document.querySelectorAll('.cell');
        this.modal = document.getElementById('game-modal');
        this.modalTitle = document.getElementById('modal-title');
        this.modalMessage = document.getElementById('modal-message');
        this.modalClose = document.getElementById('modal-close');
        this.resetGameBtn = document.getElementById('reset-game');
        this.resetScoresBtn = document.getElementById('reset-scores');
        this.currentPlayerDisplay = document.getElementById('current-player');
        
        // Score elements
        this.xScoreElement = document.getElementById('x-score');
        this.oScoreElement = document.getElementById('o-score');
        this.drawScoreElement = document.getElementById('draw-score');
    }

    bindEvents() {
        // Cell click events
        this.cells.forEach(cell => {
            cell.addEventListener('click', (e) => this.handleCellClick(e));
            // Add keyboard support
            cell.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleCellClick(e);
                }
            });
            // Make cells focusable
            cell.setAttribute('tabindex', '0');
        });

        // Button events
        this.resetGameBtn.addEventListener('click', () => this.resetGame());
        this.resetScoresBtn.addEventListener('click', () => this.resetScores());
        this.modalClose.addEventListener('click', () => this.closeModal());

        // Modal backdrop click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Keyboard navigation for modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('show')) {
                this.closeModal();
            }
        });
    }

    handleCellClick(event) {
        if (!this.gameActive) return;

        const cell = event.target;
        const cellId = cell.id;
        
        if (cell.textContent !== '') return; // Cell already occupied

        const [row, col] = [parseInt(cellId[0]), parseInt(cellId[1])];
        
        // Player move
        this.makeMove(row, col, this.symbol, cell);
        
        if (this.checkWin(this.symbol)) {
            this.endGame('win', 'Congratulations! You won! 🎉');
            this.scores.o++;
            return;
        }
        
        if (this.checkDraw()) {
            this.endGame('draw', "It's a draw! Good game! 🤝");
            this.scores.draw++;
            return;
        }

        // AI move
        this.currentPlayer = this.aiSymbol;
        this.updateGameStatus();
        
        // Add slight delay for better UX
        setTimeout(() => {
            this.aiTurn();
            
            if (this.checkWin(this.aiSymbol)) {
                this.endGame('lose', 'AI wins this round! Try again! 🤖');
                this.scores.x++;
                return;
            }
            
            if (this.checkDraw()) {
                this.endGame('draw', "It's a draw! Good game! 🤝");
                this.scores.draw++;
                return;
            }

            this.currentPlayer = this.symbol;
            this.updateGameStatus();
        }, 300);
    }

    makeMove(row, col, symbol, cellElement) {
        this.mapGrid[row][col] = symbol;
        cellElement.textContent = symbol;
        cellElement.classList.add(symbol.toLowerCase());
        
        // Add animation
        cellElement.style.transform = 'scale(0.8)';
        setTimeout(() => {
            cellElement.style.transform = 'scale(1)';
        }, 150);
    }

    aiTurn() {
        const bestMove = this.getBestMove();
        if (bestMove) {
            const cell = document.getElementById(`${bestMove.row}${bestMove.col}`);
            this.makeMove(bestMove.row, bestMove.col, this.aiSymbol, cell);
        }
    }

    getBestMove() {
        let maxScore = -Infinity;
        let bestMove = null;

        // If board is empty, take center
        if (this.isEmpty()) {
            return { row: 1, col: 1 };
        }

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.mapGrid[i][j] === '-') {
                    const score = this.calculateScore(i, j, this.aiSymbol, this.symbol);
                    if (score > maxScore) {
                        maxScore = score;
                        bestMove = { row: i, col: j };
                    }
                }
            }
        }

        return bestMove;
    }

    calculateScore(x, y, fav, agn) {
        let score = 0;
        this.mapGrid[x][y] = fav;

        // Check rows, columns, and diagonals for favorable moves
        score += this.evaluateLines(fav, agn);

        this.mapGrid[x][y] = '-';
        return score;
    }

    evaluateLines(fav, agn) {
        let score = 0;

        // Check rows
        for (let i = 0; i < 3; i++) {
            score += this.evaluateLine(this.mapGrid[i][0], this.mapGrid[i][1], this.mapGrid[i][2], fav, agn);
        }

        // Check columns
        for (let i = 0; i < 3; i++) {
            score += this.evaluateLine(this.mapGrid[0][i], this.mapGrid[1][i], this.mapGrid[2][i], fav, agn);
        }

        // Check diagonals
        score += this.evaluateLine(this.mapGrid[0][0], this.mapGrid[1][1], this.mapGrid[2][2], fav, agn);
        score += this.evaluateLine(this.mapGrid[0][2], this.mapGrid[1][1], this.mapGrid[2][0], fav, agn);

        return score;
    }

    evaluateLine(a, b, c, fav, agn) {
        let score = 0;

        // Check opponent moves to block FIRST (higher priority)
        if (this.checkEqual(a, b, c, agn)) score -= 1000;  // Block opponent win (highest priority)
        if (this.ifTwo(a, b, c, agn)) score -= 100;        // Block opponent two-in-a-row (very high priority)
        if (this.ifOne(a, b, c, agn)) score -= 1;

        // Check favorable moves (AI)
        if (this.checkEqual(a, b, c, fav)) score += 500;   // AI win (high priority, but less than blocking)
        if (this.ifTwo(a, b, c, fav)) score += 50;         // AI two-in-a-row
        if (this.ifOne(a, b, c, fav)) score += 1;

        return score;
    }

    checkEqual(a, b, c, symbol) {
        return (a === symbol) && (a === b) && (b === c);
    }

    ifTwo(a, b, c, symbol) {
        // Check if exactly 2 positions have the symbol and 1 is empty
        const symbolCount = [a, b, c].filter(cell => cell === symbol).length;
        const emptyCount = [a, b, c].filter(cell => cell === '-').length;
        return symbolCount === 2 && emptyCount === 1;
    }

    ifOne(a, b, c, symbol) {
        // Check if exactly 1 position has the symbol and 2 are empty
        const symbolCount = [a, b, c].filter(cell => cell === symbol).length;
        const emptyCount = [a, b, c].filter(cell => cell === '-').length;
        return symbolCount === 1 && emptyCount === 2;
    }

    checkWin(symbol) {
        // Check rows
        for (let i = 0; i < 3; i++) {
            if (this.checkEqual(this.mapGrid[i][0], this.mapGrid[i][1], this.mapGrid[i][2], symbol)) {
                this.highlightWinningCells([`${i}0`, `${i}1`, `${i}2`]);
                return true;
            }
        }

        // Check columns
        for (let i = 0; i < 3; i++) {
            if (this.checkEqual(this.mapGrid[0][i], this.mapGrid[1][i], this.mapGrid[2][i], symbol)) {
                this.highlightWinningCells([`0${i}`, `1${i}`, `2${i}`]);
                return true;
            }
        }

        // Check diagonals
        if (this.checkEqual(this.mapGrid[0][0], this.mapGrid[1][1], this.mapGrid[2][2], symbol)) {
            this.highlightWinningCells(['00', '11', '22']);
            return true;
        }

        if (this.checkEqual(this.mapGrid[0][2], this.mapGrid[1][1], this.mapGrid[2][0], symbol)) {
            this.highlightWinningCells(['02', '11', '20']);
            return true;
        }

        return false;
    }

    highlightWinningCells(cellIds) {
        cellIds.forEach(id => {
            const cell = document.getElementById(id);
            cell.classList.add('winning');
        });
    }

    checkDraw() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.mapGrid[i][j] === '-') {
                    return false;
                }
            }
        }
        return true;
    }

    isEmpty() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.mapGrid[i][j] !== '-') {
                    return false;
                }
            }
        }
        return true;
    }

    endGame(result, message) {
        this.gameActive = false;
        this.updateScoreDisplay();
        
        // Show modal with result
        setTimeout(() => {
            this.showModal(result, message);
        }, 600);
    }

    showModal(result, message) {
        const titles = {
            win: '🎉 You Won!',
            lose: '🤖 AI Wins!',
            draw: '🤝 Draw!'
        };

        this.modalTitle.textContent = titles[result] || 'Game Over';
        this.modalMessage.textContent = message;
        this.modal.classList.add('show');
        
        // Focus the close button for accessibility
        setTimeout(() => {
            this.modalClose.focus();
        }, 100);
    }

    closeModal() {
        this.modal.classList.remove('show');
        this.resetGame();
    }

    resetGame() {
        this.symbol = "O";
        this.currentPlayer = "O";
        this.mapGrid = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
        this.gameActive = true;

        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winning');
            cell.style.transform = '';
        });

        this.updateGameStatus();
    }

    resetScores() {
        this.scores = { x: 0, o: 0, draw: 0 };
        this.updateScoreDisplay();
    }

    updateScoreDisplay() {
        this.xScoreElement.textContent = this.scores.x;
        this.oScoreElement.textContent = this.scores.o;
        this.drawScoreElement.textContent = this.scores.draw;
    }

    updateGameStatus() {
        const messages = {
            'O': 'Your turn (O)',
            'X': 'AI is thinking... (X)'
        };
        this.currentPlayerDisplay.textContent = messages[this.currentPlayer] || 'Game Over';
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToeGame();
});

// Add service worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
