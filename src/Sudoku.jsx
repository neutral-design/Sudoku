import { useEffect, useState } from 'react'

const sudokuGrid=[
    [8,0,0,0,0,0,0,0,0],
    [0,0,0,4,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,2,0,0,0,1,0,0],
    [0,0,0,0,6,0,0,0,0],
    [0,9,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,1,0,0,0,6,0,0,0],
    [0,0,0,0,0,0,0,0,0],
  ]

function Sudoku(props){
    const [selectedCell, setSelectedCell] = useState({row:null,col:null})
    
    function handleChange(event){
        const row = Number(event.target.dataset.row)
        const col = Number(event.target.dataset.col)
        setSelectedCell({row:row,col:col})
    }

    useEffect(()=>{
        console.log(selectedCell)
    },[selectedCell])

    const sudokuGridElements=sudokuGrid.map( (row, rowIndex) => {
        
        const sudokuGridColumn=row.map((element, colIndex) => {
          
          return (
            <div 
                className={rowIndex===selectedCell.row && colIndex===selectedCell.col ? "selected":""}
                onClick={handleChange}
                data-row={rowIndex} 
                data-col={colIndex}>
                    {element===0 ? "":element}
            </div>
          )
        })
        return (
          <>
            {sudokuGridColumn}
          </>
        )
      })


    return (
        <div className="sudoku-grid">{sudokuGridElements}</div>
    )

}

export default Sudoku