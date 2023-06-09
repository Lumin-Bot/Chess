const gameBoard = document.querySelector("#gameboard")
const king = '<div class="piece" id="king">&#9812</div>'
const queen = '<div class="peice" id="queen"></div>'
const bishop = '<div class="peice" id="bishop">&#9815</div>'
const knight = '<div class="peice" id="knight">&#9816</div>'
const rook = '<div class="peice" id="rook">&#9814</div>'
const pawn = '<div class="peice" id="pawn">&#9817</div>'



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
        //square.innerHTML = pieces
        square.classList.add("beige")
        gameBoard.appendChild(square);
    })


}

createBoard()

