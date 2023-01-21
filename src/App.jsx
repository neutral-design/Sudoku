import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

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

function App() {
  const [count, setCount] = useState(0)

  const sudokuGridElements=sudokuGrid.map( row => {
    console.log(row)
    const sudokuGridColumn=row.map(element => {
      console.log(element)
      return (
        <div>{element===0 ? "":element}</div>
      )
    })
    return (
      <>
        {sudokuGridColumn}
      </>
    )
  })

  function randomizeSudokGrid(){
    
  }

  return (
    <div className="App">
      <h1>Sudoku!</h1>
      <div className="sudoku-container">

      <div className="sudoku-grid">{sudokuGridElements}</div>
      </div>
      
    </div>
  )
}

export default App
