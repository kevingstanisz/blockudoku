import React from 'react';
import classes from './Board.module.css'
import createArray from '../../utilities/Create2DArray';
import Tile from '../Tile/Tile'
import StartingPieces from '../StartingPieces/StartingPieces'

const board = props => {

    let blockudokuBoard = (createArray(9, 9));
    let displayBoard = [];

    for(var i = 0; i < blockudokuBoard.length; i++) {
        var blockudokuRow = blockudokuBoard[i];
        for(var j = 0; j < blockudokuRow.length; j++) {
            displayBoard.push(<td key = {'' + i + '' + j}><Tile row = {i} column = {j} blockOnTile = {j == 3 || i ==3 ? true: false}/></td>)
        }
    }

    console.log(displayBoard)
    let finalDisplayBoard = [];

    for(var j = 0; j < blockudokuRow.length; j++) {
        finalDisplayBoard.push(<tr key = {'row' + j}>{displayBoard.slice(j*blockudokuRow.length, (j + 1)*blockudokuRow.length)}</tr>)
    }

    console.log(finalDisplayBoard)

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

export default board;

