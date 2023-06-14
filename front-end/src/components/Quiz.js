import { useState, useEffect } from "react";
import { getAllQuestions, postQuizScore } from "../api/api";
import { useNavigate } from "react-router-dom";
import "../styles/quiz.css";
export default function Quiz() {
  const [quiz, setQuiz] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const ac = new AbortController();
    async function listOfQuestions() {
      try {
        const data = await getAllQuestions(ac.signal);
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
    return () => {
      ac.abort();
    };
  }, []);

  const handleAnswerChange = (e) => {
    setSelectedAnswer(e.target.value);
  };

  const handleNextClick = () => {
    if (selectedAnswer === quiz[currentIndex].correct) {
      setCount((previousCount) => previousCount + 1);
    }
    setCurrentIndex((currentIndex) => currentIndex + 1);
    setSelectedAnswer(null);
  };

  const handleFinalClick = async () => {
    if (selectedAnswer === quiz[currentIndex].correct) {
      setCount((count) => count + 1);
    }
    setCurrentIndex((currentIndex) => currentIndex + 1);
  };

  const saveFinalScore = async () => {
    const ac = new AbortController();
    try {
      const finalScore = Math.floor((count / quiz.length) * 100);
      await postQuizScore({ score: finalScore }, ac.signal);
      navigate("/scores");
    } catch (error) {
      if (error.name === "AbortError") {
        ac.abort();
      } else {
        throw error;
      }
    }
  };

  if (quiz.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = quiz[currentIndex];

  return (
    <>
      <div className="score">
        <h3>Score: {Math.floor((count / quiz.length) * 100)}</h3>
      </div>

      <div className="entire">
        {currentQuestion && (
          <div className="quiz-container" id="quiz">
            <div className="quiz-info">
              <h2>{currentQuestion.question}</h2>
              <ul>
                {Object.entries(currentQuestion).map(([key, value]) => {
                  if (key.includes("answer")) {
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
                    );
                  }
                  return null;
                })}
              </ul>
            </div>
            {currentIndex !== quiz.length - 1 ? (
              <button onClick={handleNextClick}>Next Question</button>
            ) : (
              <button onClick={handleFinalClick}>Final Question</button>
            )}
          </div>
        )}
      </div>
      <div className="subContainer">
        {handleFinalClick && (
          <button type="submit" id="submit" onClick={saveFinalScore}>
            Submit
          </button>
        )}
      </div>
    </>
  );
}
