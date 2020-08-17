export function setBlock(chosenBlock){
    let block = []

    switch(chosenBlock){
        case 'square':
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 1, 1, 0, 0]);
            block.push([0, 1, 1, 0, 0]);
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 0, 0, 0]);

            return block;

        case 'tUp':
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 1, 0, 0]);
            block.push([0, 0, 1, 0, 0]);
            block.push([0, 1, 1, 1, 0]);
            block.push([0, 0, 0, 0, 0]);

            return block;

        case 'tDown':
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 1, 1, 1, 0]);
            block.push([0, 0, 1, 0, 0]);
            block.push([0, 0, 1, 0, 0]);
            block.push([0, 0, 0, 0, 0]);

            return block;

        case 'tRight':
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 1, 0, 0, 0]);
            block.push([0, 1, 1, 1, 0]);
            block.push([0, 1, 0, 0, 0]);
            block.push([0, 0, 0, 0, 0]);

            return block;

        case 'tLeft':
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 0, 1, 0]);
            block.push([0, 1, 1, 1, 0]);
            block.push([0, 0, 0, 1, 0]);
            block.push([0, 0, 0, 0, 0]);
                
            return block;
        
        case 'twoAndTwoUp':
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 1, 0, 0]);
            block.push([0, 1, 1, 0, 0]);
            block.push([0, 1, 0, 0, 0]);
            block.push([0, 0, 0, 0, 0]);

            return block;

        case 'twoAndTwoRight':
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 1, 1, 0]);
            block.push([0, 1, 1, 0, 0]);
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 0, 0, 0]);

            return block;
        
        case 'twoAndTwoDown':
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 1, 0, 0, 0]);
            block.push([0, 1, 1, 0, 0]);
            block.push([0, 0, 1, 0, 0]);
            block.push([0, 0, 0, 0, 0]);

            return block;

        case 'twoAndTwoLeft':
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 1, 1, 0, 0]);
            block.push([0, 0, 1, 1, 0]);
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 0, 0, 0]);

            return block;

        case 'fiveUp':
            block.push([0, 0, 1, 0, 0]);
            block.push([0, 0, 1, 0, 0]);
            block.push([0, 0, 1, 0, 0]);
            block.push([0, 0, 1, 0, 0]);
            block.push([0, 0, 1, 0, 0]);

            return block;

        case 'fiveRight':
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 0, 0, 0]);
            block.push([1, 1, 1, 1, 1]);
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 0, 0, 0]);

            return block;

        case 'fourUp':
            block.push([0, 0, 1, 0, 0]);
            block.push([0, 0, 1, 0, 0]);
            block.push([0, 0, 1, 0, 0]);
            block.push([0, 0, 1, 0, 0]);
            block.push([0, 0, 0, 0, 0]);

            return block;

        case 'fourRight':
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 1, 1, 1, 1]);
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 0, 0, 0]);
                
            return block;
        
        case 'threeUp':
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 1, 0, 0]);
            block.push([0, 0, 1, 0, 0]);
            block.push([0, 0, 1, 0, 0]);
            block.push([0, 0, 0, 0, 0]);

            return block;

        case 'threeRight':
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 1, 1, 1, 0]);
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 0, 0, 0]);

            return block;
        
        case 'twoUp':
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 1, 0, 0]);
            block.push([0, 0, 1, 0, 0]);
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 0, 0, 0]);

            return block;

        case 'twoRight':
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 1, 1, 0]);
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 0, 0, 0]);

            return block;

        case 'one':
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 1, 0, 0]);
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 0, 0, 0]);

            return block;

        case 'smallTUp':
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 1, 0, 0]);
            block.push([0, 1, 1, 1, 0]);
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 0, 0, 0]);

            return block;

        case 'smallTDown':
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 1, 1, 1, 0]);
            block.push([0, 0, 1, 0, 0]);
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 0, 0, 0]);
                
            return block;
        
        case 'smallTRight':
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 1, 0, 0]);
            block.push([0, 0, 1, 1, 0]);
            block.push([0, 0, 1, 0, 0]);
            block.push([0, 0, 0, 0, 0]);

            return block;

        case 'smallTLeft':
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 1, 0, 0]);
            block.push([0, 1, 1, 0, 0]);
            block.push([0, 0, 1, 0, 0]);
            block.push([0, 0, 0, 0, 0]);

            return block;

        case 'smallBottomLeftCorner':
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 1, 0, 0, 0]);
            block.push([0, 1, 1, 0, 0]);
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 0, 0, 0]);

            return block;
        
        case 'smallBottomRightCorner':
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 1, 0, 0]);
            block.push([0, 1, 1, 0, 0]);
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 0, 0, 0]);

            return block;

        case 'smallTopLeftCorner':
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 1, 1, 0, 0]);
            block.push([0, 1, 0, 0, 0]);
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 0, 0, 0]);
                
            return block;
        
        case 'smallTopRightCorner':
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 1, 1, 0, 0]);
            block.push([0, 0, 1, 0, 0]);
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 0, 0, 0]);

            return block;

        case 'lBottom':
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 1, 1, 1, 0]);
            block.push([0, 0, 0, 1, 0]);
            block.push([0, 0, 0, 0, 0]);

            return block;
        
        case 'lTop':
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 0, 1, 0]);
            block.push([0, 1, 1, 1, 0]);
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 0, 0, 0]);

            return block;

        case 'lRight':
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 1, 0, 0]);
            block.push([0, 0, 1, 0, 0]);
            block.push([0, 0, 1, 1, 0]);
            block.push([0, 0, 0, 0, 0]);

            return block;

        case 'lLeft':
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 1, 0, 0]);
            block.push([0, 0, 1, 0, 0]);
            block.push([0, 1, 1, 0, 0]);
            block.push([0, 0, 0, 0, 0]);

            return block;

        case 'bigBottomRightCorner':
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 0, 1, 0]);
            block.push([0, 0, 0, 1, 0]);
            block.push([0, 1, 1, 1, 0]);
            block.push([0, 0, 0, 0, 0]);

            return block;

        case 'bigBottomLeftCorner':
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 1, 0, 0, 0]);
            block.push([0, 1, 0, 0, 0]);
            block.push([0, 1, 1, 1, 0]);
            block.push([0, 0, 0, 0, 0]);

            return block;

        case 'bigTopRightCorner':
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 1, 1, 1, 0]);
            block.push([0, 0, 0, 1, 0]);
            block.push([0, 0, 0, 1, 0]);
            block.push([0, 0, 0, 0, 0]);
                
            return block;
        
        case 'bigTopLeftCorner':
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 1, 1, 1, 0]);
            block.push([0, 1, 0, 0, 0]);
            block.push([0, 1, 0, 0, 0]);
            block.push([0, 0, 0, 0, 0]);

            return block;

        case 'threeStaircaseUp':
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 0, 1, 0]);
            block.push([0, 0, 1, 0, 0]);
            block.push([0, 1, 0, 0, 0]);
            block.push([0, 0, 0, 0, 0]);

            return block;

        case 'threeStaircaseDown':
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 1, 0, 0, 0]);
            block.push([0, 0, 1, 0, 0]);
            block.push([0, 0, 0, 1, 0]);
            block.push([0, 0, 0, 0, 0]);

            return block;

        case 'fourStaircaseUp':
            block.push([0, 0, 0, 0, 1]);
            block.push([0, 0, 0, 1, 0]);
            block.push([0, 0, 1, 0, 0]);
            block.push([0, 1, 0, 0, 0]);
            block.push([0, 0, 0, 0, 0]);

            return block;
        
        case 'fourStaircaseDown':
            block.push([1, 0, 0, 0, 0]);
            block.push([0, 1, 0, 0, 0]);
            block.push([0, 0, 1, 0, 0]);
            block.push([0, 0, 0, 1, 0]);
            block.push([0, 0, 0, 0, 0]);

            return block;

        case 'plus':
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 1, 0, 0]);
            block.push([0, 1, 1, 1, 0]);
            block.push([0, 0, 1, 0, 0]);
            block.push([0, 0, 0, 0, 0]);

            return block;

        case 'uUp':
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 1, 0, 1, 0]);
            block.push([0, 1, 1, 1, 0]);
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 0, 0, 0]);

            return block;

        case 'uDown':
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 1, 1, 1, 0]);
            block.push([0, 1, 0, 1, 0]);
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 0, 0, 0]);

            return block;

        case 'uRight':
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 0, 1, 1, 0]);
            block.push([0, 0, 1, 0, 0]);
            block.push([0, 0, 1, 1, 0]);
            block.push([0, 0, 0, 0, 0]);

            return block;

        case 'uLeft':
            block.push([0, 0, 0, 0, 0]);
            block.push([0, 1, 1, 0, 0]);
            block.push([0, 0, 1, 0, 0]);
            block.push([0, 1, 1, 0, 0]);
            block.push([0, 0, 0, 0, 0]);
                
            return block;

        default: 
            return block;
    }
}



// let twoUpTwoOver = []
// twoUpTwoOver.push([0, 0, 0, 0]);
// twoUpTwoOver.push([0, 0, 1, 1]);
// twoUpTwoOver.push([0, 1, 1, 0]);
// twoUpTwoOver.push([0, 0, 0, 0]);

// let smalltopRightCorner = []
// smalltopRightCorner.push([0, 0, 0, 0]);
// smalltopRightCorner.push([0, 1, 1, 0]);
// smalltopRightCorner.push([0, 0, 1, 0]);
// smalltopRightCorner.push([0, 0, 0, 0]);

function RandomStarter (){
    let allBlocks = ['bigBottomLeftCorner','bigBottomRightCorner','bigTopLeftCorner','bigTopRightCorner','fiveRight','fiveUp','fourRight','fourStaircaseDown','fourStaircaseUp','fourUp','lBottom','lLeft','lRight','lTop','one','plus','smallBottomLeftCorner','smallBottomRightCorner','smallTDown','smallTLeft','smallTopLeftCorner','smallTopRightCorner','smallTRight','smallTUp','square','tDown','threeRight','threeStaircaseDown','threeStaircaseUp','threeUp','tLeft','tRight','tUp','twoAndTwoDown','twoAndTwoLeft','twoAndTwoRight','twoAndTwoUp','twoRight','twoUp','uDown','uLeft','uRight','uUp']

    let chosenBlocks = []

    for (let i = 0; i < 3; i++) {
        let randomBlock = allBlocks[Math.floor(Math.random() * allBlocks.length)]
        chosenBlocks.push({block: setBlock(randomBlock), name: randomBlock})
    }

    return chosenBlocks; 
}

export default RandomStarter;