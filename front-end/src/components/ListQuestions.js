import { useEffect, useState } from "react";
import { getAllQuestions } from "../api/api";
import {Link} from "react-router-dom"
export default function ListQuestions() {
  const [questions, setQuestions] = useState([]);
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
  }, []);
  return (
    <>
      <h2>Questions</h2>
      <ul>
        {Array.isArray(questions) && questions.length > 0 ? (
          questions.map((question) => (
            <li key={question.question_id}>
              {/* display everything except for the answer */}
              <div>{question.question}</div>
              <div>{question.answer_a}</div>
              <div>{question.answer_b}</div>
              <div>{question.answer_c}</div>
              <div>{question.answer_d}</div>
              <button><Link to={`/questions/${question.question_id}/edit`}>Edit</Link></button>
              <button>Delete</button>
            </li>

          ))
        ) : (
          <li>No questions found.</li>
        )}
      </ul>
    </>
  );
}
