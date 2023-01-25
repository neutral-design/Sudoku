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
    const [illegalCells, setIllegalCells] = useState([])

    useEffect(()=>{
        console.log(selectedCell)
        console.log(illegalCells.includes(selectedCell)? "illegal": "legal")
        console.log(illegalCells)

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
      console.log(selectedCell)
      if(!isNaN(number)){
        setCell(number)
      }
      
    }



    function setCell(value){
      if(selectedCell===null){
        return
      }
      else {
        setGrid(prevGrid => {
          return prevGrid.map((item, index)=> index===selectedCell? value : item)
        })
        
      }
    }

    useEffect(()=>{
      const illegalArray=grid.map((item,index)=> {
        return checkCell(index)
      }).flat()
      
      setIllegalCells([...new Set(illegalArray)])
      
    }, [grid])


    // Check if cell-value is legal
    function checkCell(cellIndex){
      if(grid[cellIndex]===0){
        return null
      }
      const returnArray=[]
      const row=Math.floor(cellIndex / 9)
      const col=cellIndex % 9
      // console.log(row, col)

      // check row
      for(let i = row*9;i < row*9+9; i++){
        
        if(grid[cellIndex]===grid[i] && cellIndex!==i){

          returnArray.push(i)
        }
      }
      
      // Check column

      for(let i = col; i <= (72+col); i+=9){
        
        if(grid[cellIndex]===grid[i] && cellIndex!==i){

          returnArray.push(i)
        }
      }

      // Check subgrid
      const subGridX = Math.floor(col / 3)
      const subGridY = Math.floor(row / 3)
      
      for(let y = 0; y < 3; y++){
        for(let x = 0; x < 3; x++){
          const subGridIndex=subGridY*27+subGridX*3+y*9+x
          
          if(grid[subGridIndex]===grid[cellIndex] && cellIndex!==subGridIndex){
            
            returnArray.push(subGridIndex)
          }
        }
      }
      return returnArray
      
      
    }

    const sudokuGridElements=grid.map( (cell, cellIndex) => {
        const classes=(selectedCell===cellIndex ? "selected ":"")  + (illegalCells.includes(cellIndex) ? "illegal ":"")
        return (
          <div 
            
            className={classes}
            onClick={handleChange}
            data-cell-index={cellIndex} 
          >
            {cell===0 ? "":cell}
          </div>
        )
        })
        
      


    return (
        <div 
          tabIndex="0"
          onKeyDown={handleKeypress}
          className="sudoku-grid">{sudokuGridElements}
        </div>
    )

}

export default SudokuGrid