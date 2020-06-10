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

    const tileSize = useSelector(state => {
        return activeBlock != -1 ? state.boardPos.tileSize : 1
    });

    let tileX  = Math.round((translation.x - starterOffsetX) / tileSize);
    let tileY  = Math.round((translation.y - starterOffsetY) / tileSize);

    const chosenBlock = setBlock(starterName)

    var blockudokuBoard = createArray(9,9);

    for (var i = 0; i < stateBlockudokuBoard.length; i++){
        for (var j = 0; j < stateBlockudokuBoard.length; j++){
            if(stateBlockudokuBoard[i][j] > 0){
                blockudokuBoard[i][j] = 2;
                console.log('hi');
            }
            // console.log(stateBlockudokuBoard[i][j])
            //blockudokuBoard[i][j] = stateBlockudokuBoard[i][j];
        }
    }

    console.log(stateBlockudokuBoard);
    console.log(blockudokuBoard);


    let blockSet = false;

    for(var y = 0; y < blockudokuBoard.length; y++) {
        var blockudokuRow = blockudokuBoard[y];
        for(var x = 0; x < blockudokuRow.length; x++) {
            if((x - tileX < 5) && (y - tileY < 5) && (x - tileX >= 0) && (y - tileY >= 0) && activeBlock != -1 && blockudokuBoard[y][x] != 2){
                if(chosenBlock[y - tileY][x - tileX] &&  blockudokuBoard[y][x] != 2){
                    if(!isDragging){
                        blockSet = true;
                        blockudokuBoard[y][x] = 2;
                    }
                    else{
                        blockSet = true;
                        blockudokuBoard[y][x] = 1;
                    }
                }
                else{
                    blockudokuBoard[y][x] = 0;
                }
                console.log('here')
            }
            else{
                // console.log('here')
                // blockudokuBoard[y][x] = 0;
            }
        }
    }

    if(!isDragging && activeBlock != -1){
        console.log(isDragging);
        console.log(activeBlock);
        onResetBlock(activeBlock)
        onSetBoard(blockudokuBoard)
    }
    
    let displayBoard = [];

    for(var i = 0; i < blockudokuBoard.length; i++) {
        var blockudokuRow = blockudokuBoard[i];
        for(var j = 0; j < blockudokuRow.length; j++) {
            displayBoard.push(<td key = {'' + i + '' + j}><Tile row = {j} column = {i} isBoard = {true} topLeft = {i == 0 && j == 0 ? true : false} hoverOnTile = {blockudokuBoard[i][j] == 1 ? true: false} blockOnTile = {blockudokuBoard[i][j] == 2 ? true: false}/></td>)
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

