import { useState, useEffect } from "react";
import { getAllQuestions,postQuizScore } from "../api/api";
export default function Quiz() {
  const [quiz, setQuiz] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    async function listOfQuestions() {
      const ac = new AbortController();
      try {
        const data = await getAllQuestions(ac.signal);
        setQuiz(data);
      } catch (error) {
        if (error.name === "AbortError") {
          ac.abort();
        } else {
          throw error;
        }
      }
      return () => ac.abort();
    }
    listOfQuestions();
  }, []);
  const handleAnswerChange = (e) => {
    setSelectedAnswer(e.target.value);
  };
  const handleNextClick = () => {
    if (selectedAnswer === currentQuestion.correct) {
      setScore(score + 1);
    }
    setCurrentIndex(currentIndex + 1);
    setSelectedAnswer(null);
  };

  const handleFinalClick = () =>{
    if (selectedAnswer === currentQuestion.correct) {
      setScore(score + 1);
    }
    const finalScore = (score/quiz.length)*100
    const saveFinalScore = async () =>{
      const ac = new AbortController();
      try{
        await postQuizScore(finalScore, ac.signal)
      }catch(error){
        if(error.name === "AbortError"){
          ac.abort();
        }else{
          throw error
        }
      }
      return () => ac.abort();
    }
    saveFinalScore();
  }
  const currentQuestion = quiz[currentIndex];
  return (
    <>
      <div className="score">score: {(score / (currentIndex + 1)) * 100}</div>
      {currentQuestion && (
        <div className="quiz-container" id="quiz">
          <div className="quiz-info">
            <h2>{currentQuestion.question}</h2>
            <ul>
              <li>
                <input
                  type="radio"
                  id="a"
                  name="answer"
                  value="a"
                  className="answer"
                  checked={selectedAnswer === "a"}
                  onChange={handleAnswerChange}
                />
                <label htmlFor="a" id="a-text">
                  {currentQuestion.answer_a}
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="b"
                  name="answer"
                  value="b"
                  className="answer"
                  checked={selectedAnswer === "b"}
                  onChange={handleAnswerChange}
                />
                <label htmlFor="b" id="b-text">
                  {currentQuestion.answer_b}
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="c"
                  name="answer"
                  value="c"
                  className="answer"
                  checked={selectedAnswer === "c"}
                  onChange={handleAnswerChange}
                />
                <label htmlFor="c" id="c-text">
                  {currentQuestion.answer_c}
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="d"
                  name="answer"
                  value="d"
                  className="answer"
                  checked={selectedAnswer === "d"}
                  onChange={handleAnswerChange}
                />
                <label htmlFor="d" id="d-text">
                  {currentQuestion.answer_d}
                </label>
              </li>
            </ul>
          </div>
          {currentIndex !== quiz.length-1?<button onClick={handleNextClick}>Next Question</button>:<button type="submit" onSubmit={handleFinalClick}>Final Question</button>}
        </div>
      )}
    </>
  );
}
