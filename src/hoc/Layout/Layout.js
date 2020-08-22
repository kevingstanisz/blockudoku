import React from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import ScrollLock, { TouchScrollable } from 'react-scrolllock';

const Layout = props => {
    // const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

    // const sideDrawerClosedHandler = () => {
    //     setSideDrawerIsVisible(false);
    // }

    // const sideDrawerToggleHandler = () => {
    //     setSideDrawerIsVisible(!sideDrawerIsVisible)
    // }

    return (
        <div className = {classes.WholePage}>
            <Toolbar
                 />
            <main className={classes.Content}>
                {props.children}
            </main>
        </div>
    )
}


// const mapStateToProps = state => {
//     return {
//         isAuthenticated: state.auth.token !== null
//     };
// };

export default Layout;