const gameBoard = document.querySelector("#gameboard")
const playerDisplay = document.querySelector("#player")
const infoDisplay = document.querySelector("#info")

let playerTurn = "white"
playerDisplay.textContent = "white"

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
reverseIds()

const allSquares = document.querySelectorAll(".square")
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
    const correctPlayerTurn = dragTarget.firstChild.classList.contains(playerTurn)
    const taken = event.target.classList.contains("piece")
    const opponentTurn = playerTurn === "black" ? "white" : "black"
    const opponentPieceTake = event.target.firstChild?.classList.contains(opponentTurn)

    if(correctPlayerTurn){
        if(opponentPieceTake){ // && valid 
            event.target.parentNode.append(dragTarget)
            event.target.remove()
            changeTurn()
            return
        }
    }

    if(taken){
        infoDisplay.textContent = "Invalid move!"
        setTimeout(() => {
            infoDisplay.textContent = ""
        }, 2000);
        return
    }
 
}


function changeTurn(){
    if(playerTurn === "white"){
        revertIds()
        playerTurn = "black"
        playerDisplay.textContent = "black"
    } else{
        playerTurn = "white"
        reverseIds()
        playerDisplay.textContent = "white"
    }
}

function reverseIds(){
    const squares = document.querySelectorAll(".square")
    squares.forEach((square, i) => 
        square.setAttribute("number", 63 - i))
}

function revertIds(){
    const squares = document.querySelectorAll(".square")
    squares.forEach((square, i) =>
        square.setAttribute("number", i))
}

