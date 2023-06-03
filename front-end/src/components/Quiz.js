import { useState, useEffect } from "react";
import { getAllQuestions, postQuizScore } from "../api/api";
export default function Quiz() {
  const [quiz, setQuiz] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [displayScore, setDisplayScore]= useState(0);
  const [finalScore, setFinalScore] = useState(score);
  const maxClicks = quiz.length-1
  const [clicks, setClicks]=useState(0)

  useEffect(() => {
    const ac = new AbortController();
    async function listOfQuestions() {
      try {
        const data = await getAllQuestions(ac.signal);
        console.log("this is data", data)
        setQuiz(data.questions ? data.questions : []);
      } catch (error) {
        if (error.name === "AbortError") {
          ac.abort();
        } else {
          throw error;
        }
      }
    }
    listOfQuestions();
    return ()=>{
      ac.abort();
    }
  }, []);

  useEffect(() => {
    console.log("this is final score before setting", finalScore)
    setFinalScore(Math.floor((score / quiz.length) * 100));

  }, [score, quiz.length]);

  const handleAnswerChange = (e) => {
    setSelectedAnswer(e.target.value);
  };

  const handleNextClick = () => {
    console.log("selectedAnswer is:", selectedAnswer);
    console.log("quiz is:", quiz);
    console.log("currentIndex is:", currentIndex);

    if (selectedAnswer === quiz[currentIndex].correct) {
      setScore((score) => score + 1);
    }

    setCurrentIndex((currentIndex) => currentIndex + 1);
    setSelectedAnswer(null);
    setDisplayScore(Math.floor((score/(currentIndex))*100))
  };

  const handleFinalClick = () => {
    if (selectedAnswer === quiz[currentIndex].correct) {
      setScore((score) => score + 1);
    }
    if(clicks < maxClicks){
      setClicks((clicks => clicks + 1))
    }

    const ac = new AbortController();

    const saveFinalScore = async () => {
      try {
        await postQuizScore({score:finalScore}, ac.signal);
      } catch (error) {
        if (error.name === "AbortError") {
          ac.abort();
        } else {
          throw error;
        }
      }
    };

    saveFinalScore();

    return () => {
      ac.abort();
    };

  };

  if (quiz.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = quiz[currentIndex];

  return(
    <>
      <h1>{displayScore}</h1>
      {displayScore <= 100 &&
      (<div className="score">
        Score: {displayScore}
      </div>)
      }
      {currentQuestion && (
        <div className="quiz-container" id="quiz">
          <div className="quiz-info">
            <h2>{currentQuestion.question}</h2>
            <ul>
              {Object.entries(currentQuestion).map(([key, value]) => {
                if(key.includes("answer")){
                  return (
                    <li key={key}>
                      <input
                        type="radio"
                        id={key}
                        name="answer"
                        value={key}
                        className="answer"
                        checked={selectedAnswer === key}
                        onChange={handleAnswerChange}
                        />
                        <label htmlFor={key} id={`${key}-text`}>
                          {value}
                        </label>
                    </li>
                  )
                }
                return null;
              })}
            </ul>
          </div>
          {currentIndex !== quiz.length - 1 ? (
            <button onClick={handleNextClick}>Next Question</button>
          ) : (
            <button type="submit" onClick={handleFinalClick} disabled={clicks >=maxClicks}>
              Final Question
            </button>
          )}
        </div>
      )}
    </>
  )
}
