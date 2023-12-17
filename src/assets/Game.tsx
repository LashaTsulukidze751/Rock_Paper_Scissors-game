import { useEffect, useState } from "react";

function Game() {
  const [userOption, setUserOption] = useState("");
  const [computerOption, setComputerOption] = useState("");
  const [randomAiIcon, setRandomAiIcon] = useState("scissors");
  const [randomColor, setRandomColor] = useState("blue");
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [won, setWon] = useState("");

  useEffect(() => {
    setWon(gameLogic());
  }, [userOption]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomAiIcon(options[Math.floor(Math.random() * 3)]);
      setRandomColor(colors[Math.floor(Math.random() * 3)]);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const options: string[] = ["rock", "scissors", "paper"];
  const colors: string[] = ["red", "green", "blue"];

  function getRandomAiIcon() {
    setComputerOption(options[Math.floor(Math.random() * 3)]);
  }

  function gameLogic() {
    if (userOption === computerOption) {
      return "draw";
    } else if (
      (userOption === "rock" && computerOption === "scissors") ||
      (userOption === "scissors" && computerOption === "paper") ||
      (userOption === "paper" && computerOption === "rock")
    ) {
      setUserScore((prevscore) => prevscore + 1);
      return "user won";
    } else {
      setComputerScore((prevscore) => prevscore + 1);
      return "computer won";
    }
  }

  const handleUserOptionClick = (option: string) => {
    setTimeout(() => {
      setUserOption(option);
      getRandomAiIcon();
    }, 200);
  };

  return (
    <div className="flex items-start justify-between w-11/12 text-2xl h-60 sm:w-9/12 lg:w-7/12 lg:text-4xl xl:w-5/12 ">
      <div className="flex flex-col items-center w-1/6 h-full border-2 border-red-700 rounded">
        <h2>AI</h2>
        <div className="flex items-center h-full">
          <button
            className={`border border-orange-500 duration-100 rounded-md bg-${randomColor}-500 `}
          >
            <img
              className="w-14 h-14 lg:w-16 lg:h-16"
              src={`src/assets/images/${randomAiIcon}.png`}
              alt=""
            />
          </button>
        </div>
      </div>
      <div className="w-4/6 h-full">
        <section className="flex justify-center ">
          <h5>{computerScore}</h5>
          <p>:</p>
          <h5>{userScore}</h5>
        </section>
        <section className="flex justify-around mt-6"></section>
        <section className="flex items-end mt-5 justify-evenly">
          <div className="flex flex-col items-center w-24 border-2 border-gray-300 rounded">
            <h4 className="">
              {computerOption &&
                (won !== "draw"
                  ? won === "computer won"
                    ? "WIN"
                    : "LOSE"
                  : "DRAW")}
            </h4>
            {computerOption && (
              <img
                src={`src/assets/images/${computerOption}.png`}
                alt=""
                className="w-20 h-20 "
              />
            )}

            <p>{computerOption.toLocaleUpperCase()}</p>
          </div>
          <p>VS</p>
          <div className="flex flex-col items-center w-24 border-2 border-white rounded">
            <h4>
              {userOption &&
                (won !== "draw"
                  ? won === "user won"
                    ? "WIN"
                    : "LOSE"
                  : "DRAW")}
            </h4>
            {userOption && (
              <img
                src={`src/assets/images/${userOption}.png`}
                alt=""
                className="w-20 h-20 "
              />
            )}
            <p>{userOption.toLocaleUpperCase()}</p>
          </div>
        </section>
      </div>
      <div className="flex flex-col items-center w-1/6 h-full border-2 border-red-700 rounded">
        <h2>USER</h2>
        <div className="flex flex-col items-center w-full h-full justify-evenly">
          <button
            onClick={() => handleUserOptionClick("rock")}
            className="mt-1 border border-orange-500 rounded-md hover:bg-orange-500"
            title="Rock"
          >
            <img
              className="w-14 h-14 lg:w-16 lg:h-16"
              src="src/assets/images/rock.png"
              alt=""
            />
          </button>
          <button
            onClick={() => handleUserOptionClick("scissors")}
            className="mt-1 border border-orange-500 rounded-md hover:bg-orange-500"
            title="Scissors"
          >
            <img
              className="w-14 h-14 lg:w-16 lg:h-16"
              src="src/assets/images/scissors.png"
              alt=""
            />
          </button>
          <button
            onClick={() => handleUserOptionClick("paper")}
            className="mt-1 border border-orange-500 rounded-md hover:bg-orange-500"
            title="Paper"
          >
            <img
              className="w-14 h-14 lg:w-16 lg:h-16"
              src="src/assets/images/paper.png"
              alt=""
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Game;
