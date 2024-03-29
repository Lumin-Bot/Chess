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
    const containsPiece = event.target.classList.contains("piece")
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

    if(containsPiece && !opponentPieceTake){
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
            if(startId + 8 * 2 - 1 === targetId ||
                startId + 8 * 2 + 1 === targetId ||
                startId + 8 - 2 === targetId ||
                startId + 8 + 2 === targetId ||
                startId - 8 * 2 - 1 === targetId ||
                startId - 8 * 2 + 1 === targetId ||
                startId - 8 - 2 === targetId ||
                startId - 8 + 2 === targetId 
            ){
                return true
            }
            break
        
        case "bishop":
            if(startId + 8 + 1 === targetId ||
                startId + 8 * 2 + 2  === targetId &&
                !document.querySelector(`[number="${startId + 8 + 1}"]`).firstChild ||
                startId + 8 * 3 + 3  === targetId &&
                !document.querySelector(`[number="${startId + 8 + 1}"]`).firstChild &&
                !document.querySelector(`[number="${startId + 8 * 2 + 2}"]`).firstChild ||
                startId + 8 * 4 + 4  === targetId &&
                !document.querySelector(`[number="${startId + 8 + 1}"]`).firstChild &&
                !document.querySelector(`[number="${startId + 8 * 2 + 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 3 + 3}"]`).firstChild ||
                startId + 8 * 5 + 5  === targetId &&
                !document.querySelector(`[number="${startId + 8 + 1}"]`).firstChild &&
                !document.querySelector(`[number="${startId + 8 * 2 + 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 3 + 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 4 + 4}"]`).firstChild ||
                startId + 8 * 6 + 6  === targetId &&
                !document.querySelector(`[number="${startId + 8 + 1}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 2 + 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 3 + 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 4 + 4}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 5 + 5}"]`).firstChild ||
                startId + 8 * 7 + 7  === targetId &&
                !document.querySelector(`[number="${startId + 8 + 1}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 2 + 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 3 + 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 4 + 4}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 5 + 5}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 6 + 6}"]`).firstChild ||

                startId - 8 - 1 === targetId ||
                startId - 8 * 2 - 2  === targetId &&
                !document.querySelector(`[number="${startId - 8 - 1}"]`).firstChild ||
                startId - 8 * 3 - 3  === targetId &&
                !document.querySelector(`[number="${startId - 8 - 1}"]`).firstChild &&
                !document.querySelector(`[number="${startId - 8 * 2 - 2}"]`).firstChild ||
                startId - 8 * 4 - 4  === targetId &&
                !document.querySelector(`[number="${startId - 8 - 1}"]`).firstChild &&
                !document.querySelector(`[number="${startId - 8 * 2 - 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 3 - 3}"]`).firstChild ||
                startId - 8 * 5 - 5  === targetId &&
                !document.querySelector(`[number="${startId - 8 - 1}"]`).firstChild &&
                !document.querySelector(`[number="${startId - 8 * 2 - 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 3 - 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 4 - 4}"]`).firstChild ||
                startId - 8 * 6 - 6  === targetId &&
                !document.querySelector(`[number="${startId - 8 - 1}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 2 - 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 3 - 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 4 - 4}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 5 - 5}"]`).firstChild ||
                startId - 8 * 7 - 7  === targetId &&
                !document.querySelector(`[number="${startId - 8 - 1}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 2 - 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 3 - 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 4 - 4}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 5 - 5}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 6 - 6}"]`).firstChild || 

                startId - 8 + 1 === targetId ||
                startId - 8 * 2 + 2  === targetId &&
                !document.querySelector(`[number="${startId - 8 + 1}"]`).firstChild ||
                startId - 8 * 3 + 3  === targetId &&
                !document.querySelector(`[number="${startId - 8 + 1}"]`).firstChild &&
                !document.querySelector(`[number="${startId - 8 * 2 + 2}"]`).firstChild ||
                startId - 8 * 4 + 4  === targetId &&
                !document.querySelector(`[number="${startId - 8 + 1}"]`).firstChild &&
                !document.querySelector(`[number="${startId - 8 * 2 + 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 3 + 3}"]`).firstChild ||
                startId - 8 * 5 + 5  === targetId &&
                !document.querySelector(`[number="${startId - 8 + 1}"]`).firstChild &&
                !document.querySelector(`[number="${startId - 8 * 2 + 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 3 + 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 4 + 4}"]`).firstChild ||
                startId - 8 * 6 + 6  === targetId &&
                !document.querySelector(`[number="${startId - 8 + 1}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 2 + 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 3 + 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 4 + 4}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 5 + 5}"]`).firstChild ||
                startId - 8 * 7 + 7  === targetId &&
                !document.querySelector(`[number="${startId - 8 + 1}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 2 + 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 3 + 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 4 + 4}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 5 + 5}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 6 + 6}"]`).firstChild || 

                startId + 8 - 1 === targetId ||
                startId + 8 * 2 - 2  === targetId &&
                !document.querySelector(`[number="${startId + 8 - 1}"]`).firstChild ||
                startId + 8 * 3 - 3  === targetId &&
                !document.querySelector(`[number="${startId + 8 - 1}"]`).firstChild &&
                !document.querySelector(`[number="${startId + 8 * 2 - 2}"]`).firstChild ||
                startId + 8 * 4 - 4  === targetId &&
                !document.querySelector(`[number="${startId + 8 - 1}"]`).firstChild &&
                !document.querySelector(`[number="${startId + 8 * 2 - 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 3 - 3}"]`).firstChild ||
                startId + 8 * 5 - 5  === targetId &&
                !document.querySelector(`[number="${startId + 8 - 1}"]`).firstChild &&
                !document.querySelector(`[number="${startId + 8 * 2 - 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 3 - 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 4 - 4}"]`).firstChild ||
                startId + 8 * 6 - 6  === targetId &&
                !document.querySelector(`[number="${startId + 8 - 1}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 2 - 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 3 - 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 4 - 4}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 5 - 5}"]`).firstChild ||
                startId + 8 * 7 - 7  === targetId &&
                !document.querySelector(`[number="${startId + 8 - 1}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 2 - 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 3 - 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 4 - 4}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 5 - 5}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 6 - 6}"]`).firstChild
            ){
                return true
            }
            break

        case "rook":
            if(startId + 8 === targetId ||
                startId + 8 * 2 === targetId && 
                !document.querySelector(`[number="${startId + 8}"]`).firstChild ||
                startId + 8 * 3 === targetId &&
                !document.querySelector(`[number="${startId + 8}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 2}"]`).firstChild ||
                startId + 8 * 4 === targetId && 
                !document.querySelector(`[number="${startId + 8}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 3}"]`).firstChild ||
                startId + 8 * 5 === targetId && 
                !document.querySelector(`[number="${startId + 8}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 4}"]`).firstChild ||
                startId + 8 * 6 === targetId && 
                !document.querySelector(`[number="${startId + 8}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 4}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 5}"]`).firstChild ||
                startId + 8 * 7 === targetId && 
                !document.querySelector(`[number="${startId + 8}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 4}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 5}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 6}"]`).firstChild ||

                startId - 8 === targetId ||
                startId - 8 * 2 === targetId && 
                !document.querySelector(`[number="${startId - 8}"]`).firstChild ||
                startId - 8 * 3 === targetId &&
                !document.querySelector(`[number="${startId - 8}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 2}"]`).firstChild ||
                startId - 8 * 4 === targetId && 
                !document.querySelector(`[number="${startId - 8}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 3}"]`).firstChild ||
                startId - 8 * 5 === targetId && 
                !document.querySelector(`[number="${startId - 8}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 4}"]`).firstChild ||
                startId - 8 * 6 === targetId && 
                !document.querySelector(`[number="${startId - 8}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 4}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 5}"]`).firstChild ||
                startId - 8 * 7 === targetId && 
                !document.querySelector(`[number="${startId - 8}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 4}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 5}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 6}"]`).firstChild ||

                startId + 1 === targetId||
                startId + 2 === targetId && 
                !document.querySelector(`[number="${startId + 1}"]`).firstChild ||
                startId + 3 === targetId &&
                !document.querySelector(`[number="${startId + 1}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 2}"]`).firstChild ||
                startId + 4 === targetId && 
                !document.querySelector(`[number="${startId + 1}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 3}"]`).firstChild ||
                startId + 5 === targetId && 
                !document.querySelector(`[number="${startId + 1}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 4}"]`).firstChild ||
                startId + 6 === targetId && 
                !document.querySelector(`[number="${startId + 1}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 4}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 5}"]`).firstChild ||
                startId + 7 === targetId && 
                !document.querySelector(`[number="${startId + 1}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 4}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 5}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 6}"]`).firstChild ||

                startId - 1 === targetId||
                startId - 2 === targetId && 
                !document.querySelector(`[number="${startId - 1}"]`).firstChild ||
                startId - 3 === targetId &&
                !document.querySelector(`[number="${startId - 1}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 2}"]`).firstChild ||
                startId - 4 === targetId && 
                !document.querySelector(`[number="${startId - 1}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 3}"]`).firstChild ||
                startId - 5 === targetId && 
                !document.querySelector(`[number="${startId - 1}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 4}"]`).firstChild ||
                startId - 6 === targetId && 
                !document.querySelector(`[number="${startId - 1}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 4}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 5}"]`).firstChild ||
                startId - 7 === targetId && 
                !document.querySelector(`[number="${startId - 1}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 4}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 5}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 6}"]`).firstChild 
                
                
            ){
                return true
            }
            break

        case "queen":
            if(startId + 8 + 1 === targetId ||
                startId + 8 * 2 + 2  === targetId &&
                !document.querySelector(`[number="${startId + 8 + 1}"]`).firstChild ||
                startId + 8 * 3 + 3  === targetId &&
                !document.querySelector(`[number="${startId + 8 + 1}"]`).firstChild &&
                !document.querySelector(`[number="${startId + 8 * 2 + 2}"]`).firstChild ||
                startId + 8 * 4 + 4  === targetId &&
                !document.querySelector(`[number="${startId + 8 + 1}"]`).firstChild &&
                !document.querySelector(`[number="${startId + 8 * 2 + 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 3 + 3}"]`).firstChild ||
                startId + 8 * 5 + 5  === targetId &&
                !document.querySelector(`[number="${startId + 8 + 1}"]`).firstChild &&
                !document.querySelector(`[number="${startId + 8 * 2 + 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 3 + 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 4 + 4}"]`).firstChild ||
                startId + 8 * 6 + 6  === targetId &&
                !document.querySelector(`[number="${startId + 8 + 1}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 2 + 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 3 + 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 4 + 4}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 5 + 5}"]`).firstChild ||
                startId + 8 * 7 + 7  === targetId &&
                !document.querySelector(`[number="${startId + 8 + 1}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 2 + 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 3 + 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 4 + 4}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 5 + 5}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 6 + 6}"]`).firstChild ||

                startId - 8 - 1 === targetId ||
                startId - 8 * 2 - 2  === targetId &&
                !document.querySelector(`[number="${startId - 8 - 1}"]`).firstChild ||
                startId - 8 * 3 - 3  === targetId &&
                !document.querySelector(`[number="${startId - 8 - 1}"]`).firstChild &&
                !document.querySelector(`[number="${startId - 8 * 2 - 2}"]`).firstChild ||
                startId - 8 * 4 - 4  === targetId &&
                !document.querySelector(`[number="${startId - 8 - 1}"]`).firstChild &&
                !document.querySelector(`[number="${startId - 8 * 2 - 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 3 - 3}"]`).firstChild ||
                startId - 8 * 5 - 5  === targetId &&
                !document.querySelector(`[number="${startId - 8 - 1}"]`).firstChild &&
                !document.querySelector(`[number="${startId - 8 * 2 - 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 3 - 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 4 - 4}"]`).firstChild ||
                startId - 8 * 6 - 6  === targetId &&
                !document.querySelector(`[number="${startId - 8 - 1}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 2 - 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 3 - 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 4 - 4}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 5 - 5}"]`).firstChild ||
                startId - 8 * 7 - 7  === targetId &&
                !document.querySelector(`[number="${startId - 8 - 1}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 2 - 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 3 - 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 4 - 4}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 5 - 5}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 6 - 6}"]`).firstChild || 

                startId - 8 + 1 === targetId ||
                startId - 8 * 2 + 2  === targetId &&
                !document.querySelector(`[number="${startId - 8 + 1}"]`).firstChild ||
                startId - 8 * 3 + 3  === targetId &&
                !document.querySelector(`[number="${startId - 8 + 1}"]`).firstChild &&
                !document.querySelector(`[number="${startId - 8 * 2 + 2}"]`).firstChild ||
                startId - 8 * 4 + 4  === targetId &&
                !document.querySelector(`[number="${startId - 8 + 1}"]`).firstChild &&
                !document.querySelector(`[number="${startId - 8 * 2 + 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 3 + 3}"]`).firstChild ||
                startId - 8 * 5 + 5  === targetId &&
                !document.querySelector(`[number="${startId - 8 + 1}"]`).firstChild &&
                !document.querySelector(`[number="${startId - 8 * 2 + 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 3 + 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 4 + 4}"]`).firstChild ||
                startId - 8 * 6 + 6  === targetId &&
                !document.querySelector(`[number="${startId - 8 + 1}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 2 + 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 3 + 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 4 + 4}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 5 + 5}"]`).firstChild ||
                startId - 8 * 7 + 7  === targetId &&
                !document.querySelector(`[number="${startId - 8 + 1}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 2 + 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 3 + 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 4 + 4}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 5 + 5}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 6 + 6}"]`).firstChild || 

                startId + 8 - 1 === targetId ||
                startId + 8 * 2 - 2  === targetId &&
                !document.querySelector(`[number="${startId + 8 - 1}"]`).firstChild ||
                startId + 8 * 3 - 3  === targetId &&
                !document.querySelector(`[number="${startId + 8 - 1}"]`).firstChild &&
                !document.querySelector(`[number="${startId + 8 * 2 - 2}"]`).firstChild ||
                startId + 8 * 4 - 4  === targetId &&
                !document.querySelector(`[number="${startId + 8 - 1}"]`).firstChild &&
                !document.querySelector(`[number="${startId + 8 * 2 - 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 3 - 3}"]`).firstChild ||
                startId + 8 * 5 - 5  === targetId &&
                !document.querySelector(`[number="${startId + 8 - 1}"]`).firstChild &&
                !document.querySelector(`[number="${startId + 8 * 2 - 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 3 - 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 4 - 4}"]`).firstChild ||
                startId + 8 * 6 - 6  === targetId &&
                !document.querySelector(`[number="${startId + 8 - 1}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 2 - 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 3 - 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 4 - 4}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 5 - 5}"]`).firstChild ||
                startId + 8 * 7 - 7  === targetId &&
                !document.querySelector(`[number="${startId + 8 - 1}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 2 - 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 3 - 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 4 - 4}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 5 - 5}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 6 - 6}"]`).firstChild ||

                // rook

                startId + 8 === targetId ||
                startId + 8 * 2 === targetId && 
                !document.querySelector(`[number="${startId + 8}"]`).firstChild ||
                startId + 8 * 3 === targetId &&
                !document.querySelector(`[number="${startId + 8}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 2}"]`).firstChild ||
                startId + 8 * 4 === targetId && 
                !document.querySelector(`[number="${startId + 8}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 3}"]`).firstChild ||
                startId + 8 * 5 === targetId && 
                !document.querySelector(`[number="${startId + 8}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 4}"]`).firstChild ||
                startId + 8 * 6 === targetId && 
                !document.querySelector(`[number="${startId + 8}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 4}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 5}"]`).firstChild ||
                startId + 8 * 7 === targetId && 
                !document.querySelector(`[number="${startId + 8}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 4}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 5}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 8 * 6}"]`).firstChild ||

                startId - 8 === targetId ||
                startId - 8 * 2 === targetId && 
                !document.querySelector(`[number="${startId - 8}"]`).firstChild ||
                startId - 8 * 3 === targetId &&
                !document.querySelector(`[number="${startId - 8}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 2}"]`).firstChild ||
                startId - 8 * 4 === targetId && 
                !document.querySelector(`[number="${startId - 8}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 3}"]`).firstChild ||
                startId - 8 * 5 === targetId && 
                !document.querySelector(`[number="${startId - 8}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 4}"]`).firstChild ||
                startId - 8 * 6 === targetId && 
                !document.querySelector(`[number="${startId - 8}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 4}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 5}"]`).firstChild ||
                startId - 8 * 7 === targetId && 
                !document.querySelector(`[number="${startId - 8}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 4}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 5}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 8 * 6}"]`).firstChild ||

                startId + 1 === targetId||
                startId + 2 === targetId && 
                !document.querySelector(`[number="${startId + 1}"]`).firstChild ||
                startId + 3 === targetId &&
                !document.querySelector(`[number="${startId + 1}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 2}"]`).firstChild ||
                startId + 4 === targetId && 
                !document.querySelector(`[number="${startId + 1}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 3}"]`).firstChild ||
                startId + 5 === targetId && 
                !document.querySelector(`[number="${startId + 1}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 4}"]`).firstChild ||
                startId + 6 === targetId && 
                !document.querySelector(`[number="${startId + 1}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 4}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 5}"]`).firstChild ||
                startId + 7 === targetId && 
                !document.querySelector(`[number="${startId + 1}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 4}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 5}"]`).firstChild && 
                !document.querySelector(`[number="${startId + 6}"]`).firstChild ||

                startId - 1 === targetId||
                startId - 2 === targetId && 
                !document.querySelector(`[number="${startId - 1}"]`).firstChild ||
                startId - 3 === targetId &&
                !document.querySelector(`[number="${startId - 1}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 2}"]`).firstChild ||
                startId - 4 === targetId && 
                !document.querySelector(`[number="${startId - 1}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 3}"]`).firstChild ||
                startId - 5 === targetId && 
                !document.querySelector(`[number="${startId - 1}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 4}"]`).firstChild ||
                startId - 6 === targetId && 
                !document.querySelector(`[number="${startId - 1}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 4}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 5}"]`).firstChild ||
                startId - 7 === targetId && 
                !document.querySelector(`[number="${startId - 1}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 2}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 3}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 4}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 5}"]`).firstChild && 
                !document.querySelector(`[number="${startId - 6}"]`).firstChild 

            ){
                return true
            }
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

