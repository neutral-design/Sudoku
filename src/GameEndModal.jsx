function GameEndModal(props){

    function handleClick(event){

        props.newGame(event.target.dataset.clues)
    }
    return (
        <div className="end-modal">
            <h1 className="end-modal-text">Congrats, You won!</h1>
            <p className="end-motal-text">Play again?</p>
            <div>
            <button 
                className="new-game-button" 
                onClick={handleClick}
                data-clues={45}>
                    Easy
            </button>
            <button 
                className="new-game-button" 
                onClick={handleClick}
                data-clues={30}>
                    Medium
            </button>
            <button 
                className="new-game-button" 
                onClick={handleClick}
                data-clues={20}>
                    Hard
            </button>
            </div>
        </div>
    )
}

export default GameEndModal