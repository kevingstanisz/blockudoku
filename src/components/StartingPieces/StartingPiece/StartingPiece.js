import React, {useMemo, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import classes from './StartingPiece.module.css';
import Tile from '../../Tile/Tile';
import * as actions from '../../../store/actions/index';

const StartingPiece = props => {

    const dispatch = useDispatch();

    const isDragging = useSelector(state => {
        return state.starterBlock[props.id].isDragging
    });

    const translation = useSelector(state => {
        return state.starterBlock[props.id].translation
    });

    const origin = useSelector(state => {
        return state.starterBlock[props.id].origin
    });

    const activeBlock = useSelector(state => {
        return state.activeBlock
    });

    const hideBlock = useSelector(state => {
        return state.starterBlock[props.id].placed
    });

    const blockPlaceable = useSelector(state => {
        return state.starterBlock[props.id].placeable
    });

    const onPickUpBlock = (event, id) => dispatch(actions.pickUpBlock(event, id));
    const onSetDownBlock = (id) => dispatch(actions.setDownBlock(id));
    const onMoveBlock = (event, id) => dispatch(actions.moveBlock(event, id));
    const onResetBlock = (id) => dispatch(actions.resetBlock(id));

    const handleMouseDown = useCallback((event) => {
        onPickUpBlock(event.touches[0], props.id)
    }, []);

    const handleMouseMove = useCallback((event) => {
        onMoveBlock(event.touches[0], props.id)
    }, [origin]);

    const handleMouseUp = useCallback(() => {
        onSetDownBlock(props.id);
    }, []);

    useEffect(() => {
        if(isDragging){
            window.addEventListener('touchmove', handleMouseMove)
            window.addEventListener('touchend', handleMouseUp)
        } else {
            window.removeEventListener('touchmove', handleMouseMove)
            window.removeEventListener('touchend', handleMouseUp)

            onResetBlock(props.id);
        }
    }, [isDragging, handleMouseMove, handleMouseUp]);

    const styles = useMemo(() => ({
        cursor: isDragging ? '-webkit-grabbing' : 'webkit-grab',
        transform: `translate(${translation.x}px, ${translation.y}px`,
        transistion: isDragging ? 'none' : 'transform 500ms',
        zIndex: isDragging ? 2 : 1,
        positon: isDragging ? 'absolute' : 'relative'
    }), [isDragging, translation])

    let displayBoard = [];

    for(let i = 0; i < props.piece.length; i++) {
        let pieceRow = props.piece[i];
        for(let j = 0; j < pieceRow.length; j++) {
            displayBoard.push(<td className = {classes.ColumnSpacing} key = {'' + i + '' + j}>
                <Tile
                    topLeft = {i === 0 && j === 0 ? true : false} 
                    blockId = {props.id}
                    isMini  = {true} 
                    pickedUp = {props.id === activeBlock  ? true : false}
                    blockOnTile = {pieceRow[j] ? true : false} 
                    emptyBlock = {pieceRow[j] ? false : true} 
                    nextToBlock = {props.id === activeBlock ? false : pieceRow[j] || j === 0 ? false : pieceRow[j-1] ? true : false} 
                    belowBlock = {props.id === activeBlock ? false : pieceRow[j] || i === 0 ? false : props.piece[i - 1][j] ? true : false}
                    notPlaceable = {!pieceRow[j] ? false : !blockPlaceable ? true : false}
                />
            </td>)
        }
    }

    let finalDisplayBoard = [];

    for(let j = 0; j < props.piece.length; j++) {
        finalDisplayBoard.push(<tr key = {'row' + j}>{displayBoard.slice(j*props.piece.length, (j + 1)*props.piece.length)}</tr>)
    }

    let attachedClasses = [classes.Thirds];

    if(hideBlock){
        attachedClasses.push(classes.HidePiece)
    }

    return(
        <div className = {attachedClasses.join(' ')} style = {styles} onTouchStart = {handleMouseDown}>
            <table className = {classes.PieceLayout}>
                <tbody>
                    {finalDisplayBoard}
                </tbody>
            </table>
        </div>
    )
}

export default StartingPiece;