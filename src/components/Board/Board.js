import React from 'react';
import classes from './Board.module.css'
import createArray from '../../utilities/Create2DArray';
import Tile from '../Tile/Tile'
import StartingPieces from '../StartingPieces/StartingPieces'
import {useDispatch, useSelector} from 'react-redux';
import {setBlock} from '../../utilities/RandomStartingBlock';

const Board = props => {

    const POSITION = {x: 0, y: 0}

    const activeBlock = useSelector(state => {
        return state.activeBlock
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

    let blockudokuBoard = (createArray(9, 9));

    for(var y = 0; y < blockudokuBoard.length; y++) {
        var blockudokuRow = blockudokuBoard[y];
        for(var x = 0; x < blockudokuRow.length; x++) {
            if((x - tileX < 5) && (y - tileY < 5) && (x - tileX >= 0) && (y - tileY >= 0) && activeBlock != -1){
                if(chosenBlock[y - tileY][x - tileX]){
                    blockudokuBoard[y][x] = 1;
                }
                else{
                    blockudokuBoard[y][x] = 0;
                }
            }
            else{
                blockudokuBoard[y][x] = 0;
            }
        }
    }

    let displayBoard = [];

    for(var i = 0; i < blockudokuBoard.length; i++) {
        var blockudokuRow = blockudokuBoard[i];
        for(var j = 0; j < blockudokuRow.length; j++) {
            displayBoard.push(<td key = {'' + i + '' + j}><Tile row = {j} column = {i} isBoard = {true} topLeft = {i == 0 && j == 0 ? true : false} hoverOnTile = {blockudokuBoard[i][j] ? true: false} blockOnTile = {j == 3 || i ==3 ? true: false}/></td>)
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

