import { useCallback, useEffect, useState } from 'react'
import './app.css'
import words from './assets/wordList.json'
import HangmanDrawing, { BODY_PARTS } from './components/HangmanDrawing'
import HangmanWord from './components/HangmanWord'
import Keyboard from './components/Keyboard'

const getWord = () => {
  return words[Math.floor(Math.random() * words.length)]
}

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord())
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const inCorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  )

  const isLoser = inCorrectLetters.length >= BODY_PARTS.length
  const isWinner = wordToGuess
    .split('')
    .every((letter) => guessedLetters.includes(letter))

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return

      setGuessedLetters((currentLetters) => [...currentLetters, letter])
    },
    [guessedLetters]
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      if (!key.match(/^[a-z]$/)) return

      e.preventDefault()
      addGuessedLetter(key)
    }

    document.addEventListener('keypress', handler)

    return () => {
      document.removeEventListener('keypress', handler)
    }
  }, [guessedLetters, isLoser, isWinner])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      if (key !== 'Enter') return

      e.preventDefault()
      setGuessedLetters([])
      setWordToGuess(getWord())
    }

    document.addEventListener('keypress', handler)

    return () => {
      document.removeEventListener('keypress', handler)
    }
  }, [])

  return (
    <div className="container">
      <div className="top-text">
        {isWinner && 'Winner! - Refresh to try again'}
        {isLoser && 'You lost! - Refresh to try again'}
      </div>
      <HangmanDrawing numberOfGuesses={inCorrectLetters.length} />
      <HangmanWord
        reveal={isLoser}
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
      />
      <Keyboard
        disabled={isWinner || isLoser}
        activeLetters={guessedLetters.filter((letter) =>
          wordToGuess.includes(letter)
        )}
        inactiveLetters={inCorrectLetters}
        addGuessedLetter={addGuessedLetter}
      />
    </div>
  )
}

export default App
