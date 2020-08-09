import React from 'react';

import classes from './NavigationButtons.module.css';
import NavigationButton from '../NavigationButton/NavigationButton';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../../../store/actions/index'

const NavigationButtons = props => {
    const dispatch = useDispatch();
    const onNewGame = () => dispatch(actions.newGame());

    const newGameHandler = () => {
        onNewGame();
    }

    return(
        <ul className={classes.NavigationItems}>
            <NavigationButton startNewGame={newGameHandler}>New Game</NavigationButton>
        </ul>
    );
}


export default NavigationButtons;