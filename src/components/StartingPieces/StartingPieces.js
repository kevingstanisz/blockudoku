import React from 'react';
import StartingPiece from './StartingPiece/StartingPiece';
import classes from './StartingPieces.module.css'
import createArray from '../../utilities/Create2DArray';
import randomStartingBlock from '../../utilities/RandomStartingBlock';

const startingPiece = props => {

    // if(props.newBlocks){
    //     let newPiece = randomStartingBlock();
    // }

    let newPieces = randomStartingBlock();

    return(
        <div className = {classes.ThreeLayout}>
            <StartingPiece id = {0} piece = {newPieces[0]}/>
            <StartingPiece id = {1} piece = {newPieces[1]}/>
            <StartingPiece id = {2} piece = {newPieces[2]}/>
        </div>
    )
}

export default startingPiece;