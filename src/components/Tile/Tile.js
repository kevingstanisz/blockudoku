import React, {useState} from 'react';
import classes from './Tile.module.css';
import * as actions from '../../store/actions/index';
import {useDispatch, useSelector} from 'react-redux';

const Tile = props => {

    const dispatch = useDispatch();

    const onSetStarterPosition = (clientX, clientY, id) => dispatch(actions.setStarterPosition(clientX, clientY, id));
    const onSetBoardPosition = (clientX, clientY, tileSide) => dispatch(actions.setBoardPosition(clientX, clientY, tileSide));

    let attachedClasses = [classes.Normal];

    if(props.column % 3 === 0){
        attachedClasses.push(classes.LeftBorder)
    }

    if(props.column % 3 === 2){
        attachedClasses.push(classes.NoRightBorder)
    }

    if(props.row % 3 === 0){
        attachedClasses.push(classes.TopBorder)
    }

    if(props.row % 3 === 2){
        attachedClasses.push(classes.NoBottomBorder)
    }

    if(props.blockOnTile){
        attachedClasses.push(classes.BlockOnTile)
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

    return (
        <div className = {attachedClasses.join(' ')}
            ref={el => {
                    if (!el) return;
                    //console.log(props.topLeft)
                    //console.log(el.getBoundingClientRect().height);
                    if(props.topLeft){
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