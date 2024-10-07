import { useCallback, useEffect, useState } from "react";

const WORD_LENGTH = 5;
const MAX_GUESS_ATTEMPTS = 6;
enum Correctness {
  Unknown = 0,
  Incorrect = 1,
  Misplaced = 2,
  Correct = 3,
}

function evaluateGuess(guess: string, answer: string): wordData {
  if (guess.length !== answer.length) {
    throw new Error("The strings must have the same length");
  }
  return guess.split("").map((c: string, index) => ({
    c,
    correctness:
      c === answer[index]
        ? Correctness.Correct
        : answer.includes(c)
        ? Correctness.Misplaced
        : Correctness.Incorrect,
  }));
}

function getStyleByCorrectness(correctness: Correctness): string {
  switch (correctness) {
    case Correctness.Correct:
      return "bg-green-400 text-white";
    case Correctness.Misplaced:
      return "bg-yellow-400 text-white";
    case Correctness.Incorrect:
      return "bg-neutral-400 text-white";
    default:
      return "bg-stone-100 border-2 text-black";
  }
}

type characterData = {
  c: string;
  correctness: Correctness;
};
interface characterInput {
  character: characterData;
}

function Character({ character }: characterInput) {
  return (
    <div
      className={`${getStyleByCorrectness(
        character.correctness
      )} aspect-square w-1/6 flex justify-center items-center`}
    >
      <p className="font-extrabold text-3xl leading-none">{character.c}</p>
    </div>
  );
}

type wordData = characterData[];
interface wordInput {
  word: wordData;
}

function Word({ word }: wordInput) {
  return (
    <div className="flex justify-between p-1">
      {word.map((character, index) => (
        <Character character={character} key={index} />
      ))}
    </div>
  );
}

interface gameBoardInput {
  words: wordData[];
}

function GameBoard({ words }: gameBoardInput) {
  return (
    <div className="bg-white flex-col w-60">
      {words.map((word, index) => (
        <Word word={word} key={index} />
      ))}
    </div>
  );
}

interface KeyboardButtonInput {
  character: characterData;
  handleKeyPress: (key: string) => void;
}
function KeyboardButton({ character, handleKeyPress }: KeyboardButtonInput) {
  return (
    <button
      className={`w-full h-12 flex-grow mx-1 ${getStyleByCorrectness(
        character.correctness
      )}`}
      onClick={(e) => {
        e.preventDefault();
        handleKeyPress(character.c);
        e.currentTarget.blur();
      }}
    >
      {character.c}
    </button>
  );
}

interface WordleKeyboardInput {
  words: wordData[];
  handleKeyPress: (key: string) => void;
}
function WordleKeyboard({ words, handleKeyPress }: WordleKeyboardInput) {
  function buildCharMap(words: wordData[]) {
    const charMap = new Map<string, Correctness>();

    for (const word of words) {
      for (const char of word) {
        if (charMap.has(char.c) && charMap.get(char.c)! > char.correctness) {
          continue;
        }
        charMap.set(char.c, char.correctness);
      }
    }
    return charMap;
  }
  function buildKeyboardRow(keys: string, charMap: Map<string, Correctness>) {
    return keys.split(" ").map((key) => ({
      c: key,
      correctness: charMap.get(key) ?? Correctness.Unknown,
    }));
  }
  const charMap = buildCharMap(words);
  const keyboardRow1 = buildKeyboardRow("Q W E R T Y U I O P", charMap);
  const keyboardRow2 = buildKeyboardRow("A S D F G H J K L", charMap);
  const keyboardRow3 = buildKeyboardRow(
    "ENTER Z X C V B N M Backspace",
    charMap
  );
  return (
    <div className="flex-col justify-center items-center w-full max-w-full">
      <div className="flex justify-center mb-1 w-full">
        {keyboardRow1.map((char, index) => {
          return (
            <KeyboardButton
              key={index}
              character={char}
              handleKeyPress={handleKeyPress}
            />
          );
        })}
      </div>
      <div className="flex justify-center mb-1 w-full">
        {keyboardRow2.map((char, index) => {
          return (
            <KeyboardButton
              key={index}
              character={char}
              handleKeyPress={handleKeyPress}
            />
          );
        })}
      </div>
      <div className="flex justify-center mb-1 w-full">
        {keyboardRow3.map((char, index) => {
          return (
            <KeyboardButton
              key={index}
              character={char}
              handleKeyPress={handleKeyPress}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function Wordle() {
  const [answer, setAnswer] = useState("LAGER");
  const [words, setWords] = useState<wordData[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);

  function resetGame() {
    setAnswer(answer === "FLOUR" ? "LAGER" : "FLOUR");
    setWords([]);
    setInputValue("");
    setIsGameOver(false);
  }

  const handleSubmit = useCallback(
    (guess: string) => {
      const word: wordData = evaluateGuess(guess, answer);
      // todo: check word is in the dictionary
      setInputValue("");
      setWords((prev) => {
        return [...prev, word];
      });
    },
    [answer]
  );

  const handleKeyPress = useCallback(
    (key: string) => {
      if (isGameOver) return;
      if (key === "ENTER" && inputValue.length === WORD_LENGTH) {
        handleSubmit(inputValue);
      } else if (key === "Backspace") {
        setInputValue((prev) => prev.slice(0, -1));
      } else if (key.match(/^[A-Z]$/) && inputValue.length < WORD_LENGTH) {
        setInputValue((prev) => prev + key);
      }
    },
    [inputValue, isGameOver, handleSubmit]
  );
  const wordsDisplay: wordData[] = [...words];
  if (wordsDisplay.length < MAX_GUESS_ATTEMPTS) {
    let inputValueDisplay = inputValue.split("").map((c) => ({
      c,
      correctness: Correctness.Unknown,
    }));
    inputValueDisplay = inputValueDisplay.concat(
      new Array(WORD_LENGTH - inputValueDisplay.length).fill({
        c: " ",
        correctness: Correctness.Unknown,
      })
    );
    wordsDisplay.push(inputValueDisplay);
  }
  while (wordsDisplay.length < MAX_GUESS_ATTEMPTS) {
    wordsDisplay.push(
      Array(WORD_LENGTH).fill({ c: " ", correctness: Correctness.Unknown })
    );
  }

  // handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      handleKeyPress(e.key.toUpperCase());
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyPress]);

  // Handle win/loss conditions based on the current state of words and answer
  useEffect(() => {
    // win
    if (words.some((word) => word.map((c) => c.c).join("") === answer)) {
      alert("You win!");
      setIsGameOver(true);
    }

    // lose
    if (
      words.length === MAX_GUESS_ATTEMPTS &&
      !words.some((word) => word.map((c) => c.c).join("") === answer)
    ) {
      alert("You lose!");
      setIsGameOver(true);
    }
  }, [words, answer]);

  return (
    <div className="Wordle flex flex-col justify-center items-center">
      <p>The answer is {answer}.</p>
      <GameBoard words={wordsDisplay} />
      <div className="grid grid-cols-3 items-center w-full">
        <div className="col-start-2 col-span-1 place-self-center w-full max-w-lg">
          <WordleKeyboard words={words} handleKeyPress={handleKeyPress} />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.currentTarget.blur();
            resetGame();
          }}
          className="p-2 bg-gray-200 rounded justify-self-end mr-4"
        >
          <i className="fas fa-redo"></i>
        </button>
      </div>
    </div>
  );
}
