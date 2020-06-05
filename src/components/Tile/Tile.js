import React from 'react';
import classes from './Tile.module.css'

const tile = props => {
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
        <div className = {attachedClasses.join(' ')}/>
    );
}

export default tile;