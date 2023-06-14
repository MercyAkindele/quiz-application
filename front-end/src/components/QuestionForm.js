import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createQuestion, updateQuestion, readQuestion } from "../api/api";
import "../styles/questionForm.css";
export default function QuestionForm({ question_id, formType }) {
  const initialFormState = {
    question: "",
    answer_a: "",
    answer_b: "",
    answer_c: "",
    answer_d: "",
    correct: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const navigate = useNavigate();

  useEffect(() => {
    async function readQuestionInfo() {
      if (!question_id) {
        return;
      }
      const ac = new AbortController();
      try {
        const questionInformation = await readQuestion(question_id, ac.signal);
        if (questionInformation) {
          setFormData(questionInformation.data);
        }
      } catch (error) {
        if (error.name === "AbortError") {
          ac.abort();
        } else {
          throw error;
        }
      }
      return () => ac.abort();
    }
    readQuestionInfo();
  }, [question_id]);

  const handleChange = (e) => {
    let stateValue = e.target.value;
    setFormData({ ...formData, [e.target.name]: stateValue });
  };

  const handleSubmit = async (e) => {
    const ac = new AbortController();
    e.preventDefault();
    try {
      if (formType === "create") {
        await createFunction();
        setFormData(initialFormState);
      } else if (formType === "edit") {
        await editFunction();
        navigate("/questions");
      }
    } catch (error) {
      if (error.name === "AbortError") {
        ac.abort();
      } else {
        throw error;
      }
    }
    return () => ac.abort();
  };

  const createFunction = async () => {
    const ac = new AbortController();
    try {
      await createQuestion(formData, ac.signal);
    } catch (error) {
      if (error.name === "AbortError") {
        ac.abort();
      } else {
        throw error;
      }
    }
  };

  const editFunction = async () => {
    const ac = new AbortController();
    try {
      await updateQuestion(formData, ac.signal);
    } catch (error) {
      if (error.name === "AbortError") {
        ac.abort();
      } else {
        throw error;
      }
    }
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit} id="form">
        <div className="form-info">
          <div className="answer-choice">
            <label htmlFor="form-question">Your Question:</label>
            <textarea
              id="form-question"
              name="question"
              required={true}
              value={formData.question}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="answer-choice">
            <label htmlFor="answer_a">answer a</label>
            <input
              id="answer_a"
              type="text"
              name="answer_a"
              required={true}
              value={formData.answer_a}
              onChange={handleChange}
            />
          </div>
          <div className="answer-choice">
            <label htmlFor="answer_b">answer b</label>
            <input
              id="answer_b"
              type="text"
              name="answer_b"
              required={true}
              value={formData.answer_b}
              onChange={handleChange}
            />
          </div>
          <div className="answer-choice">
            <label htmlFor="answer_c">answer c</label>
            <input
              id="answer_c"
              type="text"
              name="answer_c"
              required={true}
              value={formData.answer_c}
              onChange={handleChange}
            />
          </div>
          <div className="answer-choice">
            <label htmlFor="answer_d">answer d</label>
            <input
              id="answer_d"
              type="text"
              name="answer_d"
              required={true}
              value={formData.answer_d}
              onChange={handleChange}
            />
          </div>
          <div className="answer-choice">
            <label htmlFor="correct">correct</label>
            <input
              id="correct"
              type="text"
              name="correct"
              required={true}
              pattern="^answer_[a-d]$"
              title="Correct field should be in the form of answer_X, where X is a, b, c, or d."
              placeholder="answer_a"
              value={formData.correct}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="buttons">
          <button type="reset" id="reset">
            Reset
          </button>
          <button type="submit" id="submitButt">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
