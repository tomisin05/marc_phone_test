import { observer } from 'mobx-react-lite'

interface GuessProps {
  isGuessed: boolean;
  guess?: string;
  word: string;
}

export default observer(function Guess({ isGuessed, guess = '', word }: GuessProps) {
  // Deep debugging of component props and state
  console.log('Guess component rendering with:', {
    isGuessed,
    guess,
    word,
    guessLength: guess?.length,
    guessChars: Array.from(guess || '').join(',')
  });
  
  // Create a padded array to ensure we always show 6 cells
  const displayChars = Array(6).fill('').map((_, i) => guess?.[i] || '');
  
  return (
    <div className="mb-2 grid grid-cols-6 gap-1 sm:gap-2">
      {new Array(6).fill(0).map((_, i) => {
        const bgColor = !isGuessed
          ? 'bg-black'
          : guess[i] === word[i]
          ? 'bg-green-400'
          : word.includes(guess[i])
          ? 'bg-yellow-400'
          : 'bg-black'

        return (
          <div
            key={`grid-cell-${i}`}
            className={`flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center border border-gray-400 font-bold text-2xl uppercase ${bgColor} ${bgColor === 'bg-black' ? 'text-white' : 'text-black'}`}
          >
            {displayChars[i]}
          </div>
        )
        
      })}
    </div>
  )
})
