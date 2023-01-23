import { useEffect, useState } from 'react'

const data=[
    8,0,0,0,0,0,0,0,0,
    0,0,0,4,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,
    0,0,2,0,0,0,1,0,0,
    0,0,0,0,6,0,0,0,0,
    0,9,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,
    0,1,0,0,0,6,0,0,0,
    0,0,0,0,0,0,0,0,0,
  ]

function SudokuGrid(props){
    const [selectedCell, setSelectedCell] = useState(null)
    useEffect(()=>{
        console.log(selectedCell)

    },[selectedCell])

    const [grid, setGrid] = useState(data)

    function handleChange(event){
        const selected = Number(event.target.dataset.cellIndex)
        
        setSelectedCell(selected)
    }

    function handleKeypress(event) {
      // Handle Arrow keys
      if(event.key === "ArrowRight") {
        setSelectedCell(prevSelection => {
          if(prevSelection===null){
            return 0
          } else if(prevSelection===80){
            return 0
          }
          return prevSelection+1
        })
        return
      }

      if(event.key === "ArrowLeft") {
        setSelectedCell(prevSelection => {
          if(prevSelection===null){
            return 0
          } else if(prevSelection===0){
            return 80
          }
          return prevSelection-1
        })
        return
      }

      if(event.key === "ArrowUp") {
        setSelectedCell(prevSelection => {
          if(prevSelection===null){
            return 0
          } else {
            const newValue=prevSelection-9;
            if(newValue<0){
              return 81+newValue
            }
            return newValue
          }
        })
        return
      }

      if(event.key === "ArrowDown") {
        setSelectedCell(prevSelection => {
          if(prevSelection===null){
            return 0
          } else {
            const newValue=prevSelection+9;
            if(newValue>80){
              return newValue-81
            }
            return newValue
          }
        })
        return
      }
      
      // Handle number inputs
      
      const number = Number(event.key)
      if(!isNaN(number)){
        setCell(number)
      }
      
    }



    function setCell(value){
      if(!selectedCell){
        return
      }
      else {
        setGrid(prevGrid => {
          return prevGrid.map((item, index)=> index===selectedCell? value : item)
        })
        
      }
    }
    useEffect(()=>{
      checkCell(selectedCell)
    }, [grid])

    // Check if cell-value is legal
    function checkCell(cellIndex){
      const row=Math.floor(cellIndex / 9)
      const col=cellIndex % 9
      console.log(row, col)

      // check row
      for(let i = row*9;i < row*9+9; i++){
        
        if(grid[cellIndex]===grid[i] && cellIndex!==i){
          
          console.log("Value already exists on line!")
          return
        }
      }
      // Check column
      for(let i = col;i < 72+col; i+=9){
        
        if(grid[cellIndex]===grid[i] && cellIndex!==i){
          
          console.log("Value already exists in column!")
          return
        }
      }

      // Check 
    }

    const sudokuGridElements=grid.map( (cell, cellIndex) => {
        return (
          <div 
            
            className={selectedCell===cellIndex ? "selected":""}
            onClick={handleChange}
            data-cell-index={cellIndex} 
          >
            {cell===0 ? "":cell}
          </div>
        )
        })
        
      


    return (
        <div 
          tabindex="0"
          onKeyDown={handleKeypress}
          className="sudoku-grid">{sudokuGridElements}
        </div>
    )

}

export default SudokuGrid