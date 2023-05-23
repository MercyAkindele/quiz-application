import { useEffect, useState } from "react";
import { getAllQuestions } from "../api/api";
export default function ListQuestions() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    async function listOfQuestions() {
      const ac = new AbortController();
      try {
        const data = await getAllQuestions(ac.signal);
        setQuestions(data);
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
  return (
    <>
      <h2>Questions</h2>
      <ul>
        {questions.map((question) => (
          <li key={question.question_id}>
            {/* display everything except for the answer*/}
            <div>{question.question}</div>
            <div>{question.answer_a}</div>
            <div>{question.answer_b}</div>
            <div>{question.answer_c}</div>
            <div>{question.answer_d}</div>
          </li>
        ))}
      </ul>
    </>
  );
}
