class IsolaGame {
    constructor() {
        this.board = [];
        this.currentPlayer = 1;
        this.gameState = 'playing'; // 'playing', 'moving', 'removing', 'gameOver'
        this.selectedCell = null;
        this.playerPositions = { 1: null, 2: null };
        this.movePhase = 'move'; // 'move' or 'remove'
        
        this.initializeBoard();
        this.createBoardUI();
        this.bindEvents();
    }

    initializeBoard() {
        // Initialize 7x7 board with all cells as empty (0)
        this.board = Array(7).fill().map(() => Array(7).fill(0));
        
        // Place players at starting positions
        // Player 1 starts at middle of bottom row (6, 3)
        // Player 2 starts at middle of top row (0, 3)
        this.board[6][3] = 1;
        this.board[0][3] = 2;
        
        this.playerPositions[1] = { row: 6, col: 3 };
        this.playerPositions[2] = { row: 0, col: 3 };
    }

    createBoardUI() {
        const gameBoard = document.getElementById('gameBoard');
        gameBoard.innerHTML = '';
        
        for (let row = 0; row < 7; row++) {
            for (let col = 0; col < 7; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                
                this.updateCellDisplay(cell, row, col);
                gameBoard.appendChild(cell);
            }
        }
    }

    updateCellDisplay(cell, row, col) {
        const value = this.board[row][col];
        
        // Remove all classes
        cell.className = 'cell';
        cell.innerHTML = '';
        
        switch (value) {
            case 0: // Empty square
                cell.classList.add('empty');
                break;
            case 1: // Player 1
                cell.classList.add('player1');
                const piece1 = document.createElement('div');
                piece1.className = 'piece player1';
                piece1.textContent = '1';
                cell.appendChild(piece1);
                break;
            case 2: // Player 2
                cell.classList.add('player2');
                const piece2 = document.createElement('div');
                piece2.className = 'piece player2';
                piece2.textContent = '2';
                cell.appendChild(piece2);
                break;
            case -1: // Removed square
                cell.classList.add('removed');
                break;
        }
    }

    bindEvents() {
        const gameBoard = document.getElementById('gameBoard');
        gameBoard.addEventListener('click', (e) => this.handleCellClick(e));
        
        document.getElementById('newGame').addEventListener('click', () => this.newGame());
        document.getElementById('resetGame').addEventListener('click', () => this.resetGame());
    }

    handleCellClick(e) {
        if (!e.target.classList.contains('cell')) return;
        if (this.gameState === 'gameOver') return;
        
        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);
        
        if (this.currentPlayer === 1) {
            this.handlePlayerMove(row, col);
        }
    }

    handlePlayerMove(row, col) {
        if (this.movePhase === 'move') {
            this.handlePlayerPieceMove(row, col);
        } else if (this.movePhase === 'remove') {
            this.handleSquareRemoval(row, col);
        }
    }

    handlePlayerPieceMove(row, col) {
        const playerPos = this.playerPositions[this.currentPlayer];
        
        if (this.isValidMove(playerPos.row, playerPos.col, row, col)) {
            // Move the piece
            this.board[playerPos.row][playerPos.col] = 0;
            this.board[row][col] = this.currentPlayer;
            this.playerPositions[this.currentPlayer] = { row, col };
            
            this.updateBoard();
            this.movePhase = 'remove';
            this.updateStatus(`Player ${this.currentPlayer} - Click on any empty square to remove it`);
            this.highlightRemovableSquares();
        } else {
            this.updateStatus(`Invalid move! Click on an adjacent empty square.`);
        }
    }

    handleSquareRemoval(row, col) {
        if (this.board[row][col] === 0) {
            this.board[row][col] = -1;
            this.updateBoard();
            this.clearHighlights();
            
            // Check if opponent can move
            if (this.canPlayerMove(3 - this.currentPlayer)) {
                this.currentPlayer = 3 - this.currentPlayer; // Switch player (1->2, 2->1)
                this.movePhase = 'move';
                
                if (this.currentPlayer === 2) {
                    this.updateStatus('AI is thinking...');
                    setTimeout(() => this.makeAIMove(), 1000);
                } else {
                    this.updateStatus(`Player ${this.currentPlayer}'s turn - Click to move your piece`);
                }
            } else {
                this.gameState = 'gameOver';
                this.updateStatus(`Player ${this.currentPlayer} wins! Opponent cannot move.`);
            }
        } else {
            this.updateStatus('Invalid removal! Click on an empty yellow square.');
        }
    }

    isValidMove(fromRow, fromCol, toRow, toCol) {
        // Check if destination is within bounds
        if (toRow < 0 || toRow >= 7 || toCol < 0 || toCol >= 7) return false;
        
        // Check if destination is empty
        if (this.board[toRow][toCol] !== 0) return false;
        
        // Check if move is to adjacent cell (including diagonals)
        const rowDiff = Math.abs(toRow - fromRow);
        const colDiff = Math.abs(toCol - fromCol);
        
        return rowDiff <= 1 && colDiff <= 1 && (rowDiff + colDiff > 0);
    }

    canPlayerMove(player) {
        const pos = this.playerPositions[player];
        const moves = [
            [0, 1], [1, 0], [0, -1], [-1, 0],
            [1, -1], [-1, 1], [1, 1], [-1, -1]
        ];
        
        for (let [dr, dc] of moves) {
            const newRow = pos.row + dr;
            const newCol = pos.col + dc;
            
            if (this.isValidMove(pos.row, pos.col, newRow, newCol)) {
                return true;
            }
        }
        return false;
    }

    highlightRemovableSquares() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            
            if (this.board[row][col] === 0) {
                cell.classList.add('possible-move');
            }
        });
    }

    clearHighlights() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.classList.remove('possible-move', 'highlighted');
        });
    }

    updateBoard() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            this.updateCellDisplay(cell, row, col);
        });
    }

    updateStatus(message) {
        document.getElementById('status').textContent = message;
    }

    // AI Logic - Converted from C++ code
    makeAIMove() {
        const aiPlayer = 2;
        const humanPlayer = 1;
        
        // Find best move for AI
        const aiPos = this.playerPositions[aiPlayer];
        const bestMove = this.findBestMove(aiPos.row, aiPos.col, aiPlayer);
        
        if (bestMove) {
            // Move AI piece
            this.board[aiPos.row][aiPos.col] = 0;
            this.board[bestMove.row][bestMove.col] = aiPlayer;
            this.playerPositions[aiPlayer] = { row: bestMove.row, col: bestMove.col };
            
            this.updateBoard();
            
            // AI removes a square (target opponent's mobility)
            const humanPos = this.playerPositions[humanPlayer];
            const removePos = this.findBestRemoval(humanPos.row, humanPos.col);
            
            if (removePos) {
                this.board[removePos.row][removePos.col] = -1;
            }
            
            this.updateBoard();
            
            // Check if human player can still move
            if (this.canPlayerMove(humanPlayer)) {
                this.currentPlayer = humanPlayer;
                this.movePhase = 'move';
                this.updateStatus(`Player ${this.currentPlayer}'s turn - Click to move your piece`);
            } else {
                this.gameState = 'gameOver';
                this.updateStatus('AI wins! You cannot move.');
            }
        }
    }

    findBestMove(row, col, player) {
        const moves = [
            [0, 1], [1, 0], [0, -1], [-1, 0],
            [1, -1], [-1, 1], [1, 1], [-1, -1]
        ];
        
        let bestMove = null;
        let maxScore = -Infinity;
        
        for (let [dr, dc] of moves) {
            const newRow = row + dr;
            const newCol = col + dc;
            
            if (this.isValidMove(row, col, newRow, newCol)) {
                const score = this.calculateMoveScore(newRow, newCol, 3);
                
                if (score > maxScore) {
                    maxScore = score;
                    bestMove = { row: newRow, col: newCol };
                }
            }
        }
        
        return bestMove;
    }

    calculateMoveScore(row, col, depth) {
        const moves = [
            [0, 1], [1, 0], [0, -1], [-1, 0],
            [1, -1], [-1, 1], [1, 1], [-1, -1]
        ];
        
        let score = 0;
        
        // Count immediate valid moves
        for (let [dr, dc] of moves) {
            const newRow = row + dr;
            const newCol = col + dc;
            
            if (this.isValidPosition(newRow, newCol) && this.board[newRow][newCol] === 0) {
                score++;
                
                // Recursive scoring for deeper analysis
                if (depth > 0) {
                    score += this.calculateMoveScore(newRow, newCol, depth - 1);
                }
            }
        }
        
        return score;
    }

    findBestRemoval(opponentRow, opponentCol) {
        const moves = [
            [0, 1], [1, 0], [0, -1], [-1, 0],
            [1, -1], [-1, 1], [1, 1], [-1, -1]
        ];
        
        // Try to remove squares adjacent to opponent to limit their mobility
        for (let [dr, dc] of moves) {
            const removeRow = opponentRow + dr;
            const removeCol = opponentCol + dc;
            
            if (this.isValidPosition(removeRow, removeCol) && this.board[removeRow][removeCol] === 0) {
                return { row: removeRow, col: removeCol };
            }
        }
        
        // If no adjacent squares, find any empty square
        for (let row = 0; row < 7; row++) {
            for (let col = 0; col < 7; col++) {
                if (this.board[row][col] === 0) {
                    return { row, col };
                }
            }
        }
        
        return null;
    }

    isValidPosition(row, col) {
        return row >= 0 && row < 7 && col >= 0 && col < 7;
    }

    newGame() {
        this.currentPlayer = 1;
        this.gameState = 'playing';
        this.movePhase = 'move';
        this.selectedCell = null;
        this.initializeBoard();
        this.createBoardUI();
        this.updateStatus("Player 1's turn - Click to move your piece");
        this.clearHighlights();
    }

    resetGame() {
        this.newGame();
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new IsolaGame();
});
