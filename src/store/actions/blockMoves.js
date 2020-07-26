import * as actionTypes from './actionTypes'

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

export const calculateCompletion = (boardArray) => {
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

