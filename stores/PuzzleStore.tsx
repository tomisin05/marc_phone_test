// import words from '../words.json'
// import wordlist from '../wordlist.json'

// type Difficulty = "default" | 'easy' | 'medium' | 'hard' | 'impossible'

// export default {
//   word: '',
//   guesses: [] as string[],
//   currentGuess: 0,
//   difficulty: 'default' as Difficulty,
//   maxGuesses: 6,

//   get won() {
//     return this.guesses[this.currentGuess - 1] === this.word
//   },

//   get lost() {
//     return this.currentGuess === this.maxGuesses
//   },

//   get allGuesses() {
//     return this.guesses.slice(0, this.currentGuess).join('').split('')
//   },

//   get exactGuesses() {
//     return (
//       this.word
//         .split('')
//         .filter((letter, i) => {
//           return this.guesses
//             .slice(0, this.currentGuess)
//             .map((word) => word[i])
//             .includes(letter)
//         })
//     )
//   },

//   get inexactGuesses() {
//     return this.word
//       .split('')
//       .filter((letter) => this.allGuesses.includes(letter))
//   },

//   setDifficulty(difficulty: Difficulty) {
//     this.difficulty = difficulty
//     switch (difficulty) {
//       case 'easy':
//         this.maxGuesses = 7
//         break
//       case 'medium':
//         this.maxGuesses = 5
//         break
//       case 'hard':
//         this.maxGuesses = 3
//         break
//       case 'impossible':
//         this.maxGuesses = 1
//         break
//     }
//     this.init()
//   },

//   init() {
//     this.word = wordlist[Math.floor(Math.random() * wordlist.length)]
//     this.guesses = new Array(this.maxGuesses).fill('')
//     this.currentGuess = 0
//   },

//   submitGuess() {
//     if (words.includes(this.guesses[this.currentGuess])) {
//       this.currentGuess += 1
//     }
//   },

//   handleKeyup(e: KeyboardEvent) {
//     if (this.won || this.lost) {
//       return;
//     }

//     if (e.key === 'Enter') {
//       return this.submitGuess()
//     }

//     if (e.key === 'Backspace') {
//       this.guesses[this.currentGuess] = this.guesses[this.currentGuess].slice(
//         0,
//         this.guesses[this.currentGuess].length - 1
//       )
//       return
//     }

//     // if (e.key === 'Backspace') {
//     //   this.guesses[this.currentGuess] = (this.guesses[this.currentGuess] || '').slice(0, -1);
//     //   return;
//     // }

//   //   if (this.guesses[this.currentGuess]?.length < 6 && e.key.match(/^[A-z]$/)) {
//   //     this.guesses[this.currentGuess] = (this.guesses[this.currentGuess] || '') + e.key.toLowerCase();
//   //   }
//   // },

//   if (this.guesses[this.currentGuess]?.length < 6 && e.key.match(/^[A-z]$/)) {
//     this.guesses[this.currentGuess] =
//       (this.guesses[this.currentGuess] || '') + e.key.toLowerCase()
//   }
// },
// }


//********************************************************************************************************** */

// import { makeAutoObservable } from 'mobx'
// import words from '../words.json'
// import wordlist from '../wordlist.json'

// type Difficulty = "default" | 'easy' | 'medium' | 'hard' | 'impossible'

// class PuzzleStore {
//   word = ''
//   guesses: string[] = []
//   currentGuess = 0
//   difficulty: Difficulty = 'default'
//   maxGuesses = 6

//   constructor() {
//     makeAutoObservable(this)
//     this.init()
//   }

//   get won() {
//     return this.guesses[this.currentGuess - 1] === this.word
//   }

//   get lost() {
//     return this.currentGuess === this.maxGuesses
//   }

//   get allGuesses() {
//     return Array.from(new Set(this.guesses.join('')))
//   }

//   get exactGuesses() {
//     return Array.from(new Set(
//       this.word.split('').filter((letter, i) => 
//         this.guesses.slice(0, this.currentGuess).some(guess => guess[i] === letter)
//       )
//     ))
//   }

//   get inexactGuesses() {
//     return Array.from(new Set(
//       this.word.split('').filter(letter => this.allGuesses.includes(letter))
//     )).filter(letter => !this.exactGuesses.includes(letter))
//   }

//   setDifficulty(difficulty: Difficulty) {
//     this.difficulty = difficulty
//     switch (difficulty) {
//       case 'easy':
//         this.maxGuesses = 7
//         break
//       case 'medium':
//         this.maxGuesses = 5
//         break
//       case 'hard':
//         this.maxGuesses = 3
//         break
//       case 'impossible':
//         this.maxGuesses = 1
//         break
//       default:
//         this.maxGuesses = 6
//     }
//     this.init()
//   }

//   init() {
//     this.word = wordlist[Math.floor(Math.random() * wordlist.length)]
//     this.guesses = new Array(this.maxGuesses).fill('')
//     this.currentGuess = 0
//   }

//   submitGuess() {
//     if (words.includes(this.guesses[this.currentGuess])) {
//       if (this.guesses[this.currentGuess] === this.word || this.currentGuess === this.maxGuesses - 1) {
//         // Game over logic here if needed
//       }
//       this.currentGuess += 1
//     }
//   }

//   handleKeyup = (e: KeyboardEvent) => {
//     if (this.won || this.lost) {
//       return
//     }

//     if (e.key === 'Enter' && this.guesses[this.currentGuess].length === 6) {
//       return this.submitGuess()
//     }

//     if (e.key === 'Backspace') {
//       this.guesses[this.currentGuess] = this.guesses[this.currentGuess].slice(0, -1)
//       return
//     }

//     if (this.guesses[this.currentGuess].length < 6 && e.key.match(/^[A-z]$/)) {
//       this.guesses[this.currentGuess] += e.key.toLowerCase()
//     }
//   }
// }

// export default new PuzzleStore()


import { makeAutoObservable } from 'mobx'
import words from '../words.json'
import wordlist from '../wordlist.json'

export type Difficulty = "default" | 'easy' | 'medium' | 'hard' | 'impossible'

class PuzzleStore {
  word = ''
  guesses: string[] = []
  currentGuess = 0
  difficulty: Difficulty = 'default'
  maxGuesses = 6

  constructor() {
    makeAutoObservable(this)
    if (typeof window !== 'undefined') {
      const storedDifficulty = localStorage.getItem('difficulty')
      if (storedDifficulty) {
        this.setDifficulty(storedDifficulty as Difficulty)
      } else {
        this.init()
      }
    } else {
      this.init()
    }
  }

  get won() {
    return this.guesses[this.currentGuess - 1] === this.word
  }

  get lost() {
    return this.currentGuess === this.maxGuesses
  }

  get allGuesses() {
    return Array.from(new Set(this.guesses.join('')))
  }

  get exactGuesses() {
    return Array.from(new Set(
      this.word.split('').filter((letter, i) => 
        this.guesses.slice(0, this.currentGuess).some(guess => guess[i] === letter)
      )
    ))
  }

  get submittedGuesses() {
    return this.guesses.slice(0, this.currentGuess)
  }

  get allSubmittedLetters() {
    return Array.from(new Set(this.submittedGuesses.join('')))
  }

  get inexactGuesses() {
    return Array.from(new Set(
      this.word.split('').filter(letter => this.allSubmittedLetters.includes(letter))
    )).filter(letter => !this.exactGuesses.includes(letter))
  }

  setDifficulty(difficulty: Difficulty) {
    this.difficulty = difficulty
    if (typeof window !== 'undefined') {
      localStorage.setItem('difficulty', difficulty)
    }
    switch (difficulty) {
      case 'easy':
        this.maxGuesses = 7
        break
      case 'medium':
        this.maxGuesses = 5
        break
      case 'hard':
        this.maxGuesses = 3
        break
      case 'impossible':
        this.maxGuesses = 1
        break
      default:
        this.maxGuesses = 6
    }
    this.resetGame()
  }

  resetGame() {
    this.init()
  }

  init() {
    this.word = wordlist[Math.floor(Math.random() * wordlist.length)]
    this.guesses = new Array(this.maxGuesses).fill('')
    this.currentGuess = 0
  }

  submitGuess() {
    if (words.includes(this.guesses[this.currentGuess])) {
      if (this.guesses[this.currentGuess] === this.word || this.currentGuess === this.maxGuesses - 1) {
        // Game over logic here if needed
      }
      this.currentGuess += 1
    }
  }

  handleKeyup = (e: KeyboardEvent) => {
    if (this.won || this.lost) {
      return
    }

    if (e.key === 'Enter' && this.guesses[this.currentGuess].length === 6) {
      return this.submitGuess()
    }

    if (e.key === 'Backspace') {
      this.guesses[this.currentGuess] = this.guesses[this.currentGuess].slice(0, -1)
      return
    }

    if (this.guesses[this.currentGuess].length < 6 && e.key.match(/^[A-z]$/)) {
      this.guesses[this.currentGuess] += e.key.toLowerCase()
    }
  }

  handleInput = (input: string) => {
    if (this.won || this.lost) {
      return
    }

    if (input === 'Enter' && this.guesses[this.currentGuess].length === 6) {
      return this.submitGuess()
    }

    if (input === 'Backspace') {
      this.guesses[this.currentGuess] = this.guesses[this.currentGuess].slice(0, -1)
      return
    }

    if (this.guesses[this.currentGuess].length < 6 && input.match(/^[A-z]$/)) {
      this.guesses[this.currentGuess] += input.toLowerCase()
    }
  }
}

export default new PuzzleStore()



