import React from 'react';
import classes from './Board.module.css'
import createArray from '../../utilities/Create2DArray';
import Tile from '../Tile/Tile'
import StartingPieces from '../StartingPieces/StartingPieces'
import {useDispatch, useSelector} from 'react-redux';

const Board = props => {

    const isDragging = useSelector(state => {
        return state.isDragging
    });

    const translation = useSelector(state => {
        return state.translation
    });

    console.log('Board.js');
    console.log(isDragging);
    console.log(translation);

    console.log('End Board.js');

    let blockudokuBoard = (createArray(9, 9));
    let displayBoard = [];

    for(var i = 0; i < blockudokuBoard.length; i++) {
        var blockudokuRow = blockudokuBoard[i];
        for(var j = 0; j < blockudokuRow.length; j++) {
            displayBoard.push(<td key = {'' + i + '' + j}><Tile row = {i} column = {j} isBoard = {true} topLeft = {i == 0 && j == 0 ? true : false} blockOnTile = {j == 3 || i ==3 ? true: false}/></td>)
        }
    }

    let finalDisplayBoard = [];

    for(var j = 0; j < blockudokuRow.length; j++) {
        finalDisplayBoard.push(<tr key = {'row' + j}>{displayBoard.slice(j*blockudokuRow.length, (j + 1)*blockudokuRow.length)}</tr>)
    }

    return (
        <React.Fragment>
            <table className = {classes.BoardStyle} 
                ref={el => {
                        if (!el) return;
                        console.log(el.getBoundingClientRect().top);
                    }
                }
            >
                <tbody className = {classes.TableBody}>
                    {finalDisplayBoard}
                </tbody>
            </table>
            <StartingPieces newBlocks = {false}/>
        </React.Fragment>
    );
}

export default Board;

