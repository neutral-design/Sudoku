import { useState } from 'react'
import Sudoku from './Sudoku'
import './App.css'



function App() {
  


  return (
    <div className="App">
      <h1>Sudoku!</h1>
      <div className="sudoku-container">

      <Sudoku />
      </div>
      
    </div>
  )
}

export default App
