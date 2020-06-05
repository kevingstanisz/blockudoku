import * as actionTypes from '../actions/actionTypes'
import startingPiece from '../../components/StartingPieces/StartingPieces'

const POSITION = {x: 0, y: 0}

const intialState = {
    starterBlock : [
        {isDragging: false, origin: POSITION, translation: POSITION},
        {isDragging: false, origin: POSITION, translation: POSITION},
        {isDragging: false, origin: POSITION, translation: POSITION}
    ]
}

const reducer = (state = intialState, action) => {
    switch(action.type){
        case actionTypes.PICK_UP_BLOCK: 
            return{
                ...state,
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
                starterBlock: state.starterBlock.map(
                    (starterBlock, i) => i === action.id ? {...starterBlock, translation: POSITION}
                                                        :starterBlock
                    )
            };

        default: 
            return state;
    }
}

export default reducer;