import React from 'react';
import StartingPiece from './StartingPiece/StartingPiece';
import classes from './StartingPieces.module.css'
import createArray from '../../utilities/Create2DArray';
import randomStartingBlock from '../../utilities/RandomStartingBlock';
import * as actions from '../../store/actions/index';
import {useDispatch, useSelector} from 'react-redux';

const StartingPieces = props => {

    const dispatch = useDispatch();

    const onSetStarterNames = (starterArray) => dispatch(actions.setStarterNames(starterArray))

    // if(props.newBlocks){
    //     let newPiece = randomStartingBlock();
    // }

    let newPieces = randomStartingBlock();
    onSetStarterNames(newPieces);

    return(
        <div className = {classes.ThreeLayout}>
            <StartingPiece id = {0} piece = {newPieces[0].block}/>
            <StartingPiece id = {1} piece = {newPieces[1].block}/>
            <StartingPiece id = {2} piece = {newPieces[2].block}/>
        </div>
    )
}

export default StartingPieces;