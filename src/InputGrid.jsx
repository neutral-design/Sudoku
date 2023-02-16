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
    console.log(props.inputMode)
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
        <>
          <div
            className='button-container'>
                <button
                    // onClick={}
                >
                    New board
                </button>
                <button
                    // onClick={}
                >
                    Restart board
                </button>
                <button
                    // onClick={}
                >
                    Toggle input mode
                </button>
                <button
                    // onClick={}
                >
                    I give up, solve it!
                </button>
          </div>
          
          
            <div 
            className='input-grid'
        
        >
            <p className="input-mode-toggle">Input mode: {props.inputMode ? "Candidate":"Normal"}</p>
            {numberElements}
        </div>
        </>
  
    )
}

export default InputGrid