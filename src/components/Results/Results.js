import React, {useState} from 'react';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input'
import { updateObject, checkValidity } from '../../utilities/Inputs';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './Results.module.css';

const Results = props => {

    const dispatch = useDispatch();
    const onFetchResults = () => dispatch(actions.fetchResults());
    const onCheckUsername = (results) => dispatch(actions.checkUsername(results));

    const finalScore = useSelector(state => {
        return state.score;
    }); 

    const results = useSelector(state => {
        return state.results;
    }); 

    const badUsername = useSelector(state => {
        return state.badInput;
    }); 

    if(!results.length){
        onFetchResults();
    }

    const [authForm, setAuthForm] = useState({
            name:{
                elementType: 'input',
                elementConfig: {
                    type: 'name',
                    placeholder: 'Name Here'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: false,
                    minLength: 3
                },
                valid: false,
                lockButton: false,
                touched: false
            }
        
    })

    const inputChangedHandler = ( event, controlName ) => {
        //console.log(authForm[controlName].validation)
        const updatedControls = updateObject( authForm, {
            [controlName]: updateObject( authForm[controlName], {
                value: event.target.value,
                valid: checkValidity( event.target.value, authForm[controlName].validation ),
                touched: true,
                lockButton: false
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

        const updatedControls = updateObject( authForm, {
            ['name']: updateObject( authForm['name'], {
                lockButton: true
            } )
        } );
        setAuthForm(updatedControls);
        
        onCheckUsername(results)
    }

    const formElementsArray = [];
    for ( let key in authForm ) {
        formElementsArray.push( {
            id: key,
            config: authForm[key]
        } );
    }

    //console.log(formElementsArray[0].config.valid)

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

    let errorMessage = null; 

    if(badUsername){
        errorMessage = <p className = {classes.RedBold}>Invalid Name - Please enter appropriate name.</p>
    }

    return(
        <React.Fragment>
            <div className = {classes.CenterTop}>
            <h3>GAME OVER</h3>
            <p>Score: {props.score}</p>
            </div>
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <Button disabled={!formElementsArray[0].config.valid || authForm.name.lockButton} btnType="Success">SAVE NAME AND SCORE</Button>
            </form>
            <Button clicked={props.startNewGame} btnType="Danger">DON'T SAVE</Button>
        </React.Fragment>
    );
    
};

export default Results;