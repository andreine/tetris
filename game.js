import {styleAndGenerateGrid, boardArray} from './board.js';
import {generateNewBlock, moveBlock} from './block.js';
import { addInput } from './input.js'

let board = document.querySelector(".grid-container");

addInput();

styleAndGenerateGrid(board);
generateNewBlock(board, boardArray);



let lastRenderTime = 0;
let GAME_SPEED = 0.5;

function main(currentTime){
    window.requestAnimationFrame(main);
    let secondsSinceLastRender = (currentTime - lastRenderTime)/1000;

    if(secondsSinceLastRender < GAME_SPEED) return;

    moveBlock(board, boardArray);

    lastRenderTime = currentTime;
}

window.requestAnimationFrame(main);







