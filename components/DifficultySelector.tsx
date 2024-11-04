import React from 'react'
import PuzzleStore from '../stores/PuzzleStore'
import { observer } from 'mobx-react-lite'



export interface DifficultyProps {
  onDifficultySet: () => void;
}

const DifficultySelector = observer(({ onDifficultySet }: DifficultyProps) => {
  const handleDifficultyChange = (e) => {
    const difficulty = e.target.value;
    PuzzleStore.setDifficulty(difficulty);
    // Dispatch a custom event to notify that PuzzleStore has changed
    window.dispatchEvent(new Event('puzzleStoreChanged'));
    onDifficultySet();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-600">
      <h2 className="text-2xl text-white mb-4">Select Difficulty</h2>
      <select 
        onChange={handleDifficultyChange} 
        defaultValue={PuzzleStore.difficulty}
        className="p-2 rounded"
      >
        <option value="default">Default (5 guesses)</option>
        <option value="easy">Easy (7 guesses)</option>
        <option value="medium">Medium (5 guesses)</option>
        <option value="hard">Hard (3 guesses)</option>
        <option value="impossible">Impossible (1 guess)</option>
      </select>
    </div>
  );
})

export default DifficultySelector;
