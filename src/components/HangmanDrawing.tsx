import '../App.css'

type HangmanDrawingProps = {
  numberOfGuesses: number
}

const HEAD = <div className="head" />
const BODY = <div className="body-part body" />
const LEFT_ARM = <div className="body-part left-arm arm" />
const RIGHT_ARM = <div className="body-part right-arm arm" />
const LEFT_LEG = <div className="body-part left-leg leg" />
const RIGHT_LEG = <div className="body-part right-leg leg" />

export const BODY_PARTS = [HEAD, BODY, LEFT_ARM, RIGHT_ARM, LEFT_LEG, RIGHT_LEG]

const HangmanDrawing = ({ numberOfGuesses }: HangmanDrawingProps) => {
  return (
    <div className="drawing">
      {BODY_PARTS.slice(0, numberOfGuesses)}
      <div className="top-pole" />
      <div className="top-bar" />
      <div className="pole" />
      <div className="bottom-bar" />
    </div>
  )
}

export default HangmanDrawing
