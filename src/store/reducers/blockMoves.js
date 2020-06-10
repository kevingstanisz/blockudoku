import * as actionTypes from '../actions/actionTypes'
import startingPiece from '../../components/StartingPieces/StartingPieces'

const POSITION = {x: 0, y: 0}

const intialState = {
    starterBlock : [
        {isDragging: false, origin: POSITION, translation: POSITION, startingPos: POSITION, name: ''},
        {isDragging: false, origin: POSITION, translation: POSITION, startingPos: POSITION, name: ''},
        {isDragging: false, origin: POSITION, translation: POSITION, startingPos: POSITION, name: ''}
    ],
    activeBlock: -1,
    boardPos : {
        startingPos: POSITION, tileSize: 0
    },
    incrementer: 0    
}

const reducer = (state = intialState, action) => {
    switch(action.type){
        case actionTypes.PICK_UP_BLOCK: 
            return{
                ...state,
                activeBlock: action.id,
                starterBlock: state.starterBlock.map(
                    (starterBlock, i) => i === action.id ? {...starterBlock, isDragging: true, origin:  {x: action.clientX, y: action.clientY}}
                                                        :starterBlock
                    )
            } ;

        case actionTypes.SET_DOWN_BLOCK: 
            return{
                ...state,
                starterBlock: state.starterBlock.map(
                    (starterBlock, i) => i === action.id ? {...starterBlock, isDragging: false}
                                                        :starterBlock
                    )
            } ;

        case actionTypes.MOVE_BLOCK: 
            const translation = {x: action.clientX - state.starterBlock[action.id].origin.x, y: action.clientY - state.starterBlock[action.id].origin.y};

            return{
                ...state,
                starterBlock: state.starterBlock.map(
                    (starterBlock, i) => i === action.id ? {...starterBlock, translation: translation}
                                                        :starterBlock
                    )
            };
        
        case actionTypes.RESET_BLOCK: 
            return{
                ...state,
                activeBlock: -1,
                starterBlock: state.starterBlock.map(
                    (starterBlock, i) => i === action.id ? {...starterBlock, translation: POSITION}
                                                        :starterBlock
                    )
            };

        case actionTypes.SET_STARTER_POSITION: 
            return{
                ...state,
                starterBlock: state.starterBlock.map(
                    (starterBlock, i) => i === action.id ? {...starterBlock, startingPos: {x: action.posX, y: action.posY}}
                                                        :starterBlock
                    )
            };

        case actionTypes.SET_BOARD_POSITION: 
            return{
                ...state,
                boardPos: {
                    ...state.boardPos,
                    startingPos: {x: action.posX, y: action.posY},
                    tileSize: action.tileSide
                }
            };

        case actionTypes.SET_STARTER_NAMES: 
            return{
                ...state,
                starterBlock: state.starterBlock.map(
                    (starterBlock, i) => i > -1 ? {...starterBlock, name: action.starterArray[i].name}
                                                        :starterBlock
                    )
            };

        default: 
            return state;
    }
}

export default reducer;