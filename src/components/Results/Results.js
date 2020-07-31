import React, {useState} from 'react';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input'
import { updateObject, checkValidity } from '../../utilities/Inputs';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../store/actions/index';

const Results = props => {

    const dispatch = useDispatch();
    const onStoreResults = (order) => dispatch(actions.storeResults(order));

    const finalScore = useSelector(state => {
        return state.score;
    }); 

    const [authForm, setAuthForm] = useState({
            name:{
                elementType: 'input',
                elementConfig: {
                    type: 'name',
                    placeholder: 'Name Here'
                },
                value: '',
                validation: {
                    required: false,
                    isEmail: false
                },
                valid: false,
                touched: false
            }
        
    })

    const inputChangedHandler = ( event, controlName ) => {
        console.log(authForm[controlName].validation)
        const updatedControls = updateObject( authForm, {
            [controlName]: updateObject( authForm[controlName], {
                value: event.target.value,
                valid: checkValidity( event.target.value, authForm[controlName].validation ),
                touched: true
            } )
        } );
        setAuthForm(updatedControls);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in authForm) {
            formData[formElementIdentifier] = authForm[formElementIdentifier].value;
        }
        const results = {
            score: finalScore,
            name: formData.name
        }

        onStoreResults(results);
    }

    const formElementsArray = [];
    for ( let key in authForm ) {
        formElementsArray.push( {
            id: key,
            config: authForm[key]
        } );
    }

    console.log(formElementsArray[0].config.valid)

    let form = formElementsArray.map( formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={( event ) => inputChangedHandler( event, formElement.id )} />
    ) );


    // const ingredientSummary = Object.keys(this.props.ingredients)
    // .map(igKey => {
    //     return <li key = {igKey}><span style = {{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>;
    // })

    return(
        <React.Fragment>
            <h3>Bummer</h3>
            <p>You Lost</p>
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success">NEW GAME</Button>
            </form>
        </React.Fragment>
    );
    
};

export default Results;