import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = props => {
    return(
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Board</NavigationItem>
            <NavigationItem link="/leaderboard">Leaderboard</NavigationItem>
        </ul>
    );
}


export default NavigationItems;