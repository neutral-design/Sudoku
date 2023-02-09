import { useEffect, useState } from 'react'
import InputGrid from './InputGrid'



function SudokuGrid(props){
    const [selectedCell, setSelectedCell] = useState({row: null, col: null})
    const [illegalCells, setIllegalCells] = useState([])
    const [grid, setGrid] = useState(generateBoard(25))
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
      console.log(unsureGrid)
    }, [unsureGrid])
      

    useEffect(()=> {
      if(newGame){
        const newGrid=generateBoard(25)
        setGrid(newGrid)
        setLockedCells(generateLockedCells(newGrid))
        setNewGame(false)
      }
    }, [newGame])
    
    function handleChange(event){
        const selectedRow = Number(event.target.dataset.row)
        const selectedCol = Number(event.target.dataset.col)
        
        setSelectedCell({row: selectedRow, col: selectedCol})
    }

    function handleKeypress(event) {
      // Handle Arrow keys
      let rowIndex = selectedCell.row===null ? 0:selectedCell.row
      let colIndex = selectedCell.col===null ? 0:selectedCell.col
      if(event.key === "ArrowRight") {
        colIndex++
      }

      if(event.key === "ArrowLeft") {
        colIndex--
      }

      if(event.key === "ArrowUp") {
        rowIndex--
      }

      if(event.key === "ArrowDown") {
        rowIndex++
      }
      
      colIndex = colIndex%9
      colIndex= colIndex < 0 ? colIndex+9: colIndex
      
      rowIndex = rowIndex%9
      rowIndex= rowIndex < 0 ? rowIndex+9: rowIndex

      setSelectedCell({row: rowIndex, col: colIndex})
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
      if(selectedCell.row===null || selectedCell.col===null){
        return
      }
      else if(lockedCells[selectedCell.row][selectedCell.col]){
        return
      }
      else if (unsure){
        // Entering candidate
        console.log("Setting candidate!")
        setUnsureGrid(prevGrid => {
          return prevGrid.map((row, rowIndex)=> {
            return row.map((cell, colIndex)=> {
              if(selectedCell.row===rowIndex && selectedCell.col===colIndex){
                // Fount the right cell
                return cell.map(value=>{
                  
                })
                
              }
              
            })
          })
        })
        return
      }else {
        setGrid(prevGrid => {
          
          return prevGrid.map((row, rowIndex)=> {
            return row.map((cell, colIndex)=> (selectedCell.row===rowIndex && selectedCell.col===colIndex)? value:cell)
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


    const sudokuGridElements=grid.map( (row, rowIndex) => {
        
        const cellElements = row.map((cell, colIndex)=> {
          
        const unsureElement = unsureGrid[rowIndex][colIndex].length>0 ? unsureGrid[rowIndex][colIndex]:""
        const classes=((selectedCell.row===rowIndex && selectedCell.col===colIndex) ? "selected ":"") + 
                      (illegalCells.includes(rowIndex*9+colIndex) ? "illegal ":"") +
                      (lockedCells[rowIndex][colIndex]?"locked ":"") +
                      (unsureGrid[rowIndex][colIndex].length>0 ? "unsure ":"")
          
                      
        return (
          <div 
            
            className={classes}
            onClick={handleChange}
            data-row={rowIndex} 
            data-col={colIndex} 
          >
            {cell===0 ? unsureElement:cell}
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
            className="sudoku-grid">{sudokuGridElements}
          </div>
          
          
          <div className="input-container">
              <div className='button-container'>
                <button
                onClick={(event)=>{
                  restartBoard()
                }}
              >Restart</button>
              <button
                onClick={(event)=> {
                  setNewGame(true)
                  
                }}
              >New board</button>
              <button
                onClick={(event)=> {
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
                    
                }}  
                >Solve</button>
                <button
                onClick={(event)=> {
                  setUnsure(prevValue => !prevValue)
                    
                }}  
                >{unsure? "Input candidates":"Normal input"}</button>
              </div>
              <InputGrid setCell={setCell}/>
              
          </div>
              
              
              
      </div>
          
    )

}

export default SudokuGrid