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
    <div className="w-full max-w-sm mx-auto">
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
                className={`rounded-md m-px flex h-12 w-8 sm:h-14 sm:w-10 items-center justify-center uppercase ${bgColor} cursor-pointer text-sm sm:text-base`}
                onClick={() => handleKeyPress(char)}
                onTouchStart={(e) => { e.preventDefault(); handleKeyPress(char); }}
              >
                {char}
              </div>
            )
          })}
        </div>
      ))}
      <div className="flex justify-center mt-2">
        <div
          className="rounded-md m-px flex h-12 sm:h-14 px-2 items-center justify-center uppercase bg-gray-200 cursor-pointer text-sm sm:text-base"
          onClick={() => handleKeyPress('Backspace')}
          onTouchStart={(e) => { e.preventDefault(); handleKeyPress('Backspace'); }}
        >
          Backspace
        </div>
        <div
          className="rounded-md m-px flex h-12 sm:h-14 px-2 items-center justify-center uppercase bg-gray-200 cursor-pointer ml-2 text-sm sm:text-base"
          onClick={() => handleKeyPress('Enter')}
          onTouchStart={(e) => { e.preventDefault(); handleKeyPress('Enter'); }}
        >
          Enter
        </div>
      </div>
    </div>
  )
})
