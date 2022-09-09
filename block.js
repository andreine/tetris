import {nextKeyframeDirection} from './input.js'

let blocksType = [
    [{
        x: 1,
        y: 5
    }, 
    {
        x: 2,
        y: 5
    }, 
    {
        x: 3,
        y: 5
    }, 
    {
        x: 4,
        y: 5
    }]
]

let currentBlockStructure;
let currentBlockReference;

window.addEventListener("keydown", (event) => {
    if(event.key === "w"){
       changeBlock();
    }
})


function changeBlock(){
    currentBlockReference.forEach(x => {
        console.log(x)
    })
}


export function generateNewBlock(board, boardArray){
    // currentBlockStructure = blocksType[0].slice().map(a => ({...a}));
    currentBlockStructure = blocksType[0];
    currentBlockStructure.forEach(blockPosition => {
        let newBlock = document.createElement("div");
        newBlock.style.gridRowStart = blockPosition.x;
        newBlock.style.gridColumnStart =  blockPosition.y;
        newBlock.style.backgroundColor =  "green";
        newBlock.classList.add('moving-block');
        board.appendChild(newBlock);
        boardArray[blockPosition.x - 1][blockPosition.y - 1] = 10;
        // rememberPreviousPosition(blockPosition.x - 1, blockPosition.y - 1);
        // console.log(boardArray)
    });
    currentBlockReference = document.querySelectorAll(".moving-block");
}

var stopBlock = function(block,boardArray, board, currentBlock){
    if(block.x === boardArray.length || boardArray[block.x - 1][block.y] === 1){
        boardArray[block.x - 2][block.y]=1;
        currentBlock.classList.remove("moving-block")
        currentBlock.classList.add("still-block")
        generateNewBlock(board, boardArray)
        return true;
    }else{
        // boardArray[block.x - 2][block.y - 1]=0;
        rememberPreviousPosition(block.x - 1, block.y - 1)
        boardArray[block.x - 1][block.y - 1]=1;
        return false;
    } 
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
        if(+element.style.gridRowStart + 1 > 10 || boardArray[element.style.gridRowStart][element.style.gridColumnStart - 1] === 1){
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
        if((+element.style.gridColumnStart - 1 > 0 && +element.style.gridRowStart + 1 < 10 && (element.style.gridColumnStart - 1 > 0 ? boardArray[element.style.gridRowStart][element.style.gridColumnStart - 2] !==1 : true))){
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
        if((+element.style.gridColumnStart < 10 && +element.style.gridRowStart + 1 < 10 && (element.style.gridRowStart < 10 ? boardArray[element.style.gridRowStart][element.style.gridColumnStart] !==1 : true))){
            blockDirection.right = true;
        }else{
            blockDirection.right = false;
            canMoveDown(block, boardArray, board, blockDirection);
            break;
        }
    }
    console.log(blockDirection.right)
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



export function moveBlock(board, boardArray){
    let blockDirection = {
        down: true,
        left: false,
        right: false,
    }
    let elements = document.querySelectorAll('.moving-block');

    setMovingDirection(elements, boardArray, board, blockDirection);


    if (blockDirection.down === true && blockDirection.left === false && blockDirection.right === false){
        if (blockDirection.down === true){
            elements.forEach(element => {
                boardArray[element.style.gridRowStart - 1][element.style.gridColumnStart - 1] = 0;
                element.style.gridRowStart++;
            })
        
            elements.forEach(element => {
                boardArray[element.style.gridRowStart - 1][element.style.gridColumnStart - 1] = 10;
            })
        }

    }else if(blockDirection.down === true && blockDirection.left === true && blockDirection.right === false){
        elements.forEach(element => {
            boardArray[element.style.gridRowStart - 1][element.style.gridColumnStart - 1] = 0;
            element.style.gridRowStart++;
            element.style.gridColumnStart--;
        })
    
        elements.forEach(element => {
            boardArray[element.style.gridRowStart - 1][element.style.gridColumnStart - 1] = 10;
        })
    }else if (blockDirection.down === true && blockDirection.left === false && blockDirection.right === true){
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

let previousPosition = [];

function rememberPreviousPosition(x, y){
    previousPosition.push([x,y]);
}


function removePreviousPosition(boardArray){
    previousPosition.forEach(element => {
        boardArray[element[0], element[1]] = 0;
    });
    previousPosition.length = 0;
}


function initBlock(){

}