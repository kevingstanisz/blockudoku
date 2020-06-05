import * as actionTypes from './actionTypes'

export const pickUpBlock = ({clientX, clientY}, id) => {
    console.log('action');
    console.log(id);

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

export const resetBlock = (id) => {
    return{
        type: actionTypes.RESET_BLOCK,
        id: id
    }
}