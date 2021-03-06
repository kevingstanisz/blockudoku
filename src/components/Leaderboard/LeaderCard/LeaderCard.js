import React from 'react';
import classes from './LeaderCard.module.css';

const LeaderCard = (props) => {

    let attachedClasses = [classes.CardStyle];

    if(props.place === "Rank"){
        attachedClasses.push(classes.TableHeader)
    }
    else if(props.place % 2) {
        attachedClasses.push(classes.LightGrey)
    }
    else{
        attachedClasses.push(classes.DarkGrey)
    }

    if(localStorage.getItem("lastscore") !== null){
        if(props.highlight || (localStorage.getItem("highscore").replace(/['"]+/g, '') === props.id) || (localStorage.getItem("lastscore").replace(/['"]+/g, '') === props.id)){
            attachedClasses.push(classes.HighlightedRow)
            attachedClasses.push(classes.signpost)
        }
    }
    return(
        <div className = {attachedClasses.join(' ')}>
            <table className = {classes.CenterVertical}>
                <tbody>
                    <tr>
                        <td className = {classes.FirstChild}>{props.place}</td>
                        <td className = {classes.SecondChild}>{props.name}</td>
                        <td className = {classes.ThirdChild}>{props.score}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default LeaderCard;