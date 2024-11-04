import React from 'react'
import PuzzleStore, { Difficulty } from '../stores/PuzzleStore'
import { observer } from 'mobx-react-lite'



export interface DifficultyProps {
  onDifficultySet: () => void;
}

const DifficultySelector = observer(({ onDifficultySet }: DifficultyProps) => {
  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const difficulty = e.target.value as Difficulty;
    PuzzleStore.setDifficulty(difficulty);
    onDifficultySet();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-600">
      <h2 className="text-2xl text-white mb-4">Select Difficulty</h2>
      <select 
        onChange={handleDifficultyChange} 
        value={PuzzleStore.difficulty}
        className="p-2 rounded"
      >
        <option value="default">Default (5 guesses)</option>
        <option value="easy">Easy (7 guesses)</option>
        <option value="medium">Medium (5 guesses)</option>
        <option value="hard">Hard (3 guesses)</option>
        <option value="impossible">Impossible (1 guess)</option>
      </select>
      {/* Remove the Start Game button */}
    </div>
  );
})

export default DifficultySelector;
