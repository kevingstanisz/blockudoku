import React, {useState} from 'react';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input'
import { updateObject, checkValidity } from '../../utilities/Inputs';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './NewGame.module.css';

const NewGame = props => {

    const dispatch = useDispatch();
    const onNewGame = () => dispatch(actions.newGame());
    const onCancelNewGame = (redirect) => dispatch(actions.cancelNewGame(redirect));

    const newGameHandler = () => {
        onNewGame(false);
    }

    const cancelNewGameHandler = () => {
        onCancelNewGame();
    }

    return(
        <React.Fragment>
            <div className = {classes.CenterTop}><h3>NEW GAME?</h3></div>
            <Button clicked={newGameHandler} btnType="Success">YES</Button>
            <Button clicked={cancelNewGameHandler} btnType="Danger">CANCEL</Button>
        </React.Fragment>
    );
    
};

export default NewGame;