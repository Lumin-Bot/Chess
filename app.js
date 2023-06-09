const gameBoard = document.querySelector("#gameboard")




const pieces = [
    b_rook, b_knight, b_bishop, b_queen, b_king, b_bishop, b_knight, b_rook,
    b_pawn, b_pawn, b_pawn, b_pawn, b_pawn, b_pawn, b_pawn, b_pawn,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    w_pawn, w_pawn, w_pawn, w_pawn, w_pawn, w_pawn, w_pawn, w_pawn,
    w_rook, w_knight, w_bishop, w_king, w_queen, w_bishop, w_knight, w_rook
]

function createBoard(){
    pieces.forEach((startPiece, i) => {
        const square = document.createElement('div')
        square.classList.add("square")
        square.setAttribute("tag", i)
        square.innerHTML = startPiece

        let row = Math.floor((63 - i) / 8) + 1

        if(row % 2 === 0){
            square.classList.add(i % 2 == 0 ? "beige" : "brown")
        } 
        else{
            square.classList.add(i % 2 == 0 ? "brown" : "beige")
        }

        gameBoard.appendChild(square);
    })


}

createBoard()

