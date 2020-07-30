import React, {useState} from 'react';
import classes from './Tile.module.css';
import * as actions from '../../store/actions/index';
import {useDispatch, useSelector} from 'react-redux';

const Tile = props => {

    const dispatch = useDispatch();

    const onSetStarterPosition = (clientX, clientY, id) => dispatch(actions.setStarterPosition(clientX, clientY, id));
    const onSetBoardPosition = (clientX, clientY, tileSide) => dispatch(actions.setBoardPosition(clientX, clientY, tileSide));

    const initialized = useSelector(state => {
        return state.starterBlock[2].startingPos.x ? true : false
    });

    let attachedClasses = [classes.Normal];

    if(props.row % 3 === 0){
        attachedClasses.push(classes.LeftBorder)
    }

    if(props.row % 3 === 2){
        attachedClasses.push(classes.NoRightBorder)
    }

    if(props.column % 3 === 0){
        attachedClasses.push(classes.TopBorder)
    }

    if(props.column % 3 === 2){
        attachedClasses.push(classes.NoBottomBorder)
    }

    if(props.blockOnTile){
        attachedClasses.push(classes.BlockOnTile)
    }

    if(props.hoverOnTile){
        attachedClasses.push(classes.HoverOnTile)
    }

    if(props.isMini){
        attachedClasses.push(classes.IsMini)
    }

    if(props.newLine){
        attachedClasses.push(classes.NewLine)
    }

    if(props.emptyBlock){
        attachedClasses.push(classes.EmptyBlock)
    }

    if(props.nextToBlock){
        attachedClasses.push(classes.NextToBlock)
    }

    if(props.belowBlock){
        attachedClasses.push(classes.BelowBlock)
    }

    if(props.pickedUp){
        attachedClasses.push(classes.PickedUp)
    }

    if(props.hoverComplete){
        attachedClasses.push(classes.HoverComplete)
    }

    if(props.notPlaceable) {
        attachedClasses.push(classes.NotPlaceable)
    }

    return (
        <div className = {attachedClasses.join(' ')}
            ref={el => {
                    if (!el) return;
                    if(props.topLeft && !initialized){
                        if(props.isBoard){
                            onSetBoardPosition(el.getBoundingClientRect().left, el.getBoundingClientRect().top, el.getBoundingClientRect().width)
                        }
                        else{
                            onSetStarterPosition(el.getBoundingClientRect().left, el.getBoundingClientRect().top, props.blockId)
                        }
                    }
                }
            }
        />
    );
}

export default Tile;