import React from 'react';
import StartingPiece from './StartingPiece/StartingPiece';
import classes from './StartingPieces.module.css'
import createArray from '../../utilities/Create2DArray';
import randomStartingBlock from '../../utilities/RandomStartingBlock';
import {setBlock} from '../../utilities/RandomStartingBlock';
import * as actions from '../../store/actions/index';
import {useDispatch, useSelector} from 'react-redux';

const StartingPieces = props => {

    const dispatch = useDispatch();

    const onSetStarterNames = (starterArray) => dispatch(actions.setStarterNames(starterArray))
    const onBlocksGenerated = () => dispatch(actions.blocksGenerated())
    const onCalculateCompletion = () => dispatch(actions.calculateCompletion());

    const generateNewBlocks = useSelector(state => {
        return state.generateNewBlocks;
    }); 

    const starterPieces = useSelector(state => {
        return state.starterBlock;
    }); 

    let newPieces = new Array(starterPieces.length)
    if(generateNewBlocks){
        newPieces = randomStartingBlock();
        onSetStarterNames(newPieces);
        onBlocksGenerated();
        onCalculateCompletion();
    }

    return(
        <div className = {classes.ThreeLayout}>
            <StartingPiece id = {0} piece = {generateNewBlocks ? newPieces[0].block : setBlock(starterPieces[0].name)}/>
            <StartingPiece id = {1} piece = {generateNewBlocks ? newPieces[1].block : setBlock(starterPieces[1].name)}/>
            <StartingPiece id = {2} piece = {generateNewBlocks ? newPieces[2].block : setBlock(starterPieces[2].name)}/>
        </div>
    )
}

export default StartingPieces;