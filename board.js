export let boardArray = [];
export let GRID_NUMBER = 20;



export function styleAndGenerateGrid(board){
    board.setAttribute = ("grid-template-columns", `repeat(${GRID_NUMBER} , 1fr)`);
    board.setAttribute = ("grid-template-rows", `repeat(${GRID_NUMBER} , 1fr)`);
    for(let i = 1; i <= GRID_NUMBER; i++) {
        boardArray.push([]);
        for(let j = 1; j <= GRID_NUMBER; j++) {
            let cell = document.createElement("div");
            cell.style.gridRowStart = i;
            cell.style.gridColumnStart =  j;
            cell.style.border =  "1px solid red";
    
            board.appendChild(cell);
            boardArray[i - 1].push(0);
        }
    }
}