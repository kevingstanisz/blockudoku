import React from 'react';
import classes from './Score.module.css';
import {useDispatch, useSelector} from 'react-redux';

const Score = (props) => {
    const score = useSelector(state => {
        return state.score
    });

    const addedScore = useSelector(state => {
        return state.addScore
    });

    const consecRemoved = useSelector(state => {
        return state.consecutiveRemoved
    });

    let attachedClasses = [classes.ScoreAdd]; 

    let scoreString = "";

    if(addedScore > 36){
        scoreString = ("Combo! +" + addedScore)
        attachedClasses = [classes.ScoreAddExcited, classes.ShowExcited];
    }
    else if(consecRemoved > 1){
        scoreString = ("Wow! +" + addedScore)
        attachedClasses = [classes.ScoreAddExcited, classes.ShowExcited];
    }
    else if(addedScore > 16){
        scoreString = ("+" + addedScore)
        attachedClasses = [classes.ScoreAdd, classes.ShowNormal];
    }

    

    return(
        <div className = {classes.Score}>
            <div className = {classes.ScoreCenter}>{score}</div>
    <div className = {attachedClasses.join(' ')}>{scoreString}</div>
        </div>
    );
}

export default Score;