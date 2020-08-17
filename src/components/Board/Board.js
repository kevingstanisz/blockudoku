import React from 'react';
import classes from './Board.module.css'
import createArray from '../../utilities/Create2DArray';
import Tile from '../Tile/Tile'
import StartingPieces from '../StartingPieces/StartingPieces'
import Score from '../Score/Score'
import Modal from '../UI/Modal/Modal'
import Results from '../Results/Results';
import NewGame from '../NewGame/NewGame';
import {useDispatch, useSelector} from 'react-redux';
import {setBlock} from '../../utilities/RandomStartingBlock';
import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';

const Board = props => {

    const POSITION = {x: 0, y: 0}
    const dispatch = useDispatch();

    const onSetBoard = (boardArray) => dispatch(actions.setBoard(boardArray))
    const onResetBlock = (id, addScore) => dispatch(actions.resetBlock(id, addScore));
    const onCalculateCompletion = () => dispatch(actions.calculateCompletion());
    const onAddScore = (addScore) => dispatch(actions.updateScore(addScore));
    const onNewGame = (redirect) => dispatch(actions.newGame(redirect));

    const newGameHandler = () => {
        onNewGame(false);
    }

    const redirect = useSelector(state => {
        return state.redirect;
    });

    const endGame = useSelector(state => {
        return state.endOfGame;
    }); 

    const activeBlock = useSelector(state => {
        return state.activeBlock
    }); 

    const stateBlockudokuBoard = useSelector(state => {
        return state.blockudokuBoard;
    }); 

    const score = useSelector(state => {
        return state.score;
    }); 

    const consecRemoved = useSelector(state => {
        return state.consecutiveRemoved
    });

    const newGameModal = useSelector(state => {
        return state.newGameModal;
    }); 

    const isDragging = useSelector(state => {
        return activeBlock !== -1 ? state.starterBlock[activeBlock].isDragging : false
    }); 

    const translation = useSelector(state => {
        return activeBlock !== -1 ? state.starterBlock[activeBlock].translation : POSITION
    });

    //might need to round?
    const  starterOffsetX = useSelector(state => {
        return activeBlock !== -1 ? state.boardPos.startingPos.x - state.starterBlock[activeBlock].startingPos.x  : 0
    });

    const  starterOffsetY = useSelector(state => {
        return activeBlock !== -1 ? state.boardPos.startingPos.y - state.starterBlock[activeBlock].startingPos.y  : 0
    });

    const  starterName = useSelector(state => {
        return activeBlock !== -1 ? state.starterBlock[activeBlock].name  : 0
    });

    const  starterHoverComplete = useSelector(state => {
        return activeBlock !== -1 ? state.starterBlock[activeBlock].completion  : 0
    });

    const tileSize = useSelector(state => {
        return activeBlock !== -1 ? state.boardPos.tileSize : 1
    });

    if(redirect){
        return <Redirect to="/leaderboard" />;
    }
    

    let tileX  = Math.round((translation.x - starterOffsetX) / tileSize);
    let tileY  = Math.round((translation.y - starterOffsetY) / tileSize);

    //prevent tile from going off edge and breaking everything
    if(tileY >= 11){
        tileY = 10;
    }

    if(tileX >= 11){
        tileX = 10;
    }

    const chosenBlock = setBlock(starterName);

    let numberOfTiles = 0

    if(chosenBlock.length > 0){
        numberOfTiles = chosenBlock.reduce(function(a,b) { return a.concat(b) }) // flatten array
        .reduce(function(a,b) { return a + b });  
    }

    let numberofTilesHover = 0;

    let blockudokuBoard = createArray(9,9);

    for (let i = 0; i < stateBlockudokuBoard.length; i++){
        for (let j = 0; j < stateBlockudokuBoard.length; j++){
            blockudokuBoard[i][j] = stateBlockudokuBoard[i][j]
        }
    }

    let validPlacement = true;

    entireGrid:
    for(let y = 0; y < blockudokuBoard.length; y++) {
        let blockudokuRow = blockudokuBoard[y];
        for(let x = 0; x < blockudokuRow.length; x++) {
            if((x - tileX < 5) && (y - tileY < 5) && (x - tileX >= 0) && (y - tileY >= 0) && activeBlock !== -1 && chosenBlock[y - tileY][x - tileX]){
                if(chosenBlock[y - tileY][x - tileX] && blockudokuBoard[y][x] === 2){
                    validPlacement = false;
                    break entireGrid;
                }
                else if(chosenBlock[y - tileY][x - tileX] && blockudokuBoard[y][x] !== 2){
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
            else if(blockudokuBoard[y][x] !== 2){
                blockudokuBoard[y][x] = 0;
            }
        }
    }

    if(!validPlacement || numberofTilesHover !== numberOfTiles){
        for(let y = 0; y < blockudokuBoard.length; y++) {
            let blockudokuRow = blockudokuBoard[y];
            for(let x = 0; x < blockudokuRow.length; x++) {
                if(stateBlockudokuBoard[y][x] !== 2){
                    blockudokuBoard[y][x] = 0;
                }
            }
        }
    }

    let hoverCompletionBoard = createArray(9,9);
    let totalRemoved = 0;

    //console.log(tileX + 2)
    //console.log(tileY + 2)

    if(starterHoverComplete !== 0 && tileY >= -2 && tileY <= 11 && tileX >= -2 && tileX <= 11){
        //console.log("tileY " + (tileY + 2) + " tileX " + (tileX + 2))
        if(starterHoverComplete[tileY + 2][tileX + 2].column.length){
            totalRemoved += starterHoverComplete[tileY + 2][tileX + 2].column.length;
            for(let i = 0; i < starterHoverComplete[tileY + 2][tileX + 2].column.length; i++){
                for(let j = 0; j < hoverCompletionBoard.length; j++){
                    hoverCompletionBoard[j][starterHoverComplete[tileY + 2][tileX + 2].column[i]] = 1;
                }
            }
        }

        if(starterHoverComplete[tileY + 2][tileX + 2].row.length){
            totalRemoved += starterHoverComplete[tileY + 2][tileX + 2].row.length;
            for(let i = 0; i < starterHoverComplete[tileY + 2][tileX + 2].row.length; i++){
                for(let j = 0; j < hoverCompletionBoard.length; j++){
                    hoverCompletionBoard[starterHoverComplete[tileY + 2][tileX + 2].row[i]][j] = 1;
                }
            }
        }

        if(starterHoverComplete[tileY + 2][tileX + 2].square.length){
            totalRemoved += starterHoverComplete[tileY + 2][tileX + 2].square.length;
            for(let i = 0; i < starterHoverComplete[tileY + 2][tileX + 2].square.length; i++){
                let boxNumber = starterHoverComplete[tileY + 2][tileX + 2].square[i];
                let boxRow = Math.floor(boxNumber / 3);
                let boxColumn = boxNumber % 3;

                for(let x = boxRow * 3; x < (boxRow + 1) * 3; x++) {
                    for(let y = boxColumn * 3; y < (boxColumn + 1) * 3; y++) {
                        hoverCompletionBoard[y][x] = 1; 
                    }
                }  
            }
        }
    }

    if(!isDragging && activeBlock !== -1){
        let addScore = 0;
        if(numberofTilesHover === numberOfTiles){
            addScore = numberOfTiles
        }

        addScore += totalRemoved * 18

        if(totalRemoved > 0){
            addScore += consecRemoved * 9
        }
        
        onAddScore(addScore);

        if(addScore > 18) {
            for(let i = 0; i < blockudokuBoard.length; i++) {
                let blockudokuRow = blockudokuBoard[i];
                for(let j = 0; j < blockudokuRow.length; j++) {
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

    for(let i = 0; i < blockudokuBoard.length; i++) {
        let blockudokuRow = blockudokuBoard[i];
        for(let j = 0; j < blockudokuRow.length; j++) {
            displayBoard.push(<td key = {'' + i + '' + j}><Tile row = {j} column = {i} isBoard = {true} topLeft = {i === 0 && j === 0 ? true : false} 
            colorPattern = {(i < 3 && j > 2 && j < 6) || (i > 5 && j > 2 && j < 6) || (j < 3 && i > 2 && i < 6) || (j > 5 && i > 2 && i < 6) ? true : false} 
            hoverOnTile = {blockudokuBoard[i][j] === 1 ? true: false} 
            blockOnTile = {blockudokuBoard[i][j] === 2 ? true: false} 
            hoverComplete = {hoverCompletionBoard[i][j] ? true : false}/></td>)
        }
    }

    let finalDisplayBoard = [];

    for(let j = 0; j < blockudokuBoard.length; j++) {
        finalDisplayBoard.push(<tr key = {'row' + j}>{displayBoard.slice(j*blockudokuBoard.length, (j + 1)*blockudokuBoard.length)}</tr>)
    }

    return (
        <React.Fragment>
            <Modal show = {endGame}><Results score = {score} startNewGame={newGameHandler}></Results></Modal>
            <Modal show = {newGameModal}><NewGame /></Modal>
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

