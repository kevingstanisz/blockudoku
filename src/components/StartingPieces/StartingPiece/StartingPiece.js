import React, {useState, useMemo, useCallback, useEffect} from 'react';
import classes from './StartingPiece.module.css'
import Tile from '../../Tile/Tile'

const StartingPiece = props => {

    const POSITION = {x: 0, y: 0}

    const [state, setState] = useState({
        isDragging: false,
        origin: POSITION,
        translation: POSITION
    });

    const handleMouseDown = useCallback(({clientX, clientY}) => {
      setState(state => ({
          ...state,
          isDragging: true,
          origin: {x: clientX, y: clientY}
      }))  
    }, []);

    const handleMouseMove = useCallback(({clientX, clientY}) => {
        const translation = {x: clientX - state.origin.x, y: clientY - state.origin.y};

        console.log(translation);

        setState(state => ({
            ...state,
            translation
        }))
    }, [state.origin]);

    const handleMouseUp = useCallback(() => {
        setState(state => ({
            ...state,
            isDragging: false
        }))
    }, []);

    useEffect(() => {
        if(state.isDragging){
            window.addEventListener('mousemove', handleMouseMove)
            window.addEventListener('mouseup', handleMouseUp)
        } else {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)

            setState(state => ({...state, translation: POSITION}))
        }
    }, [state.isDragging, handleMouseMove, handleMouseUp]);

    const styles = useMemo(() => ({
        cursor: state.isDragging ? '-webkit-grabbing' : 'webkit-grab',
        transform: `translate(${state.translation.x}px, ${state.translation.y}px`,
        transistion: state.isDragging ? 'none' : 'transform 500ms',
        zIndex: state.isDragging ? 2 : 1,
        positon: state.isDragging ? 'absolute' : 'relative'
    }), [state.isDragging, state.translation])

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
        finalDisplayBoard.push(<tr key = {'row' + j}>{displayBoard.slice(j*props.piece.length, (j + 1)*props.piece.length)}</tr>)
    }

    console.log(finalDisplayBoard)


    return(
        <div className = {classes.Thirds} style = {styles} onMouseDown = {handleMouseDown}>
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

export default StartingPiece;