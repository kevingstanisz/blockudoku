import React from 'react';
import classes from './StartingPiece.module.css'
import Tile from '../../Tile/Tile'

const startingPiece = props => {

    // console.log(props.piece)

    // let starterPiece = [];

    // for(var i = 0; i < props.piece.length; i++) {
    //     var pieceRow = props.piece[i];
    //     //console.log(pieceRow.length);
    //     for(var j = 0; j < pieceRow.length; j++) {
    //         console.log(pieceRow[j])
    //         starterPiece.push(
    //             <Tile
    //                 isMini  = {true} 
    //                 emptyBlock = {pieceRow[j] ? false : true} 
    //                 blockOnTile = {pieceRow[j] ? true : false} 
    //                 nextToBlock = {pieceRow[j] || j == 0 ? false : pieceRow[j-1] ? true : false} 
    //                 belowBlock = {pieceRow[j] || i == 0 ? false : props.piece[i - 1][j] ? true : false} 
    //                 newLine = {j == 0 && i != 0 ? true : false}
    //             />
    //         )
    //     }
    // }

    let displayBoard = [];

    for(var i = 0; i < props.piece.length; i++) {
        var pieceRow = props.piece[i];
        for(var j = 0; j < pieceRow.length; j++) {
            displayBoard.push(<td className = {classes.ColumnSpacing} key = {'' + i + '' + j}>
                <Tile 
                    isMini  = {true} 
                    blockOnTile = {pieceRow[j] ? true : false} 
                    emptyBlock = {pieceRow[j] ? false : true} 
                    nextToBlock = {pieceRow[j] || j == 0 ? false : pieceRow[j-1] ? true : false} 
                    belowBlock = {pieceRow[j] || i == 0 ? false : props.piece[i - 1][j] ? true : false}
                />
            </td>)
        }
    }

    //console.log(displayBoard)
    let finalDisplayBoard = [];

    for(var j = 0; j < props.piece.length; j++) {
        console.log('hi');
        finalDisplayBoard.push(<tr key = {'row' + j}>{displayBoard.slice(j*props.piece.length, (j + 1)*props.piece.length)}</tr>)
    }

    console.log(finalDisplayBoard)


    return(
        <div className = {classes.Thirds}>
            <table className = {classes.PieceLayout}>
                <tbody>
                    {finalDisplayBoard}
                </tbody>
            </table>
        </div>
        // <div className = {classes.PieceLayout}>
        //     {displayBoard}
        //     {starterPiece}
        //     <Tile isMini  = {true} emptyBlock = {true}/>
        //     <Tile isMini  = {true} emptyBlock = {true}/>
        //     <Tile isMini  = {true} emptyBlock = {true}/>
        //     <Tile isMini  = {true} emptyBlock = {true}/>
        //     <Tile isMini  = {true} emptyBlock = {true} newLine = {true}/>
        //     <Tile isMini  = {true} blockOnTile = {true} />
        //     <Tile isMini  = {true} blockOnTile = {true}/>
        //     <Tile isMini  = {true} emptyBlock = {true}/>
        //     <Tile isMini  = {true} emptyBlock = {true} newLine = {true}/>
        //     <Tile isMini  = {true} blockOnTile = {true} />
        //     <Tile isMini  = {true} blockOnTile = {true}/>
        //     <Tile isMini  = {true} emptyBlock = {true}/>
        //     <Tile isMini  = {true} emptyBlock = {true} newLine = {true}/>
        //     <Tile isMini  = {true} emptyBlock = {true}/>
        //     <Tile isMini  = {true} emptyBlock = {true}/>
        //     <Tile isMini  = {true} emptyBlock = {true}/>
        // </div>
    )
}

export default startingPiece;