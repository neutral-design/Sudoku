import { useEffect, useState } from 'react'

{/* <InputGrid 
setCell={setCell} 
setInputMode={setInputMode}
inputMode={unsure}
newGame={startNewGame}
restartGame={restartBoard}
solveBoard={solveBoard}
/> */}

function InputGrid(props){
    
    function handleNumberInput(event){
        
        const selectedNumber = Number(event.target.dataset.value)
        
        props.setCell(selectedNumber)
    }

    const numbers=[
        1,2,3,4,5,6,7,8,9,
    ]

    const numberElements = numbers.map(item => {
        return (
            <div 
                className="input-grid-item"
                onClick={handleNumberInput}
                data-value={item} 
                >
                {item}
            </div>
            
        )
        
    })

    return (
        <div className='input-container'>
                <button
                    className="input-button input-mode-toggle"
                    onClick={(event)=>{
                        props.setInputMode(!props.inputMode)
                    }}
                >
                    Input mode: {props.inputMode ? "Candidate":"Normal"}
                </button>
            {/* <p className="input-mode-toggle">Input mode: {props.inputMode ? "Candidate":"Normal"}</p> */}
            <div
            className='button-container'>
                <button
                    className="input-button"
                    onClick={(event)=>{
                        props.newGame()
                    }}
                >
                    New board
                </button>
                <button
                className="input-button"
                    onClick={(event)=>{
                        props.restartGame()
                    }}
                >
                    Restart board
                </button>
                {/* <button
                className="input-button"
                    onClick={()=>{
                        props.setInputMode(!props.inputMode)
                    }}
                >
                    Toggle input mode
                </button> */}
                <button
                className="input-button"
                    onClick={()=>{
                        props.solveBoard()
                    }}
                >
                    I give up, solve it!
                </button>
            </div>
            
            
            <div 
            className='number-input-grid'>
                {numberElements}
            </div>
        </div>
  
    )
}

export default InputGrid