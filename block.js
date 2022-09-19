import {nextKeyframeDirection} from './input.js';
import {boardArray, GRID_NUMBER} from './board.js'


let currentXPivot;
let currentYPivot;

let IBlock = [[{x: -1, y: 0}, {x: 0, y: 0}, { x: 1, y: 0}, {x: 2, y: 0}], [{ x: 0, y: -2}, {x: 0, y: -1 }, { x: 0, y: 0}, {x: 0, y: 1 }]];
let IPivot = {x: 2, y: 10};
let TBlock = [[{x: -1, y: 0}, {x: 0, y: 0}, { x: 0, y: -1}, {x: 0, y: 1}], [{ x: -1, y: 0}, {x: -1, y: -1 }, { x: 0, y: -1}, {x: -2, y: -1 }]];
let TPivot = {x: 2, y: 10};


let blocksType = [IBlock, TBlock]
let pivots = [IPivot, TPivot]


let currentBlockStructure;
let currentBlockReference;

let theboard = document.querySelector(".grid-container");

let rotate = false;

window.addEventListener("keydown", (event) => {
    if(event.key === "w"){
        rotate = true;
    }
})

function rotateBlock(){
    let elements = document.querySelectorAll('.moving-block');
    elements.forEach(element => {
        boardArray[element.style.gridRowStart - 1][element.style.gridColumnStart] = 0;
        element.remove()
    })
    generateNewBlock(theboard, boardArray, 1);
}


export function generateNewBlock(board, boardArray, rotate){
    if(!rotate){
        let blockNumber = Math.floor(Math.random() * blocksType.length);
        currentBlockStructure = blocksType[blockNumber][0];
        currentXPivot = pivots[0].x;
        currentYPivot = pivots[0].y;
    }else{
        currentBlockStructure = blocksType[1][1];
    }

    currentBlockStructure.forEach(blockPosition => {
        let newBlock = document.createElement("div");
        newBlock.style.gridRowStart = blockPosition.x + currentXPivot;
        newBlock.style.gridColumnStart =  blockPosition.y + currentYPivot;
        newBlock.style.backgroundColor =  "green";
        newBlock.classList.add('moving-block');
        board.appendChild(newBlock);
        boardArray[blockPosition.x + currentXPivot - 1][blockPosition.y + currentYPivot - 1] = 10;
    });
    currentBlockReference = document.querySelectorAll(".moving-block");
}

function stopTheBlock(elements, boardArray){
    elements.forEach(element => {
        element.classList.remove("moving-block")
        element.classList.add("still-block")
        boardArray[element.style.gridRowStart - 1][element.style.gridColumnStart - 1] = 1;
    })
}

function canMoveDown(block, boardArray, board, blockDirection){
    for(let element of block){
        if(+element.style.gridRowStart + 1 > GRID_NUMBER || boardArray[element.style.gridRowStart][element.style.gridColumnStart - 1] === 1){
            blockDirection.down = false;
            stopTheBlock(block, boardArray);
            generateNewBlock(board, boardArray);
            break;
        }else{
            blockDirection.down = true;
        }
    }
}

function canMoveLeft(block, boardArray, board, blockDirection){
    for(let element of block){
        if((+element.style.gridColumnStart - 1 > 0 && +element.style.gridRowStart + 1 < GRID_NUMBER && (element.style.gridColumnStart - 1 > 0 ? boardArray[element.style.gridRowStart][element.style.gridColumnStart - 2] !==1 : true))){
            blockDirection.left = true;

        } else {
            blockDirection.left = false;
            canMoveDown(block, boardArray, board, blockDirection);
            break;
        }
    }
}

function canMoveRight(block, boardArray, board, blockDirection){
    for(let element of block){
        if((+element.style.gridColumnStart < GRID_NUMBER && +element.style.gridRowStart + 1 < GRID_NUMBER && (element.style.gridRowStart < GRID_NUMBER ? boardArray[element.style.gridRowStart][element.style.gridColumnStart] !==1 : true))){
            blockDirection.right = true;
        }else{
            blockDirection.right = false;
            canMoveDown(block, boardArray, board, blockDirection);
            break;
        }
    }
}

function setMovingDirection(block, boardArray, board, blockDirection){
    if(nextKeyframeDirection === 0){
        canMoveDown(block, boardArray, board, blockDirection);
    }else if(nextKeyframeDirection === 1){
        canMoveLeft(block, boardArray, board, blockDirection);
    }else if(nextKeyframeDirection ===2){
        canMoveRight(block, boardArray, board, blockDirection);
    }
}

function rowCompleted(){
    let stillRows = document.querySelectorAll(".still-block");
    let completedRowNumber = 0;
    let isRowCompleted = false;

    for(let i = 0; i<= boardArray.length - 1; i++){
        let rowComp = boardArray[i].every(x => x === 1);
        if(rowComp){
            completedRowNumber = i;
            isRowCompleted = true;

        }
    }
    if(isRowCompleted){
        console.log(boardArray)
        console.log(boardArray[completedRowNumber])
        boardArray[completedRowNumber] = boardArray[completedRowNumber].map(x => {
            return 0;
        })
        for(let i = completedRowNumber - 1; i >= 0; i--){
            for(let j = boardArray.length - 1; j >= 0; j--){
                if (boardArray[i][j] === 1){
                    boardArray[i][j] = 0 
                    boardArray[i + 1][j] = 1;
                }
            }
        }

        console.log(boardArray[completedRowNumber])
        stillRows.forEach(x => {
            if (x.style.gridRowStart - 1 === completedRowNumber){
                x.remove();
            }
        })
        stillRows.forEach(x => {
            if (x.style.gridRowStart - 2 < completedRowNumber){
                console.log(x)
                x.style.gridRowStart++;
            }
        })
        console.log(boardArray)
    }
}


export function moveBlock(board, boardArray){
    rowCompleted();
    let blockDirection = {
        down: true,
        left: false,
        right: false,
    }
    let elements = document.querySelectorAll('.moving-block');

    setMovingDirection(elements, boardArray, board, blockDirection);

    if(rotate === true){
        rotateBlock();
        rotate = false;
    }

    if (blockDirection.down === true && blockDirection.left === false && blockDirection.right === false){
        currentXPivot++; 
        elements.forEach(element => {
            boardArray[element.style.gridRowStart - 1][element.style.gridColumnStart - 1] = 0;
            element.style.gridRowStart++;
        })
    
        elements.forEach(element => {
            boardArray[element.style.gridRowStart - 1][element.style.gridColumnStart - 1] = 10;
        })

    }else if(blockDirection.down === true && blockDirection.left === true && blockDirection.right === false){
        currentXPivot++; 
        currentYPivot--; 

        elements.forEach(element => {
            boardArray[element.style.gridRowStart - 1][element.style.gridColumnStart - 1] = 0;
            element.style.gridRowStart++;
            element.style.gridColumnStart--;
        })
    
        elements.forEach(element => {
            boardArray[element.style.gridRowStart - 1][element.style.gridColumnStart - 1] = 10;
        })
    }else if (blockDirection.down === true && blockDirection.left === false && blockDirection.right === true){
        currentXPivot++; 
        currentYPivot++; 
        elements.forEach(element => {
            boardArray[element.style.gridRowStart - 1][element.style.gridColumnStart - 1] = 0;
            element.style.gridRowStart++;
            element.style.gridColumnStart++;
        })
    
        elements.forEach(element => {
            boardArray[element.style.gridRowStart - 1][element.style.gridColumnStart - 1] = 10;
        })
    }
}
