import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import Guess from '../components/Guess'
import Querty from '../components/Qwerty'
import PuzzleStore from '../stores/PuzzleStore'
import DifficultySelector, { DifficultyProps } from '../components/DifficultySelector'

export default observer(function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const forceUpdate = useState({})[1];
  const store = PuzzleStore;
  useEffect(() => {
    const handleStoreChange = () => forceUpdate({});
    store.init()
    window.addEventListener('keyup', store.handleKeyup)

    // Add touch event listeners for mobile devices
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault(); // Prevent scrolling when touching the screen
    };
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Add viewport meta tag for better mobile rendering
    const viewportMeta = document.createElement('meta');
    viewportMeta.name = "viewport";
    viewportMeta.content = "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";
    document.getElementsByTagName('head')[0].appendChild(viewportMeta);

    return () => {
      window.removeEventListener('keyup', store.handleKeyup)
      window.removeEventListener('touchmove', handleTouchMove);
    }
  }, [])

  

  const startGame = () => {
    setGameStarted(true);
  };

  if (!gameStarted) {
    return <DifficultySelector onDifficultySet={startGame} />;
  }


  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-600 p-4">
      <h1 className="bg-gradient-to-br from-blue-400 to-green-400 bg-clip-text text-4xl sm:text-6xl font-bold uppercase text-transparent mb-4">
        Wordle
      </h1>
      <h2 className="text-white mb-2">Current Difficulty: {store.difficulty}</h2>
      <p className="text-white mb-4">Max Guesses: {store.maxGuesses}</p>
      <div className="mb-4 w-full max-w-sm">
        {Array.from({ length: store.maxGuesses }).map((_, i) => (
          <Guess
            key={i}
            word={store.word}
            guess={store.guesses[i] || ''}
            isGuessed={i < store.currentGuess}
          />
        ))}
      </div>
      {store.won && <h1 className="text-green-400 text-2xl mb-4">You won!</h1>}
      {store.lost && <h1 className="text-red-400 text-2xl mb-4">You lost! The word was: {store.word}</h1>}
      {(store.won || store.lost) && (
        <button onClick={() => { store.init(); setGameStarted(false); forceUpdate({}); }} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Play Again</button>
      )}
      <p className="text-white mb-4 text-center">Tap or click the letters below to make your guess. Use 'Enter' to submit and 'Backspace' to delete.</p>
      <Querty store={store} />
    </div>
  )
})


