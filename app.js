const gameBoard = document.querySelector("#gameboard")
let startPositionNum 
let dragTarget



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
    pieces.forEach((startPiece, i) => {
        const square = document.createElement('div')
        square.classList.add("square")
        square.innerHTML = startPiece
        
        square.setAttribute("number", i)
        square.firstChild && square.firstChild.setAttribute('draggable', true)


        let row = Math.floor((63 - i) / 8) + 1

        if(row % 2 === 0){
            square.classList.add(i % 2 == 0 ? "beige" : "brown")
        } 
        else{
            square.classList.add(i % 2 == 0 ? "brown" : "beige")
        }

        gameBoard.appendChild(square);

        if(i <= 15){
            square.firstChild.firstChild.classList.add("black")
        }
        if(i >= 48){
            square.firstChild.firstChild.classList.add("white")
        }
    })
}

createBoard()

const allSquares = document.querySelectorAll("#gameboard .square")
const allPieces = document.querySelectorAll(".piece")


allSquares.forEach(square => {
    square.addEventListener("dragstart", dragStart)
    square.addEventListener("dragover", dragOver)
    square.addEventListener("drop", dragDrop)

})


function dragStart(event){
    startPositionNum = event.target.parentNode.getAttribute("number")
    dragTarget = event.target
 }

function dragOver(event){
    event.preventDefault()
}

function dragDrop(event){
    event.stopPropagation()
    console.log(event.target)


    //event.target.parentNode.append(dragTarget)
    //event.target.remove()
    //event.target.append(dragTarget)
    
}

