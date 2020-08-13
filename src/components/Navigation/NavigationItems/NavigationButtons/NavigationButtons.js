import React from 'react';

import classes from './NavigationButtons.module.css';
import NavigationButton from '../NavigationButton/NavigationButton';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../../../store/actions/index'

const NavigationButtons = props => {
    const dispatch = useDispatch();
    const onNewGameModal = () => dispatch(actions.newGameModal());

    const newGameHandler = () => {
        onNewGameModal();
    }

    return(
        <ul className={classes.NavigationItems}>
            <NavigationButton startNewGame={newGameHandler}>New Game</NavigationButton>
        </ul>
    );
}


export default NavigationButtons;