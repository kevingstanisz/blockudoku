import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationButton.module.css';
import Button from '../../../UI/Button/Button';
import {useDispatch, useSelector} from 'react-redux';

const NavigationButton = props => {
    
    return(
        <li className={classes.NavigationItem}>
            <Button clicked={props.startNewGame}>this is a button</Button>
        </li>
    );

}

export default NavigationButton;