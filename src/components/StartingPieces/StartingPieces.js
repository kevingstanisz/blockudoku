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
    console.log(newPieces);

    return(
        <div className = {classes.ThreeLayout}>
            <StartingPiece piece = {newPieces[0]}/>
            <StartingPiece piece = {newPieces[1]}/>
            <StartingPiece piece = {newPieces[2]}/>
        </div>
    )
}

export default startingPiece;