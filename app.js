const gameBoard = document.querySelector("#gameboard")
const king = '<div class="piece" id="king">&#9812</div>'


const pieces = [king]

function createBoard(){
    pieces.forEach((startPiece) => {
        const square = document.createElement('div')
        square.classList.add("square")
        square.innerHTML = pieces
        square.classList.add("beige")
        gameBoard.appendChild(square);
    })


}

createBoard()

