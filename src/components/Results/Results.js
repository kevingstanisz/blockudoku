import React, {Component} from 'react';
import Button from '../UI/Button/Button';

class OrderSummary extends Component {

    render() {
        // const ingredientSummary = Object.keys(this.props.ingredients)
        // .map(igKey => {
        //     return <li key = {igKey}><span style = {{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>;
        // })

        return(
            <React.Fragment>
                <h3>Bummer</h3>
                <p>You Lost</p>
                <Button btnType = "Success" clicked = {this.props.newGame}>NEW GAME</Button>
            </React.Fragment>
        );
    }
};

export default OrderSummary;