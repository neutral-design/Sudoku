import { useState } from 'react'
import SudokuGrid from './SudokuGrid'
import './App.css'



function App() {
  


  return (
    <div className="App">
      <h1>Sudoku!</h1>
      <div className="sudoku-container">

      <SudokuGrid />
      </div>
      
    </div>
  )
}

export default App
