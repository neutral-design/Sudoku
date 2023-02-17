import { useEffect, useState } from 'react'
import InputGrid from './InputGrid'



function SudokuGrid(props){
    
    const [selectedCells, setSelectedCells] = useState([])
    const [isSelecting, setIsSelecting] = useState(false)
    const [illegalCells, setIllegalCells] = useState([])
    const [grid, setGrid] = useState(generateBoard(30))
    const [lockedCells, setLockedCells] = useState(generateLockedCells(grid))
    const [unsureGrid, setUnsureGrid] = useState(
      [
        [[],[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[],[]],
      ])
    
    const [unsure, setUnsure] = useState(false)
    const [newGame, setNewGame] = useState(false)



    useEffect(()=> {
      if(newGame){
        const newGrid=generateBoard(30)
        setGrid(newGrid)
        setLockedCells(generateLockedCells(newGrid))
        setSelectedCells([])
        setUnsureGrid([
          [[],[],[],[],[],[],[],[],[]],
          [[],[],[],[],[],[],[],[],[]],
          [[],[],[],[],[],[],[],[],[]],
          [[],[],[],[],[],[],[],[],[]],
          [[],[],[],[],[],[],[],[],[]],
          [[],[],[],[],[],[],[],[],[]],
          [[],[],[],[],[],[],[],[],[]],
          [[],[],[],[],[],[],[],[],[]],
          [[],[],[],[],[],[],[],[],[]],
        ])
        setNewGame(false)
      }
    }, [newGame])
    
    useEffect(()=>{
      if(selectedCells.length>1){
        // Multiple cells selected, switch to candidate input mode
        setUnsure(true)
      }
    }, [selectedCells])

    function handleChange(event){
      
        const selectedRow = Number(event.currentTarget.dataset.row)
        const selectedCol = Number(event.currentTarget.dataset.col)
        
        setSelectedCells([{row: selectedRow, col: selectedCol}])
    }

    // Mouse event handlers
    function handleMouseDown(event){
      const selectedRow = Number(event.currentTarget.dataset.row)
      const selectedCol = Number(event.currentTarget.dataset.col)
      
      setIsSelecting(true)
      setSelectedCells([{row: selectedRow, col: selectedCol}])
      
    }

    function handleMouseUp(event){
      
      setIsSelecting(false)
    }

    function handleMouseOver(event){
      const selectedRow = Number(event.currentTarget.dataset.row)
      const selectedCol = Number(event.currentTarget.dataset.col)
      
      if(!isSelecting) return

      setSelectedCells(prevSelection => {
        
        const newSelection = prevSelection.filter
        const result = prevSelection.filter(item => item.row===selectedRow && item.col===selectedCol);
        if(result.length===0){
          return [...prevSelection,{row: selectedRow, col: selectedCol}]
        }
        
        return prevSelection
      })
    }

    // Touch event handlers
    function handleTouchStart(event){
      const sudokuEl=document.querySelector(".sudoku-grid")
      
      let selectedRow = Math.floor((event.touches[0].clientY-sudokuEl.offsetTop)/screen.width*9)
      let selectedCol = Math.floor((event.touches[0].clientX-sudokuEl.offsetLeft)/screen.width*9)
      if(selectedRow>8) selectedRow=8
      if(selectedCol>8) selectedCol=8
      if(selectedRow<0) selectedRow=0
      if(selectedCol<0) selectedCol=0
      
      setIsSelecting(true)

      setSelectedCells([{row: selectedRow, col: selectedCol}])
    }

    function handleTouchMove(event){
      const sudokuEl=document.querySelector(".sudoku-grid")
      
      let selectedRow = Math.floor((event.touches[0].clientY-sudokuEl.offsetTop)/screen.width*9)
      let selectedCol = Math.floor((event.touches[0].clientX-sudokuEl.offsetLeft)/screen.width*9)
      if(selectedRow>8) selectedRow=8
      if(selectedCol>8) selectedCol=8
      if(selectedRow<0) selectedRow=0
      if(selectedCol<0) selectedCol=0
      
      
      setSelectedCells(prevSelection => {
        
        const newSelection = prevSelection.filter
        const result = prevSelection.filter(item => item.row===selectedRow && item.col===selectedCol);
        if(result.length===0){
          return [...prevSelection,{row: selectedRow, col: selectedCol}]
        }
        
        return prevSelection
      })
    }

    function handleTouchEnd(event){
      setIsSelecting(false)
      
    }

    function handleTouchCancel(event){
      setIsSelecting(false)
    }
    



    function handleKeypress(event) {
 
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
      if(selectedCells.length===0){
        return
      } 
      else if(selectedCells.length===1){
        // Check if cell is locked
        if(lockedCells[selectedCells[0].row][selectedCells[0].col]){
          return
        }

        //Check that we're not in candidate input-mode
        if(!unsure){
          setGrid(prevGrid => {
          
            return prevGrid.map((row, rowIndex)=> {
              return row.map((cell, colIndex)=> (selectedCells[0].row===rowIndex && selectedCells[0].col===colIndex)? value:cell)
            })
          })
          return
        }
        else {
          setUnsureGrid(prevGrid => {
            return prevGrid.map((row, rowIndex)=> {
              return row.map((cell, colIndex)=> {
                if(selectedCells[0].row===rowIndex && selectedCells[0].col===colIndex){
                  // Found the right cell
                  if(value===0){
                    return []
                  }
                  const newArray=[...cell]
                  if(cell.includes(value)){
                    newArray.splice(newArray.indexOf(value), 1) // 2nd parameter means remove one item only                                      
                    return newArray
                  } else {
                    return [...cell, value].sort()
                  }
                }
                return cell
                
              })
            })
          })
        }

      }
      else {
        // Multiple cells selected, enter candidates

        selectedCells.forEach(selectedCell => {
          setUnsureGrid(prevGrid => {
          return prevGrid.map((row, rowIndex)=> {
            return row.map((cell, colIndex)=> {
              if(selectedCell.row===rowIndex && selectedCell.col===colIndex){
                // Found the right cell
                if(value===0){
                  return []
                }
                
                const newArray=[...cell]
                if(cell.includes(value)){
                  newArray.splice(newArray.indexOf(value), 1) // 2nd parameter means remove one item only                                      
                  return newArray
                } else {
                  return [...cell, value].sort()
                }
              }
              return cell
              
            })
          })
        })
        
        })
        
      }
    }

    useEffect(()=>{
      // Check entire grid for illegal cells
      setIllegalCells(getIllegalCells(grid))
      
    }, [grid])


  

    // Check entire grid for illegal cells

    function getIllegalCells(grid){
      const returnArray = []

      // Check rows and columns
      for(let row=0; row < 9; row++){
        for(let col = 0; col < 8; col++){
          for(let i = col+1; i < 9; i++){
            if(grid[row][col]){
              if(grid[row][col]===grid[row][i]){
                // Illegal cell
                
                
                if(!returnArray.includes(row*9+col)){
                  returnArray.push(row*9+col)
                }
                if(!returnArray.includes(row*9+ i)){
                  returnArray.push(row*9+ i)
                }
                
              }
            }
            if(grid[col][row]){
              if(grid[col][row]===grid[i][row]){
                // Illegal cell
                
                if(!returnArray.includes(col*9+row)){
                  returnArray.push(col*9+row)
                }
                
                if(!returnArray.includes(i*9+ row)){
                  returnArray.push(i*9+ row)  
                }
                
              }
            }
          }
        }
      
      }

      // Check boxes
      for(let y = 0; y < 3; y++){
        for(let x = 0; x < 3; x++){
          
          for(let i = 0; i < 8; i++){
            const xPos=x*3+i%3
            const yPos=y*3+Math.floor(i/3)
            
            for(let j = i+1;j < 9; j++){
              const jxPos=x*3+j%3
              const jyPos=y*3+Math.floor(j/3)
              if(grid[yPos][xPos]){
                if(grid[yPos][xPos]===grid[jyPos][jxPos]){
                    // Illegal cell
                    if(!returnArray.includes(yPos*9+xPos)){
                      returnArray.push(yPos*9+xPos)
                    }
                    if(!returnArray.includes(jyPos*9 + jxPos)){
                      returnArray.push(jyPos*9 + jxPos)
                    }
                }
            }
          }
        }
      }
    }
    
      
      return returnArray;
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

    
 
    /* Takes a partially filled-in grid and attempts
        to assign values to all unassigned locations in
        such a way to meet the requirements for
        Sudoku solution (non-duplication across rows,
        columns, and boxes) */
    function solveSudoku(grid, row, col)
    {
      let N = 9;
      

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

    function generateBoard(nrOfClues){
      const newBoard=[
        [0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,],
      ]

      // Randomly fill three diagonal subgrids
      const grid1=getRandomUniqueArray()
      const grid2=getRandomUniqueArray()
      const grid3=getRandomUniqueArray()
      let i = 0
      for(let y = 0; y < 3; y++){
        for(let x = 0; x < 3; x++){
          
          newBoard[y][x]=grid1[i]
          newBoard[y+3][x+3]=grid2[i]
          newBoard[y+6][x+6]=grid3[i]
          i++
        }
      }
      // Solve board to fill entire grid
      solveSudoku(newBoard, 0, 3)
      // Remove random cells
      removeRandomCells(newBoard, 81-nrOfClues)
      return newBoard
    }

    function removeRandomCells(grid, cellsToRemove){
      for(let i = 0; i < cellsToRemove; i++){
        let x = 0
        let y = 0
        do {
          x = Math.floor(Math.random()*9)
          y = Math.floor(Math.random()*9)
        } while(grid[y][x]===0)
        grid[y][x]=0
      }
      
    }

    function getRandomUniqueArray(){
      
      let randomNr
      
      const array=[]
      for(let i = 0; i < 9; i++){
        do {
          // Get random number
          randomNr=Math.floor(Math.random()*9)+1
        }while(array.includes(randomNr)) //Loop until a new value is generated
        array.push(randomNr)
      }
      return array

    }

    function generateLockedCells(grid){
      return grid.map((row, rowIndex) => {        
        const cellElements = row.map((cell, colIndex)=> {
          return cell>0? true:false
        })
        return cellElements
      }
      )
    }

    function restartBoard(){
      setGrid(prevGrid => {
          
        return prevGrid.map((row, rowIndex)=> {
          return row.map((cell, colIndex)=> (lockedCells[rowIndex][colIndex])? cell:0)
        })
      })
    }

    function startNewGame(){
      setNewGame(true)
    }

    function setInputMode(mode){
      setUnsure(mode)
    }

    function solveBoard(){
      if(illegalCells.length>0){
        console.log("Grid has illegal cells, can't solve")
        return
      }
      // Use JSON.parse / JSON.stringify to create a deep copy of the grid
      const solvedGrid=JSON.parse(JSON.stringify(grid))
      // Try solving the grid
      if(solveSudoku(solvedGrid, 0, 0)){
        setGrid(solvedGrid)

      }  
      else {
        console.log("no solution exists")
      }
    }

    const sudokuGridElements=grid.map( (row, rowIndex) => {
        
        const cellElements = row.map((cell, colIndex)=> {
          
        
        const unsureElement = unsureGrid[rowIndex][colIndex].map(candidate => {
          return (
            <div className={`candidate candidate-${candidate}`}>
              {candidate}
            </div>
          )
        })
        const candidateDiv = (
          <div className="candidate-container">
            {unsureElement}
          </div>
        )
        
        const selected = selectedCells.filter(item => item.row===rowIndex && item.col===colIndex)
        
        const classes=(selected.length>0 ? "selected ":"") + 
        (illegalCells.includes(rowIndex*9+colIndex) ? "illegal ":"") +
        (lockedCells[rowIndex][colIndex]?"locked ":"")                       
          
                      
        return (
          <div 
            
            className={classes}
            
            // Mouse events
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseOver={handleMouseOver}
            // Touch events
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchCancel}



            data-row={rowIndex} 
            data-col={colIndex} 
          >
            {cell===0 ? candidateDiv:cell}
          </div>
        )
        })
        return cellElements
      })

    
        
      


    return (
      <div>
          <div 
            tabIndex="0"
            onKeyDown={handleKeypress}
            className="sudoku-grid">
              {sudokuGridElements}
          </div>

          

            <InputGrid 
              setCell={setCell} 
              setInputMode={setInputMode}
              inputMode={unsure}
              newGame={startNewGame}
              restartGame={restartBoard}
              solveBoard={solveBoard}
            />
          
              
        
      </div>
          
    )

}

export default SudokuGrid