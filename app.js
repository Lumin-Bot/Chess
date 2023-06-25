const gameBoard = document.querySelector("#gameboard")
const playerDisplay = document.querySelector("#player")
const infoDisplay = document.querySelector("#info")

let playerTurn = "white"
playerDisplay.textContent = "white"

let startPositionId 
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
    startPositionId = event.target.parentNode.getAttribute("number")
    dragTarget = event.target
 }

function dragOver(event){
    event.preventDefault()
}

function dragDrop(event){
    event.stopPropagation()
    const correctPlayerTurn = dragTarget.firstChild.classList.contains(playerTurn)
    const taken = event.target.classList.contains("piece")
    const valid = checkValid(event.target)
    const opponentTurn = playerTurn === "black" ? "white" : "black"
    const opponentPieceTake = event.target.firstChild?.classList.contains(opponentTurn)

    if(correctPlayerTurn){
        if(opponentPieceTake && valid ){
            event.target.parentNode.append(dragTarget)
            event.target.remove()
            changeTurn()
            return
        }
    }

    if(taken && !opponentPieceTake){
        infoDisplay.textContent = "Invalid move!"
        setTimeout(() => {
            infoDisplay.textContent = ""
        }, 2000);
        return
    }

    if(valid){
        event.target.append(dragTarget)
        changeTurn()
        return
    }
 
}


function checkValid(target){
    const targetId = Number(target.getAttribute("number")) || 
        Number(target.parentNode.getAttribute("number"))

    const startId = Number(startPositionId)
    const piece = dragTarget.id
    console.log(targetId)
    console.log(startId)
    console.log(piece)

    switch(piece){
        case "pawn":
            const startRow = [8, 9, 10, 11, 12, 13, 14, 15]
            if(startRow.includes(startId) && 
                startId + 8 * 2 === targetId || 
                startId + 8 === targetId || 
                startId + 8 - 1 === targetId && 
                document.querySelector(`[number="${startId + 8 - 1}"]`).firstChild ||
                startId + 8 + 1 === targetId && 
                document.querySelector(`[number="${startId + 8 + 1}"]`).firstChild
                ){
                return true
            }
            break
        
        case "knight":
            break
        
        case "bishop":
            break

        case "rook":
            break

        case "queen":
            break

        case "king":
            break
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

