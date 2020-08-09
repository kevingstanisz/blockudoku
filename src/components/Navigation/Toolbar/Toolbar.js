import React from 'react';

import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import NavigationButtons from '../NavigationItems/NavigationButtons/NavigationButtons';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = ( props ) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
        <nav className={classes.DesktopOnly}>
            <NavigationButtons isAuthenticated={props.isAuth} />
        </nav>
    </header>
);

export default toolbar;