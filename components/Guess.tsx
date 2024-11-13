export default function Guess({ isGuessed, guess, word }) {
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
            className={`flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center border border-gray-400 font-bold uppercase text-white ${bgColor} text-sm sm:text-base md:text-lg`}
          >
            {guess[i]}
          </div>
        )
        
      })}
    </div>
  )
}
