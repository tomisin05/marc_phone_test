import { NextApiRequest, NextApiResponse } from 'next'
import PuzzleStore from '../../stores/PuzzleStore'

let puzzleStoreInstance: typeof PuzzleStore | null = null

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // console.log('Parsed request body:', {
  //   word: req.body.word,
  //   currentGuess: req.body.currentGuess,
  //   guesses: req.body.guesses,
  //   mostRecentGuessColors: req.body.mostRecentGuessColors,
  // })

  let word, currentGuess, guesses, mostRecentGuessColors;

  console.log('Parsed request body:', {
    word: req.body.word,
    currentGuess: req.body.currentGuess,
    guesses: req.body.guesses,
    mostRecentGuessColors: req.body.mostRecentGuessColors,
  })

  if (req.method === 'GET') {
    console.log('Received GET request, this should not happen in production')
    return res.status(200).json({ message: 'GET request received, no action taken' })
  } else if (req.method === 'POST') {
    console.log('Processing POST request with guesses:', req.body.guesses);
    try {
      const body = req.body;
      word = body.word;
      mostRecentGuessColors = body.mostRecentGuessColors;
      currentGuess = body.currentGuess;
      guesses = body.guesses;
      
      // Handle first guess or subsequent guesses
      const guessToCheck = currentGuess === 0 ? guesses[0] : guesses[currentGuess - 1];
      console.log('Checking guess:', guessToCheck);
      
      if (!guessToCheck || guessToCheck === '') {
        // Return default colors for empty guess
        return res.status(200).json({
          colors: ['bg-black', 'bg-black', 'bg-black', 'bg-black', 'bg-black', 'bg-black']
        });
      }
      
      // Calculate colors for each letter
      const colors = guessToCheck.split('').map((letter, index) => {
        if (letter === word[index]) {
          return 'bg-green-400';
        } else if (word.includes(letter)) {
          return 'bg-yellow-400';
        } else {
          return 'bg-black';
        }
      });
      
      return res.status(200).json({ colors, mostRecentGuessColors: colors });
    } catch (error) {
      console.error('Error processing request:', error);
      return res.status(400).json({ message: 'Error processing request' });
    }
  } else {
    console.log('Method not allowed:', req.method);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('Parsed state:', { word, currentGuess, guesses })

    if (!word || currentGuess === undefined || !guesses) {
      console.log('Invalid request body')
      return res.status(400).json({ message: 'Invalid request body' })
    }

    const currentGuessIndex = currentGuess - 1
    console.log('Current guess index:', currentGuessIndex)
    if (currentGuessIndex < 0) {
      return res.status(200).json({ colors: [] })
    }

    const lastGuess = guesses[currentGuessIndex]
    if (!lastGuess) {
      return res.status(400).json({ message: 'No guess available' })
    }

    const colors = lastGuess.split('').map((letter, index) => {
      if (letter === word[index]) {
        return 'green'
      } else if (word.includes(letter)) {
        return 'yellow'
      } else {
        return 'gray'
      }
    })

    console.log('Calculated colors:', colors)
    res.status(200).json({ colors })
  } catch (error) {
    console.error('Error in getGuessColors:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
