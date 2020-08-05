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

    let highScore = null;
    let highScoreRank = 0;
    let recentScore = null;
    let recentScoreRank = 0;

    for(let i = 0; i < results.length; i++){
        if(JSON.parse(localStorage.getItem("highscore")) == results[i].id){
            if(i > 9){
                highScore = results[i];
                highScoreRank = i + 1
            }
        }

        if(JSON.parse(localStorage.getItem("lastscore")) == results[i].id){
            if(i > 9 && (localStorage.getItem("lastscore") !== localStorage.getItem("highscore"))){
                recentScore = results[i];
                recentScoreRank = i + 1
            }
            break;
        }
    }

    let userHighScore = null;
    let userRecentScore = null;

    if(highScore !== null){
        userHighScore = (
            <LeaderCard
                key={highScore.id}
                place={highScoreRank}
                name={highScore.name}
                score={highScore.score}
                highlight = {true} />
        );
    }

    if(recentScore !== null){
        userRecentScore = (
            <LeaderCard
                key={recentScore.id}
                place={recentScoreRank}
                name={recentScore.name}
                score={recentScore.score}
                highlight = {true}/>
        );
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
                    id={rslt.id}
                    place={index + 1}
                    name={rslt.name}
                    score={rslt.score}
                    highlight = {false} />
            ) )}
            {userHighScore}
            {userRecentScore}
        </React.Fragment>
    );
}

export default Leaderboard;