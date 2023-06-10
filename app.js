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

const allSquares = document.querySelectorAll(".square")
const allPieces = document.querySelectorAll(".pieces")

// allSquares.forEach(square => {
//     square.addEventListener("dragstart", dragStart)
//     square.addEventListener("dragover", dragOver)
//     square.addEventListener("dragdrop", dragDrop)

// })


// function dragStart(event){
//     console.log(event)
//     startPositionNum = event.target.parentNode.getAttribute("number")
//     dragTarget = event.target
// }

// function dragOver(event){
//     event.preventDefault()
//     console.log(event.target)
// }

// function dragDrop(event){
//     event.stopPropagation()
    
//     event.target.append(dragTarget)
// }

// allPieces.forEach(peace =>{
//     allPieces.addEventListener("dragstart", () => { 
//         allPieces.classList.add("dragging")
//     })

//     allPieces.addEventListener("dragend", () => {
//         allPieces.classList.remove("dragging")
//     })
// })

// allSquares.forEach(square => {
//     for(var i = 0; i < allSquares.length; i++){
//         allSquares[i].addEventListener("dragover", event => {
//             event.preventDefault()
//             const draggable = document.querySelector(".dragging")
//             allSquares.push(draggable)
//         })
//     }

// })
