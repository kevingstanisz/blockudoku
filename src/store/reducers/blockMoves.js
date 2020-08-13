import * as actionTypes from '../actions/actionTypes'
import startingPiece from '../../components/StartingPieces/StartingPieces'
import createArray, {makeObject, createFullArray} from '../../utilities/Create2DArray';
import {setBlock} from '../../utilities/RandomStartingBlock'
import { setStarterNames } from '../actions';

const POSITION = {x: 0, y: 0}

const intialState = {
    starterBlock : [
        {isDragging: false, origin: POSITION, translation: POSITION, startingPos: POSITION, name: '', placed: false, placeable: false, completion: makeObject(createArray(13, 13))},
        {isDragging: false, origin: POSITION, translation: POSITION, startingPos: POSITION, name: '', placed: false, placeable: false, completion: makeObject(createArray(13, 13))},
        {isDragging: false, origin: POSITION, translation: POSITION, startingPos: POSITION, name: '', placed: false, placeable: false, completion: makeObject(createArray(13, 13))}
    ],
    activeBlock: -1,
    boardPos : {
        startingPos: POSITION, tileSize: 0
    },
    blockudokuBoard: createFullArray(9, 9),
    score: 0, 
    generateNewBlocks: true,
    endOfGame: false,
    results: [],
    badInput: false,
    newGameModal: false,
    consecutiveRemoved: 0,
    addScore: 0
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
                    ),
                    addScore: 0
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
            localStorage.setItem("board", JSON.stringify(state.blockudokuBoard));
            localStorage.setItem("starters", JSON.stringify(state.starterBlock));
            localStorage.setItem("score", JSON.stringify(state.score));

            let newCompletion = [];
            let placeablePieces = [];
            let placeablePiece = false;
            let endGame = true;

            for(var pieceNumber = 0; pieceNumber < state.starterBlock.length; pieceNumber++){
                newCompletion.push(makeObject(createArray(13, 13)));
                if(!state.starterBlock[pieceNumber].placed){
                    let tempPiece = setBlock(state.starterBlock[pieceNumber].name);
                    placeablePiece = false;

                    for(var y = -2; y < 7; y++) {
                        for(var x = -2; x < 7; x++) {
                            if(placeable(x, y, tempPiece, state.blockudokuBoard)){
                                placeablePiece = true;
                                endGame = false;
                                newCompletion[pieceNumber][y + 2][x + 2].row = (completeRow(x, y, tempPiece, state.blockudokuBoard));
                                newCompletion[pieceNumber][y + 2][x + 2].column = (completeColumn(x, y, tempPiece, state.blockudokuBoard));
                                newCompletion[pieceNumber][y + 2][x + 2].square = (completeBox(x, y, tempPiece, state.blockudokuBoard));
                            }
                        }
                    }
                }
                    
                placeablePieces.push(placeablePiece);
                
            }

            return{
                ...state,
                starterBlock: state.starterBlock.map(
                    (starterBlock, i) => i > -1 ? {...starterBlock, completion: newCompletion[i], placeable: placeablePieces[i]}
                                                        :starterBlock
                    ),
                endOfGame: endGame
            };

        case actionTypes.UPDATE_SCORE: 
            return{
                ...state,
                score: state.score + action.addedScore,
                consecutiveRemoved: action.addedScore > 18 ? (state.consecutiveRemoved + 1) : 0,
                addScore: action.addedScore
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

        case actionTypes.NEW_GAME: 
            return{
                ...state,
                blockudokuBoard: action.boardArray,
                endOfGame: false,
                generateNewBlocks: true,
                score: 0,
                badInput: false,
                newGameModal: false
            };

        case actionTypes.FETCH_RESULTS_SUCCESS: 
            return{
                ...state,
                results: action.results
            };

        case actionTypes.RESUME_OLD_GAME: 
            return{
                ...state,
                blockudokuBoard: JSON.parse(localStorage.getItem("board")),
                starterBlock: JSON.parse(localStorage.getItem("starters")),
                score: JSON.parse(localStorage.getItem("score")),
            };

        case actionTypes.BAD_USERNAME: 
            return{
                ...state,
                badInput: true
            };

        case actionTypes.NEW_GAME_MODAL: 
            return{
                ...state,
                newGameModal: true
            };  

        case actionTypes.CANCEL_NEW_GAME: 
            return{
                ...state,
                newGameModal: false
            };

        default: 
            return state;
    }
}

export default reducer;