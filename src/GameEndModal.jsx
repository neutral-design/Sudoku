function GameEndModal(props){

    function handleClick(event){

        props.newGame(event.target.dataset.clues)
    }
    return (
        <div className="end-modal">
            <h1>Congrats, You won!</h1>
            <p>Play again?</p>
            <div>
            <button 
                className="input-button" 
                onClick={handleClick}
                data-clues={45}>
                    Easy
            </button>
            <button 
                className="input-button" 
                onClick={handleClick}
                data-clues={30}>
                    Medium
            </button>
            <button 
                className="input-button" 
                onClick={handleClick}
                data-clues={20}>
                    Hard
            </button>
            </div>
        </div>
    )
}

export default GameEndModal