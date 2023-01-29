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
        return 
      }
      
      // Handle delete and backspace
      if(event.key === "Backspace") {
        setCell(0)
        return 
      }
      if(event.key === "Delete") {
        setCell(0)
        return 
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
      // Check entire grid for illegal cells
      const illegalArray=[...new Set(grid.map((item,index)=> {
        return checkCell(grid, index)
      }).flat())]
      
      // setIllegalCells([...new Set(illegalArray)])
      setIllegalCells(illegalArray)

      
    }, [grid])


    // Check if cell-value is legal
    function checkCell(gridToCheck, cellIndex){
      if(gridToCheck[cellIndex]===0){
        return null
      }
      const returnArray=[]
      const row=Math.floor(cellIndex / 9)
      const col=cellIndex % 9
      // console.log(row, col)

      // check row
      for(let i = row*9;i < row*9+9; i++){
        
        if(gridToCheck[cellIndex]===gridToCheck[i] && cellIndex!==i){

          returnArray.push(i)
        }
      }
      
      // Check column

      for(let i = col; i <= (72+col); i+=9){
        
        if(gridToCheck[cellIndex]===gridToCheck[i] && cellIndex!==i){

          returnArray.push(i)
        }
      }

      // Check subgrid
      const subGridX = Math.floor(col / 3)
      const subGridY = Math.floor(row / 3)
      
      for(let y = 0; y < 3; y++){
        for(let x = 0; x < 3; x++){
          const subGridIndex=subGridY*27+subGridX*3+y*9+x
          
          if(gridToCheck[subGridIndex]===gridToCheck[cellIndex] && cellIndex!==subGridIndex){
            
            returnArray.push(subGridIndex)
          }
        }
      }
      
      if(returnArray.length>0){
        
        returnArray.push(cellIndex)
      }
      return returnArray
      
      
    }

    // Check whether it will be legal
    // to assign num to the
    // given row, col
    function isSafe(grid, row, col, num)
    {
        
        // Check if we find the same num
        // in the similar row , we
        // return false
        for(let x = 0; x <= 8; x++)
            if (grid[row][x] == num)
                return false;
    
        // Check if we find the same num
        // in the similar column ,
        // we return false
        for(let x = 0; x <= 8; x++)
            if (grid[x][col] == num)
                return false;
    
        // Check if we find the same num
        // in the particular 3*3
        // matrix, we return false
        let startRow = row - row % 3,
            startCol = col - col % 3;
            
        for(let i = 0; i < 3; i++)
            for(let j = 0; j < 3; j++)
                if (grid[i + startRow][j + startCol] == num)
                    return false;
    
        return true;
    }

    let N = 9;
 
    /* Takes a partially filled-in grid and attempts
        to assign values to all unassigned locations in
        such a way to meet the requirements for
        Sudoku solution (non-duplication across rows,
        columns, and boxes) */
    function solveSudoku(grid, row, col)
    {
        
        /* If we have reached the 8th
          row and 9th column (0
          indexed matrix) ,
          we are returning true to avoid further
          backtracking       */
        if (row == N - 1 && col == N)
            return true;
    
        // Check if column value  becomes 9 ,
        // we move to next row
        // and column start from 0
        if (col == N)
        {
            row++;
            col = 0;
        }
    
        // Check if the current position
        // of the grid already
        // contains value >0, we iterate
        // for next column
        if (grid[row][col] != 0)
            return solveSudoku(grid, row, col + 1);
    
        for(let num = 1; num < 10; num++)
        {
            
            // Check if it is safe to place
            // the num (1-9)  in the given
            // row ,col ->we move to next column
            if (isSafe(grid, row, col, num))
            {
                
                /*  assigning the num in the current
                (row,col)  position of the grid and
                assuming our assigned num in the position
                is correct */
                grid[row][col] = num;
    
                // Checking for next
                // possibility with next column
                if (solveSudoku(grid, row, col + 1))
                    return true;
            }
            
            /* removing the assigned num , since our
              assumption was wrong , and we go for next
              assumption with diff num value   */
            grid[row][col] = 0;
        }
        return false;
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