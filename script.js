const gameBoard = (() => {
    const board = new Array(9).fill(null);
    const resultDisplay = document.querySelector('.result');
    document.querySelectorAll('.cell').forEach((e, index) => {
        e.setAttribute('data-index', index);
        e.addEventListener('click', () => {
            game.gameStatus();
            if(game.gameOver === false && board[index] === null){
                board[index] = game.currentPlayer.sign;
                e.textContent = board[index];
                game.gameStatus();
                game.nextTurn();
            if(game.gameOver === true) {
                resultDisplay.textContent = game.result;
            }
        }
        })
    }) 
    
    const restart = document.querySelector('.restart');
    restart.addEventListener('click', () => {
        board.forEach((item, index) => {
            board[index] = null;
        })
        document.querySelectorAll('.cell').forEach((e, index) => {
            e.textContent = board[index];
        })
        game.gameOver = false;
    })
    
    return {board};

})();

const player = (name, sign) => {
    return {name, sign};
}

const game = (() => {

    const playerOne = player("Player One", 'x');
    const playerTwo = player("Player Two", 'o');

    let currentPlayer = playerOne;
    let gameOver = false;
    let result = null;

    const winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    //0,1,2 / 3,4,5 / 6,7,8/ 0,3,6/ 1,4,7 / 2,5,8 / 0,4,8 / 2,4,6 / 
    function gameStatus () {
        winningCombinations.forEach((a) => {
            if(gameBoard.board[a[0]] === 'x' && gameBoard.board[a[1]] === 'x' && gameBoard.board[a[2]] === 'x') {
                this.gameOver = true;
                this.result = 'X wins the game!';
            }

            if(gameBoard.board[a[0]] === 'o' && gameBoard.board[a[1]] === 'o' && gameBoard.board[a[2]] === 'o') {
                this.gameOver = true;
                this.result = 'O wins the game';
            }

            if(!gameBoard.board.some(element => element === null) && result === null) {
                this.gameOver = true;
                this.tieGame = true; 
                this.result = 'Draw';
            }
        })
    }

    function nextTurn () {
        if(this.currentPlayer === playerOne) {
            this.currentPlayer = playerTwo;
        }

        else {
            this.currentPlayer = playerOne; 
        }
    }

    return {gameStatus, nextTurn, currentPlayer, gameOver, };
})();




/*

if game isn't over
allow player to select space
check to see if game is over
i

*/