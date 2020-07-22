import React from 'react';
import classes from './Score.module.css';
import {useDispatch, useSelector} from 'react-redux';

const Score = (props) => {
    const  score = useSelector(state => {
        return state.score
    });

    return(
        <div className = {classes.Score} >
            <h1>{score}</h1>
        </div>
    );
}

export default Score;