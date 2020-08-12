import React from 'react';
import classes from './Score.module.css';
import {useDispatch, useSelector} from 'react-redux';

const Score = (props) => {
    const  score = useSelector(state => {
        return state.score
    });

    return(
        <div className = {classes.Score}>
            <div className = {classes.ScoreCenter}>{score}</div>
            <div className = {classes.ScoreAdd}>+42 COMBO!</div>
        </div>
    );
}

export default Score;