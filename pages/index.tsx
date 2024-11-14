import { observer } from 'mobx-react-lite'
import { reaction } from 'mobx'
import { useEffect, useState } from 'react'
import Guess from '../components/Guess'
import Querty from '../components/Qwerty'
import PuzzleStore, { Difficulty } from '../stores/PuzzleStore'
import DifficultySelector, { DifficultyProps } from '../components/DifficultySelector'
import { toJS } from 'mobx'

export default observer(function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const store = PuzzleStore;
  console.log('Current store state:', { guesses: store.guesses, currentGuess: store.currentGuess });

  useEffect(() => {
    store.init();
    
    // Set up reaction to log changes to guesses
    const disposer = reaction(
      () => toJS(store.guesses),
      (guesses) => console.log('Guesses updated:', guesses)
    );
    
    // Initialize first guess slot using action
    store.initializeFirstGuess();
    const handleKeyup = (e: KeyboardEvent) => {
      console.log('Keyup event:', e.key);
      store.handleKeyup(e);
    };
    window.addEventListener('keyup', handleKeyup);
    console.log('Home component mounted. Initial store state:', { word: store.word, currentGuess: store.currentGuess, guesses: store.guesses });

    // Add touch event listeners for mobile devices
    const handleTouchMove = (e: TouchEvent) => {
      // Allow scrolling on mobile devices
    };
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Add viewport meta tag for better mobile rendering
    const viewportMeta = document.createElement('meta');
    viewportMeta.name = "viewport";
    viewportMeta.content = "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes";
    document.getElementsByTagName('head')[0].appendChild(viewportMeta);

    return () => {
      window.removeEventListener('keyup', handleKeyup);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const startGame = (difficulty: Difficulty) => {
    store.setDifficulty(difficulty);
    store.resetGame();
    setGameStarted(true);
  };

  const changeDifficulty = () => {
    store.resetGame();
    setGameStarted(false);
  };

  useEffect(() => {
    // Remove the check for stored difficulty to always start with the selection page
    setGameStarted(false);
  }, []);

  const handleDifficultyChange = () => {
    // The difficulty is already set in PuzzleStore by DifficultySelector
    startGame(PuzzleStore.difficulty);
  };

  return (
    <>
      {!gameStarted ? (
        <DifficultySelector onDifficultySet={handleDifficultyChange} />
      ) : (
        <div className="flex min-h-screen w-full flex-col items-center justify-between bg-gray-600 overflow-y-auto mobile-friendly-container space-y-4 px-2 sm:px-4">
          <h1 className="bg-gradient-to-br from-blue-400 to-green-400 bg-clip-text text-3xl sm:text-4xl md:text-6xl font-bold uppercase text-transparent mb-4 mt-4">
            M.A.R.C.(LE)
          </h1>
          <div className="text-white mb-4 text-center">
            <h2 className="mb-2 mobile-friendly-text">Current Difficulty: {store.difficulty}</h2>
            <p className="mobile-friendly-text">Max Guesses: {store.maxGuesses}</p>
            <button onClick={changeDifficulty} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Change Difficulty
            </button>
          </div>
          <div className="mb-4 w-full max-w-xs sm:max-w-sm md:max-w-md">
            {Array.from({ length: store.maxGuesses }).map((_, i) => {
              const guess = store.guesses[i] || '';
              console.log(`Rendering guess ${i}:`, guess); // Debug log
              return (
                <Guess
                  key={`guess-row-${i}`}
                  word={store.word}
                  guess={guess}
                  isGuessed={i < store.currentGuess}
                />
              );
            })}
          </div>
          {store.won && <h1 className="text-green-400 text-2xl mb-4">You won!</h1>}
          {store.lost && <h1 className="text-red-400 text-2xl mb-4">You lost! The word was: {store.word}</h1>}
          {(store.won || store.lost) && (
            <button onClick={changeDifficulty} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm sm:text-base">Play Again</button>
          )}
          <p className="text-white mb-4 text-center mobile-friendly-text">Tap or click the letters below to make your guess. Use 'Enter' to submit and 'Backspace' to delete.</p>
          <Querty store={store} />
        </div>
      )}
    </>
  );
});


