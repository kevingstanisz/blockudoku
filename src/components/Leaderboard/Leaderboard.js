import React, {useState} from 'react';
import classes from './Leaderboard.module.css'
import LeaderCard from './LeaderCard/LeaderCard'
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../store/actions/index';

const Leaderboard = props => {

    const dispatch = useDispatch();
    const onFetchResults = () => dispatch(actions.fetchResults());

    const results = useSelector(state => {
        return state.results;
    }); 

    if(!results.length){
        onFetchResults();
    }

    return (
        <React.Fragment>
            <LeaderCard
                    key={0}
                    place={"Rank"}
                    name={"Player"}
                    score={"Score"} />

            {results.slice(0, 10).map( (rslt, index) => (
                <LeaderCard
                    key={rslt.id}
                    place={index + 1}
                    name={rslt.name}
                    score={rslt.score} />
            ) )}
        </React.Fragment>
    );
}

export default Leaderboard;