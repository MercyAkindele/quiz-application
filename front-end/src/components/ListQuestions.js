import { useEffect, useState } from "react";
import { getAllQuestions, deleteQuestion } from "../api/api";
import { Link } from "react-router-dom";
import "../styles/listQuestions.css"
export default function ListQuestions() {
  const [questions, setQuestions] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    const ac = new AbortController();
    async function listOfQuestions() {
      try {
        const data = await getAllQuestions(ac.signal);
        setQuestions(data.questions);
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
  }, [reload]);

  const handleDelete = async (questionId) => {
    const ac = new AbortController();
    const confirmDelete = window.confirm(
      "Once this question has been deleted, you cannot retrieve it again."
    );
    if (confirmDelete) {
      try {
        await deleteQuestion(questionId, ac.signal);
        setReload(!reload)
      } catch (error) {
        if (error.name === "AbortError") {
          return ac.abort();
        } else {
          throw error;
        }
      }
      
    }
  };

  return (
    <>
      <h2>Questions</h2>
      <div className="theList">
        <div className="questionList-container">
          <ul>
            {Array.isArray(questions) && questions.length > 0 ? (
              questions.map((question) => (
                <li key={question.question_id}>
                  {/* display everything except for the answer */}
                  <div className="theQuestion">{question.question}</div>
                  <div className="answers">{question.answer_a}</div>
                  <div className="answers">{question.answer_b}</div>
                  <div className="answers">{question.answer_c}</div>
                  <div className="answers">{question.answer_d}</div>
                  <div className="buttonCon">
                  <button className="editButt">
                    <Link to={`/questions/${question.question_id}/edit`} className="theLink">
                      Edit
                    </Link>
                  </button>
                  <button onClick={() => handleDelete(question.question_id)} className="deleteButton">
                    Delete
                  </button>
                  </div>
                </li>
              ))
            ) : (
              <li>No questions found.</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
