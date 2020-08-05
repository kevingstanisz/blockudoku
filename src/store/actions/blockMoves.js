import * as actionTypes from './actionTypes'
import createArray from '../../utilities/Create2DArray';
import axios from '../../axios-standings';

export const pickUpBlock = ({clientX, clientY}, id) => {
    return{
        type: actionTypes.PICK_UP_BLOCK,
        clientX: clientX,
        clientY: clientY,
        id: id
    }
}

export const setDownBlock = (id) => {
    return{
        type: actionTypes.SET_DOWN_BLOCK,
        id: id
    }
}

export const moveBlock = ({clientX, clientY}, id) => {
    return{
        type: actionTypes.MOVE_BLOCK,
        clientX: clientX,
        clientY: clientY,
        id: id
    }
}

export const resetBlock = (id, addedScore) => {
    let hideBlock = false

    if(addedScore > 0){
        hideBlock = true
    }

    return{
        type: actionTypes.RESET_BLOCK,
        id: id,
        hideBlock: hideBlock
    }
}

export const setStarterPosition = (posX, posY, id) => {
    return{
        type: actionTypes.SET_STARTER_POSITION,
        posX: posX,
        posY: posY,
        id: id
    }
}

export const setBoardPosition = (posX, posY, sideLength) => {
    return{
        type: actionTypes.SET_BOARD_POSITION,
        posX: posX,
        posY: posY,
        tileSide: sideLength
    }
}

export const setStarterNames = (starterArray) => {
    return{
        type: actionTypes.SET_STARTER_NAMES,
        starterArray: starterArray
    }
}

export const setBoard = (boardArray) => {
    return{
        type: actionTypes.SET_BOARD,
        boardArray: boardArray
    }
}

export const calculateCompletion = () => {
    return{
        type: actionTypes.CALCULATE_COMPLETION,
    }
}

export const updateScore = (addedScore) => {
    return{
        type: actionTypes.UPDATE_SCORE,
        addedScore: addedScore
    }
}

export const blocksGenerated = () => {
    return{
        type: actionTypes.BLOCKS_GENERATED,
    }
}

export const newGame = () => {
    return{
        type: actionTypes.NEW_GAME,
        boardArray: createArray(9,9)
    }
}

export const storeResults = (results) => {
    return dispatch => {
        dispatch(newGame());
        axios.post('/results.json', results)
            .then(response => {
                console.log('hi');
                dispatch(fetchResults());
            })
            .catch(error => {
                console.log('hello');
                //dispatch(purchaseBurgerFail(error));
            });
    }
}

export const fetchResultsSuccess = (results) => {
    return{
        type: actionTypes.FETCH_RESULTS_SUCCESS,
        results: results
    }
}

export const fetchResults = () => {
    return dispatch => {
        //dispatch(fetchOrdersStart());
        axios.get('/results.json')
        .then(res => {
            const fetchResults = [];
            for (let key in res.data){
                fetchResults.push({
                    ...res.data[key],
                    id: key
                });
            }

            fetchResults.sort((a, b) => {
                if (a.score > b.score)
                    return -1;
                if (a.score < b.score)
                    return 1;
                return 0;
            });
            dispatch(fetchResultsSuccess(fetchResults))
        })
        .catch(err => {
            console.log(err);
            //dispatch(fetchOrdersFail(err))
        });
    }
}

export const resumeOldGame = () => {
    return{
        type: actionTypes.RESUME_OLD_GAME,
    }
}