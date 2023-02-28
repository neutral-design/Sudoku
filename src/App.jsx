import { useState } from 'react'
import SudokuGrid from './SudokuGrid'
import './App.css'



function App() {
  


  return (
    <div className="App">
      <header id="header">
      Classic Sudoku
      
        
      </header>
      
      <div className="sudoku-container">

      <SudokuGrid />
      
      </div>
      
    </div>
  )
}

export default App
