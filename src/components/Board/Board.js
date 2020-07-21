import React, {useState} from 'react';
import classes from './Board.module.css'
import createArray from '../../utilities/Create2DArray';
import Tile from '../Tile/Tile'
import StartingPieces from '../StartingPieces/StartingPieces'
import {useDispatch, useSelector} from 'react-redux';
import {setBlock} from '../../utilities/RandomStartingBlock';
import * as actions from '../../store/actions/index';

const Board = props => {

    //const [stateBoard, setStateBoard] = useState(createArray(9, 9))

    const POSITION = {x: 0, y: 0}
    const dispatch = useDispatch();

    const onSetBoard = (boardArray) => dispatch(actions.setBoard(boardArray))
    //const onSetDownBlock = (id) => dispatch(actions.setDownBlock(id));
    const onResetBlock = (id) => dispatch(actions.resetBlock(id));
    const onCalculateCompletion = () => dispatch(actions.calculateCompletion());

    const activeBlock = useSelector(state => {
        return state.activeBlock
    }); 

    const stateBlockudokuBoard = useSelector(state => {
        return state.blockudokuBoard;
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


    if(!isDragging && activeBlock != -1){
        onResetBlock(activeBlock)
        onSetBoard(blockudokuBoard)
        onCalculateCompletion();
    }

    var hoverCompletionBoard = createArray(9,9);

    // console.log(tileX + 2)
    // console.log(tileY + 2)

    if(starterHoverComplete != 0){
        if(starterHoverComplete[tileY + 2][tileX + 2].column.length){
            for(var i = 0; i < starterHoverComplete[tileY + 2][tileX + 2].column.length; i++){
                for(j = 0; j < hoverCompletionBoard.length; j++){
                    hoverCompletionBoard[j][starterHoverComplete[tileY + 2][tileX + 2].column[i]] = 1;
                }
            }
        }

        if(starterHoverComplete[tileY + 2][tileX + 2].row.length){
            for(var i = 0; i < starterHoverComplete[tileY + 2][tileX + 2].row.length; i++){
                for(j = 0; j < hoverCompletionBoard.length; j++){
                    hoverCompletionBoard[starterHoverComplete[tileY + 2][tileX + 2].row[i]][j] = 1;
                }
            }
        }

        if(starterHoverComplete[tileY + 2][tileX + 2].square.length){
            for(var i = 0; i < starterHoverComplete[tileY + 2][tileX + 2].square.length; i++){
                let boxNumber = starterHoverComplete[tileY + 2][tileX + 2].square[i];
                let boxRow = Math.floor(boxNumber / 3);
                let boxColumn = boxNumber % 3;

                for(var x = boxRow * 3; x < (boxRow + 1) * 3; x++) {
                    for(var y = boxColumn * 3; y < (boxColumn + 1) * 3; y++) {
                        console.log(x)
                        console.log(y)
                        hoverCompletionBoard[y][x] = 1; 
                    }
                }  
            }
        }
    }
    
    let displayBoard = [];

    for(var i = 0; i < blockudokuBoard.length; i++) {
        var blockudokuRow = blockudokuBoard[i];
        for(var j = 0; j < blockudokuRow.length; j++) {
            displayBoard.push(<td key = {'' + i + '' + j}><Tile row = {j} column = {i} isBoard = {true} topLeft = {i == 0 && j == 0 ? true : false} hoverOnTile = {blockudokuBoard[i][j] == 1 ? true: false} blockOnTile = {blockudokuBoard[i][j] == 2 ? true: false} hoverComplete = {hoverCompletionBoard[i][j] ? true : false}/></td>)
        }
    }

    let finalDisplayBoard = [];

    for(var j = 0; j < blockudokuRow.length; j++) {
        finalDisplayBoard.push(<tr key = {'row' + j}>{displayBoard.slice(j*blockudokuRow.length, (j + 1)*blockudokuRow.length)}</tr>)
    }

    return (
        <React.Fragment>
            <table className = {classes.BoardStyle}>
                <tbody className = {classes.TableBody}>
                    {finalDisplayBoard}
                </tbody>
            </table>
            <StartingPieces newBlocks = {false}/>
        </React.Fragment>
    );
}

export default Board;

