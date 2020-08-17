import React from 'react';
import classes from './NavigationButton.module.css';
import Button from '../../../UI/Button/Button';

const NavigationButton = props => {
    
    return(
        <li className={classes.NavigationItem}>
            <Button clicked={props.startNewGame}>{props.children}</Button>
        </li>
    );

}

export default NavigationButton;