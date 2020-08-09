import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import NavigationButton from './NavigationButton/NavigationButton';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../../store/actions/index'

const NavigationItems = props => {
    return(
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Board</NavigationItem>
            <NavigationItem link="/leaderboard">Leaderboard</NavigationItem>
        </ul>
    );
}


export default NavigationItems;