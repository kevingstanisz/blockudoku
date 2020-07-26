import * as actionTypes from '../actions/actionTypes'
import startingPiece from '../../components/StartingPieces/StartingPieces'
import createArray, {makeObject} from '../../utilities/Create2DArray';
import {setBlock} from '../../utilities/RandomStartingBlock'

const POSITION = {x: 0, y: 0}

const intialState = {
    starterBlock : [
        {isDragging: false, origin: POSITION, translation: POSITION, startingPos: POSITION, name: '', placed: false, completion: makeObject(createArray(13, 13))},
        {isDragging: false, origin: POSITION, translation: POSITION, startingPos: POSITION, name: '', placed: false, completion: makeObject(createArray(13, 13))},
        {isDragging: false, origin: POSITION, translation: POSITION, startingPos: POSITION, name: '', placed: false, completion: makeObject(createArray(13, 13))}
    ],
    activeBlock: -1,
    boardPos : {
        startingPos: POSITION, tileSize: 0
    },
    incrementer: 0,
    blockudokuBoard: createArray(9, 9),
    score: 0, 
    generateNewBlocks: true,
    endOfGame: false
}

const placeable = (gridX, gridY, piece, board) => {
    for(var y = 0; y < piece.length; y++) {
        for(var x = 0; x < piece.length; x++) {
            if(piece[y][x]){
                if(gridX + x < 0 || gridY + y < 0 || gridX + x >= board.length || gridY + y >= board.length){
                    return false;
                }
                else if(board[gridY + y][gridX + x] > 0){
                    return (false);
                } 
            }
        }
    }

    return true;
};

const completeRow = (gridX, gridY, piece, board) => {
    let totalComplete = 0;
    let rowsCompletable = [];
    for(var y = 0; y < board.length; y++) {
        totalComplete = 0;
        gridRow:
        for(var x = 0; x < board.length; x++) {
            if(board[y][x]){
                totalComplete++;
            }
            else if(x - gridX < 5 && y - gridY < 5 && x - gridX >= 0 && y - gridY >= 0){
                if(piece[y - gridY][x - gridX])
                totalComplete++;
            }
            else{
                break gridRow;
            }

            if(totalComplete == board.length){
                rowsCompletable.push(y)
            }
        }
    }

    return rowsCompletable;
};

const completeColumn = (gridX, gridY, piece, board) => {
    let totalComplete = 0;
    let columnsCompletable = [];
    for(var x = 0; x < board.length; x++) {
        totalComplete = 0;
        gridColumn:
        for(var y = 0; y < board.length; y++) {
            if(board[y][x]){
                totalComplete++;
            }
            else if(x - gridX < 5 && y - gridY < 5 && x - gridX >= 0 && y - gridY >= 0){
                if(piece[y - gridY][x - gridX])
                totalComplete++;
            }
            else{
                break gridColumn;
            }

            if(totalComplete == board.length){
                columnsCompletable.push(x)
            }
        }
    }

    return columnsCompletable;
};

const completeBox = (gridX, gridY, piece, board) => {
    let totalComplete = 0;
    let boxesCompletable = [];
    let boxRow = 0;
    let boxColumn = 0;

    for(var boxNumber = 0; boxNumber < 9; boxNumber++){
        totalComplete = 0;
        boxRow = Math.floor(boxNumber / 3);
        boxColumn = boxNumber % 3;

        gridBox:
        for(var x = boxRow * 3; x < (boxRow + 1) * 3; x++) {
            for(var y = boxColumn * 3; y < (boxColumn + 1) * 3; y++) {
                if(board[y][x]){
                    totalComplete++;
                }
                else if(x - gridX < 5 && y - gridY < 5 && x - gridX >= 0 && y - gridY >= 0){
                    if(piece[y - gridY][x - gridX])
                    totalComplete++;
                }
                else{
                    break gridBox;
                }
            }

            if(totalComplete == board.length){
                boxesCompletable.push(boxNumber)
            }
        }
    }

    return boxesCompletable;
};



const reducer = (state = intialState, action) => {
    switch(action.type){
        case actionTypes.PICK_UP_BLOCK: 
            return{
                ...state,
                activeBlock: action.id,
                starterBlock: state.starterBlock.map(
                    (starterBlock, i) => i === action.id ? {...starterBlock, isDragging: true, origin:  {x: action.clientX, y: action.clientY}}
                                                        :starterBlock
                    )
            } ;

        case actionTypes.SET_DOWN_BLOCK: 
            return{
                ...state,
                starterBlock: state.starterBlock.map(
                    (starterBlock, i) => i === action.id ? {...starterBlock, isDragging: false}
                                                        :starterBlock
                    )
            } ;

        case actionTypes.MOVE_BLOCK: 
            const translation = {x: action.clientX - state.starterBlock[action.id].origin.x, y: action.clientY - state.starterBlock[action.id].origin.y};

            return{
                ...state,
                starterBlock: state.starterBlock.map(
                    (starterBlock, i) => i === action.id ? {...starterBlock, translation: translation}
                                                        :starterBlock
                    )
            };
        
        case actionTypes.RESET_BLOCK: 

            let numberBlocksUsed = 0;
            for(let i = 0; i < state.starterBlock.length; i++){
                if(state.starterBlock[i].placed){
                    numberBlocksUsed++
                }
            }

            if(action.hideBlock){
                numberBlocksUsed++
            }

            let newBlocks = false;
            if(numberBlocksUsed == state.starterBlock.length){
                newBlocks = true;
            }

            return{
                ...state,
                generateNewBlocks: newBlocks,
                activeBlock: -1,
                starterBlock: state.starterBlock.map(
                    (starterBlock, i) => i === action.id ? {...starterBlock, translation: POSITION, placed: action.hideBlock || state.starterBlock[action.id].placed}
                                                        :starterBlock
                    )
            };

        case actionTypes.SET_STARTER_POSITION: 
            return{
                ...state,
                starterBlock: state.starterBlock.map(
                    (starterBlock, i) => i === action.id ? {...starterBlock, startingPos: {x: action.posX, y: action.posY}}
                                                        :starterBlock
                    )
            };

        case actionTypes.SET_BOARD_POSITION: 
            return{
                ...state,
                boardPos: {
                    ...state.boardPos,
                    startingPos: {x: action.posX, y: action.posY},
                    tileSize: action.tileSide
                }
            };

        case actionTypes.SET_STARTER_NAMES: 
            return{
                ...state,
                starterBlock: state.starterBlock.map(
                    (starterBlock, i) => i > -1 ? {...starterBlock, name: action.starterArray[i].name}
                                                        :starterBlock
                    )
            };

        case actionTypes.SET_BOARD: 
            return{
                ...state,
                blockudokuBoard: action.boardArray
            };

        case actionTypes.CALCULATE_COMPLETION:
            let newCompletion = [];

            for(var pieceNumber = 0; pieceNumber < state.starterBlock.length; pieceNumber++){
                newCompletion.push(makeObject(createArray(13, 13)));
                let tempPiece = setBlock(state.starterBlock[pieceNumber].name);

                for(var y = -2; y < 7; y++) {
                    for(var x = -2; x < 7; x++) {
                        if(placeable(x, y, tempPiece, state.blockudokuBoard)){
                            newCompletion[pieceNumber][y + 2][x + 2].row = (completeRow(x, y, tempPiece, state.blockudokuBoard));
                            newCompletion[pieceNumber][y + 2][x + 2].column = (completeColumn(x, y, tempPiece, state.blockudokuBoard));
                            newCompletion[pieceNumber][y + 2][x + 2].square = (completeBox(x, y, tempPiece, state.blockudokuBoard));
                        }
                    }
                }

            }

            return{
                ...state,
                starterBlock: state.starterBlock.map(
                    (starterBlock, i) => i > -1 ? {...starterBlock, completion: newCompletion[i]}
                                                        :starterBlock
                    )
            };

        case actionTypes.UPDATE_SCORE: 
            return{
                ...state,
                score: state.score + action.addedScore
            };

        case actionTypes.BLOCKS_GENERATED: 
            return{
                ...state,
                generateNewBlocks: false,
                starterBlock: state.starterBlock.map(
                    (starterBlock, i) => i > -1 ? {...starterBlock, placed: false}
                                                        :starterBlock
                    )
            };

        default: 
            return state;
    }
}

export default reducer;