import { useEffect, useState } from 'react'

function InputGrid(props){
    
    function handleChange(event){
        
        const selectedNumber = Number(event.target.dataset.value)
        
        props.setCell(selectedNumber)
    }

    const inputValues=[
        [1,2,3],
        [4,5,6],
        [7,8,9],
    ]

    const inputElements = inputValues.map(row => {
        return (
            <div className='input-grid-row'>{row.map(item=> {
                return (
                    <div 
                    className="input-grid-item"
                    onClick={handleChange}
                    data-value={item} 
                     >
                        {item}
                    </div>
                )
            })}</div>
        )
        
    })

    return (
        <div 
        className='input-grid'
        
        >
            {inputElements}
        </div>
    )
}

export default InputGrid