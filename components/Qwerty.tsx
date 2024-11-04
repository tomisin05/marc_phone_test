import { observer } from 'mobx-react-lite'

type StoreType = {
  exactGuesses: string[];
  inexactGuesses: string[];
  allSubmittedLetters: string[];
  handleInput: (input: string) => void;
};

export default observer(function Querty({ store }: { store: StoreType }) {
  const qwerty = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

  const handleKeyPress = (char: string) => {
    store.handleInput(char);
  };

  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto mb-4">
      {qwerty.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mb-2">
          {row.split('').map((char) => {
            const bgColor = store.exactGuesses.includes(char)
              ? 'bg-green-400'
              : store.inexactGuesses.includes(char)
              ? 'bg-yellow-400'
              : store.allSubmittedLetters.includes(char)
              ? 'bg-gray-400'
              : 'bg-gray-200'
            return (
              <div
                key={char}
                className={`rounded-md m-px flex h-10 w-6 sm:h-12 sm:w-8 md:h-14 md:w-10 items-center justify-center uppercase ${bgColor} cursor-pointer text-xs sm:text-sm md:text-base`}
                onClick={() => handleKeyPress(char)}
              >
                {char}
              </div>
            )
          })}
        </div>
      ))}
      <div className="flex justify-center mt-2">
        <div
          className="rounded-md m-px flex h-10 sm:h-12 md:h-14 px-2 items-center justify-center uppercase bg-gray-200 cursor-pointer text-xs sm:text-sm md:text-base"
          onClick={() => handleKeyPress('Backspace')}
        >
          Backspace
        </div>
        <div
          className="rounded-md m-px flex h-10 sm:h-12 md:h-14 px-2 items-center justify-center uppercase bg-gray-200 cursor-pointer ml-2 text-xs sm:text-sm md:text-base"
          onClick={() => handleKeyPress('Enter')}
        >
          Enter
        </div>
      </div>
    </div>
  )
})
