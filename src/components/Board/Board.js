import React, {useState} from 'react';
import classes from './Board.module.css'
import createArray from '../../utilities/Create2DArray';
import Tile from '../Tile/Tile'
import StartingPieces from '../StartingPieces/StartingPieces'
import Score from '../Score/Score'
import Modal from '../UI/Modal/Modal'
import Results from '../Results/Results';
import {useDispatch, useSelector} from 'react-redux';
import {setBlock} from '../../utilities/RandomStartingBlock';
import * as actions from '../../store/actions/index';
import axios from '../../axios-standings';

const Board = props => {

    //const [stateBoard, setStateBoard] = useState(createArray(9, 9))

    const POSITION = {x: 0, y: 0}
    const dispatch = useDispatch();

    const onSetBoard = (boardArray) => dispatch(actions.setBoard(boardArray))
    //const onSetDownBlock = (id) => dispatch(actions.setDownBlock(id));
    const onResetBlock = (id, addScore) => dispatch(actions.resetBlock(id, addScore));
    const onCalculateCompletion = () => dispatch(actions.calculateCompletion());
    const onAddScore = (addScore) => dispatch(actions.updateScore(addScore));
    const onNewGame = () => dispatch(actions.newGame());

    const endGame = useSelector(state => {
        return state.endOfGame;
    }); 

    const activeBlock = useSelector(state => {
        return state.activeBlock
    }); 

    const stateBlockudokuBoard = useSelector(state => {
        return state.blockudokuBoard;
    }); 

    const generateNewBlocks = useSelector(state => {
        return state.generateNewBlocks;
    }); 

    const isDragging = useSelector(state => {
        return activeBlock != -1 ? state.starterBlock[activeBlock].isDragging : false
    }); 

    const translation = useSelector(state => {
        return activeBlock != -1 ? state.starterBlock[activeBlock].translation : POSITION
    });

    //might need to round?
    const  starterOffsetX = useSelector(state => {
        return activeBlock != -1 ? state.boardPos.startingPos.x - state.starterBlock[activeBlock].startingPos.x  : 0
    });

    const  starterOffsetY = useSelector(state => {
        return activeBlock != -1 ? state.boardPos.startingPos.y - state.starterBlock[activeBlock].startingPos.y  : 0
    });

    const  starterName = useSelector(state => {
        return activeBlock != -1 ? state.starterBlock[activeBlock].name  : 0
    });

    const  starterHoverComplete = useSelector(state => {
        return activeBlock != -1 ? state.starterBlock[activeBlock].completion  : 0
    });

    const tileSize = useSelector(state => {
        return activeBlock != -1 ? state.boardPos.tileSize : 1
    });
    

    let tileX  = Math.round((translation.x - starterOffsetX) / tileSize);
    let tileY  = Math.round((translation.y - starterOffsetY) / tileSize);

    const chosenBlock = setBlock(starterName);

    let numberOfTiles = 0

    if(chosenBlock.length > 0){
        numberOfTiles = chosenBlock.reduce(function(a,b) { return a.concat(b) }) // flatten array
        .reduce(function(a,b) { return a + b });  
    }

    let numberofTilesHover = 0;

    var blockudokuBoard = createArray(9,9);

    for (var i = 0; i < stateBlockudokuBoard.length; i++){
        for (var j = 0; j < stateBlockudokuBoard.length; j++){
            blockudokuBoard[i][j] = stateBlockudokuBoard[i][j]
        }
    }

    let validPlacement = true;

    entireGrid:
    for(var y = 0; y < blockudokuBoard.length; y++) {
        var blockudokuRow = blockudokuBoard[y];
        for(var x = 0; x < blockudokuRow.length; x++) {
            if((x - tileX < 5) && (y - tileY < 5) && (x - tileX >= 0) && (y - tileY >= 0) && activeBlock != -1 && chosenBlock[y - tileY][x - tileX]){
                if(chosenBlock[y - tileY][x - tileX] && blockudokuBoard[y][x] == 2){
                    validPlacement = false;
                    break entireGrid;
                }
                else if(chosenBlock[y - tileY][x - tileX] && blockudokuBoard[y][x] != 2){
                    if(!isDragging){
                        blockudokuBoard[y][x] = 2;
                        numberofTilesHover++;
                    }
                    else{
                        blockudokuBoard[y][x] = 1;
                        numberofTilesHover++;
                    }
                }
                else{
                    blockudokuBoard[y][x] = 0;
                }
            }
            else if(blockudokuBoard[y][x] != 2){
                blockudokuBoard[y][x] = 0;
            }
        }
    }

    // console.log(numberofTilesHover); need to test to see what this does exactly 
    // console.log(numberOfTiles)

    if(!validPlacement || numberofTilesHover != numberOfTiles){
        for(var y = 0; y < blockudokuBoard.length; y++) {
            var blockudokuRow = blockudokuBoard[y];
            for(var x = 0; x < blockudokuRow.length; x++) {
                if(stateBlockudokuBoard[y][x] != 2){
                    blockudokuBoard[y][x] = 0;
                }
            }
        }
    }

    var hoverCompletionBoard = createArray(9,9);
    let totalRemoved = 0;

    // console.log(tileX + 2)
    // console.log(tileY + 2)

    if(starterHoverComplete != 0 && tileY >= -2 && tileY <= 11 && tileX >= -2 && tileX <= 11){
        if(starterHoverComplete[tileY + 2][tileX + 2].column.length){
            totalRemoved += starterHoverComplete[tileY + 2][tileX + 2].column.length;
            for(var i = 0; i < starterHoverComplete[tileY + 2][tileX + 2].column.length; i++){
                for(j = 0; j < hoverCompletionBoard.length; j++){
                    hoverCompletionBoard[j][starterHoverComplete[tileY + 2][tileX + 2].column[i]] = 1;
                }
            }
        }

        if(starterHoverComplete[tileY + 2][tileX + 2].row.length){
            totalRemoved += starterHoverComplete[tileY + 2][tileX + 2].row.length;
            for(var i = 0; i < starterHoverComplete[tileY + 2][tileX + 2].row.length; i++){
                for(j = 0; j < hoverCompletionBoard.length; j++){
                    hoverCompletionBoard[starterHoverComplete[tileY + 2][tileX + 2].row[i]][j] = 1;
                }
            }
        }

        if(starterHoverComplete[tileY + 2][tileX + 2].square.length){
            totalRemoved += starterHoverComplete[tileY + 2][tileX + 2].square.length;
            for(var i = 0; i < starterHoverComplete[tileY + 2][tileX + 2].square.length; i++){
                let boxNumber = starterHoverComplete[tileY + 2][tileX + 2].square[i];
                let boxRow = Math.floor(boxNumber / 3);
                let boxColumn = boxNumber % 3;

                for(var x = boxRow * 3; x < (boxRow + 1) * 3; x++) {
                    for(var y = boxColumn * 3; y < (boxColumn + 1) * 3; y++) {
                        hoverCompletionBoard[y][x] = 1; 
                    }
                }  
            }
        }
    }

    if(!isDragging && activeBlock != -1){
        let addScore = 0;
        if(numberofTilesHover == numberOfTiles){
            addScore = numberOfTiles
        }

        switch(totalRemoved){
            case 1:
                addScore += 18;
                break;
            case 2:
                addScore += 2*18;
                break;
            case 3:
                addScore += 6*18;
                break;
            default:
                addScore += 0;
        }

        onAddScore(addScore);

        if(addScore > 18) {
            for(var i = 0; i < blockudokuBoard.length; i++) {
                var blockudokuRow = blockudokuBoard[i];
                for(var j = 0; j < blockudokuRow.length; j++) {
                    //2 is placed - 1 is hover - need to do 2 - 2 to get empty
                    blockudokuBoard[i][j] -= hoverCompletionBoard[i][j]*2
                }
            }
        }

        onResetBlock(activeBlock, addScore)
        onSetBoard(blockudokuBoard)
        onCalculateCompletion();
    }
    
    let displayBoard = [];

    for(var i = 0; i < blockudokuBoard.length; i++) {
        var blockudokuRow = blockudokuBoard[i];
        for(var j = 0; j < blockudokuRow.length; j++) {
            displayBoard.push(<td key = {'' + i + '' + j}><Tile row = {j} column = {i} isBoard = {true} topLeft = {i == 0 && j == 0 ? true : false} 
            colorPattern = {(i < 3 && j > 2 && j < 6) || (i > 5 && j > 2 && j < 6) || (j < 3 && i > 2 && i < 6) || (j > 5 && i > 2 && i < 6) ? true : false} 
            hoverOnTile = {blockudokuBoard[i][j] == 1 ? true: false} 
            blockOnTile = {blockudokuBoard[i][j] == 2 ? true: false} 
            hoverComplete = {hoverCompletionBoard[i][j] ? true : false}/></td>)
        }
    }

    let finalDisplayBoard = [];

    for(var j = 0; j < blockudokuRow.length; j++) {
        finalDisplayBoard.push(<tr key = {'row' + j}>{displayBoard.slice(j*blockudokuRow.length, (j + 1)*blockudokuRow.length)}</tr>)
    }

    return (
        <React.Fragment>
            {/* <Modal show = {endGame} modalClosed = {this.purchaseCancelHandler}>{orderSummary}</Modal> */}
            {/* <Modal show = {endGame}><Results newGame = {onNewGame}></Results></Modal> */}
            <Modal show = {endGame}><Results></Results></Modal>
            <Score></Score>
            <table className = {classes.BoardStyle}>
                <tbody className = {classes.TableBody}>
                    {finalDisplayBoard}
                </tbody>
            </table>
            <StartingPieces/>
        </React.Fragment>
    );
}

export default Board;

