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
//         this.maxGuesses = 5
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


// ********************************************************************************************************


import { makeAutoObservable, observable, toJS } from 'mobx'
import words from '../words.json'
import wordlist from '../wordlist.json'
import { supabase } from '../lib/supabaseClient'

export type Difficulty = "default" | 'easy' | 'medium' | 'hard' | 'impossible'

class PuzzleStore {
  word = ''
  guesses = observable.array<string>([])
  currentGuess = 0
  difficulty: Difficulty = 'default'
  maxGuesses = 5
  lastGuessColors: string[] | null = null
  
  constructor() {
    makeAutoObservable(this, {
      word: true,
      guesses: observable,  // Change to simple observable for better reactivity
      currentGuess: true,
      difficulty: true,
      maxGuesses: true,
      lastGuessColors: true
    }, { autoBind: true })
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
    console.log('PuzzleStore initialized:', { word: this.word, currentGuess: this.currentGuess, guesses: this.guesses })
  }

  get won() {
    const lastGuess = toJS(this.guesses)[this.currentGuess - 1];
    return lastGuess === this.word;
  }

  get lost() {
    return !this.won && this.currentGuess === this.maxGuesses;
  }

  get allGuesses() {
    return Array.from(new Set(toJS(this.guesses).join('')))
  }

  get exactGuesses() {
    return Array.from(new Set(
      this.word.split('').filter((letter, i) => 
        toJS(this.guesses).slice(0, this.currentGuess).some(guess => guess[i] === letter)
      )
    ))
  }

  get submittedGuesses() {
    return toJS(this.guesses).slice(0, this.currentGuess)
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
        this.maxGuesses = 5
    }
    this.resetGame()
  }

  resetGame() {
    this.init()
  }

  // Removed duplicate init() and submitGuess() functions

  fetchGuessColors = async () => {
    try {
      console.log('fetchGuessColors called')
      
      // Always proceed with the API call, even for the first guess
      if (!toJS(this.guesses)[this.currentGuess]) {
        console.log('No valid guess to check, skipping API call')
        return
      }

      console.log('Current state before API call:', { 
        word: this.word, 
        currentGuess: this.currentGuess, 
        guesses: toJS(this.guesses),
        lastGuessColors: toJS(this.lastGuessColors)
      })

      // Create the request body directly with all required fields
      const requestBody = {
        word: String(this.word),
        currentGuess: this.currentGuess,
        guesses: toJS(this.guesses),
        mostRecentGuessColors: toJS(this.lastGuessColors) || []
      };
      
      const stringifiedBody = JSON.stringify(requestBody);
      
      // Log after stringification to see exact data being sent
      // Log full request body structure
      console.log('Request body:', {
        word: requestBody.word,
        currentGuess: requestBody.currentGuess,
        guesses: requestBody.guesses,
        mostRecentGuessColors: requestBody.mostRecentGuessColors
      });

      const response = await fetch('/api/getGuessColors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: stringifiedBody,
      })

      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('Response data:', data)

      if (response.ok && data.colors) {
        this.lastGuessColors = data.colors
        console.log('Fetched colors:', data.colors)


        // Save colors to Supabase
        try {
        const { error } = await supabase
          .from('guess_colors')
          .insert([
            { colors: data.colors }
          ])
        
        if (error) {
          console.error('Error saving colors to Supabase:', error)
        } else {
          console.log('Colors saved to Supabase successfully')
        }
      } catch (supabaseError) {
        console.error('Supabase error:', supabaseError)
      }

      } else {
        console.error('API error or no colors returned:', data.message || 'Unknown error')
      }
    } catch (error) {
      console.error('Failed to fetch guess colors:', error)
    }
  }

  getRecentColors = async () => {
    try {
      const { data, error } = await supabase
        .from('guess_colors')
        .select('colors')
        .order('created_at', { ascending: false })
        .limit(1)
        .single()
  
      if (error) {
        console.error('Error fetching recent colors:', error)
        return null
      }
  
      return data.colors
    } catch (error) {
      console.error('Failed to fetch recent colors:', error)
      return null
    }
  }

  initializeFirstGuess() {
    if (!this.guesses[0]) {
      this.guesses.replace([...this.guesses.slice(0, 0), '', ...this.guesses.slice(1)]);
    }
  }

  init() {
    this.word = wordlist[Math.floor(Math.random() * wordlist.length)]
    const newGuesses = new Array(this.maxGuesses).fill('')
    this.guesses.replace(newGuesses);
    console.log('Store initialized with guesses:', this.guesses.slice());
    this.currentGuess = 0
    this.lastGuessColors = ['bg-black', 'bg-black', 'bg-black', 'bg-black', 'bg-black', 'bg-black']
    console.log('PuzzleStore initialized:', { word: this.word, currentGuess: this.currentGuess, guesses: this.guesses.slice() })
  }

  // run in action
  runInAction (action: () => void) {
    action()
  }

  async submitGuess() {
    console.log('submitGuess called')
    if (this.currentGuess < this.maxGuesses && toJS(this.guesses)[this.currentGuess].length === 6) {
      console.log('Submitting guess:', { currentGuess: this.currentGuess, guess: toJS(this.guesses)[this.currentGuess] })
      if (words.includes(toJS(this.guesses)[this.currentGuess])) {
        // Calculate colors for the current guess
        const newColors = Array(6).fill('').map((_, i) => {
          const currentGuess = toJS(this.guesses)[this.currentGuess];
          if (currentGuess[i] === this.word[i]) {
            return 'bg-green-400'
          } else if (this.word.includes(currentGuess[i])) {
            return 'bg-yellow-400'
          } else {
            return 'bg-black'
          }
        })
        
        // Set the colors and call the API before updating game state
        this.lastGuessColors = newColors;
        
        const apiPromise = this.fetchGuessColors();
        
        if (toJS(this.guesses)[this.currentGuess] === this.word || this.currentGuess === this.maxGuesses - 1) {
          console.log('Game over condition met')
        }
        
        // Wait for API call to complete before incrementing
        await apiPromise;
        
        this.runInAction(() => {
            this.currentGuess += 1;
        });
        console.log('Current guess incremented:', this.currentGuess)
      } else {
        console.log('Invalid word:', toJS(this.guesses)[this.currentGuess])
      }
      console.log('Current state after submission:', { word: this.word, currentGuess: this.currentGuess, guesses: toJS(this.guesses) })
    } else {
      console.log('Cannot submit guess: either max guesses reached or current guess is not complete')
    }
  }

  handleKeyup = async (e: KeyboardEvent) => {
    if (this.won || this.lost) {
      return
    }

    // Ensure currentGuess is within bounds
    if (this.currentGuess >= this.maxGuesses) {
      return
    }

    // Initialize current guess if needed
    const currentGuesses = toJS(this.guesses);
    if (!currentGuesses[this.currentGuess]) {
      this.guesses.splice(this.currentGuess, 1, '');
    }

    if (e.key === 'Enter' && toJS(this.guesses)[this.currentGuess].length === 6) {
      await this.submitGuess()
      return
    }

    if (e.key === 'Backspace') {
      const currentGuess = toJS(this.guesses)[this.currentGuess];
      this.guesses.splice(this.currentGuess, 1, currentGuess.slice(0, -1));
      return
    }

    if (e.key.match(/^[A-Za-z]$/)) {
      const currentGuess = toJS(this.guesses)[this.currentGuess];
      if (currentGuess.length < 6) {
        this.guesses.splice(this.currentGuess, 1, currentGuess + e.key.toLowerCase());
        console.log('Updated guesses (keyup):', this.guesses.slice())
      }
    }
  }

  handleInput = (input: string) => {
    if (this.won || this.lost) {
      return
    }

    // Initialize current guess if needed
    if (!toJS(this.guesses)[this.currentGuess]) {
      this.guesses.splice(this.currentGuess, 1, '');
    }

    if (input === 'Enter' && toJS(this.guesses)[this.currentGuess].length === 6) {
      this.submitGuess()
      return
    }

    if (input === 'Backspace') {
      const currentGuess = toJS(this.guesses)[this.currentGuess];
      const newGuess = currentGuess.slice(0, -1);
      this.guesses.splice(this.currentGuess, 1, newGuess);
      return
    }

    // Handle letter input
    if (input.match(/^[A-Za-z]$/)) {
      const currentGuess = toJS(this.guesses)[this.currentGuess] || '';
      if (currentGuess.length < 6) {
        const newGuess = currentGuess + input.toLowerCase();
        this.guesses.splice(this.currentGuess, 1, newGuess);
        console.log('Updated guesses:', this.guesses.slice())
      }
    }
  }
}

export default new PuzzleStore()







