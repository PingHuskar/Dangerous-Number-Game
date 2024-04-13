import { useState } from 'react'
import { IsMoreThan, snumpat, numinbase10 } from "operation-strint";
// import b from "isdivisiblebyx"
import './index.css'

function App() {

  const [minNumber, setMinNumber] = useState("0");
  const [maxNumber, setMaxNumber] = useState("99");
  const [dangerousNumber, setDangerousNumber] = useState("10");
  const [guessNumber, setGuessNumber] = useState(minNumber);
  const [gameOver, setGameOver] = useState(false);
  Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
  };
  const randomDangerousNumber = () => {
    return numinbase10.random() + numinbase10.random();
  }

  const NewGame = () => {
    setMinNumber(() => "0");
    setMaxNumber(() => "99");
    setGuessNumber(() => "");
    setDangerousNumber(() => randomDangerousNumber().replace(/^0+/g, ""));
    setGameOver(() => false)
  }
  const CheckDangerousNumber = (snum) => {
    if (snum === dangerousNumber) {
      setGameOver(() => true);
    } else if (IsMoreThan(snum, dangerousNumber)) {
      setMaxNumber(() => snum);
    } else if (IsMoreThan(dangerousNumber, snum)) {
      setMinNumber(() => snum);
    } else {
      console.log(`else`);
      alert(`error`);
    }
  }

  return (
    <div className="flex text-3xl flex-col justify-center align-middle w-[100vw] h-[100vh]">
      {IsMoreThan(dangerousNumber, minNumber) &&
        IsMoreThan(maxNumber, dangerousNumber) && (
          <>
            <>minNumber: {minNumber}</>
            <br />
            <>maxNumber: {maxNumber}</>
            <br />
            <>dangerousNumber: {dangerousNumber}</>
            <br />
            {!gameOver && (
              <>
                <input
                  type="text"
                  value={guessNumber}
                  onChange={(e) => {
                    e.preventDefault();
                    setGuessNumber(e.target.value);
                  }}
                />
                {IsMoreThan(guessNumber, minNumber) &&
                  IsMoreThan(maxNumber, guessNumber) &&
                  guessNumber &&
                  !/0+/.test(guessNumber) &&
                  snumpat.test(guessNumber) && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        CheckDangerousNumber(guessNumber);
                      }}
                    >
                      Submit
                    </button>
                  )}
              </>
            )}
            {gameOver && (
              <>
                <h2>Game Over</h2>
                <h3>Dangerous Number is {dangerousNumber}</h3>
              </>
            )}
          </>
        )}
      <br />
      <button
        onClick={(e) => {
          e.preventDefault();
          NewGame();
        }}
      >
        New Game
      </button>
    </div>
  );
}

export default App
