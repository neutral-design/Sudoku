import { useState } from 'react'
import SudokuGrid from './SudokuGrid'
import './App.css'



function App() {
  


  return (
    <div className="App">
      <header id="header">
      <span>Classic Sudoku</span>
      
      
        
      </header>
      
      <div className="sudoku-container">

      <SudokuGrid />
      
      </div>
      
    </div>
  )
}

export default App
