const gameBoard = document.querySelector("#gameboard")




const pieces = [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, king, queen, bishop, knight, rook
]

function createBoard(){
    pieces.forEach((startPiece) => {
        const square = document.createElement('div')
        square.classList.add("square")
        square.innerHTML = startPiece
        square.classList.add("beige")
        gameBoard.appendChild(square);
    })


}

createBoard()

