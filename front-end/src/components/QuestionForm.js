import { useState, useEffect } from "react";
import { createQuestion, updateQuestion, readQuestion } from "../api/api";

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

  useEffect(()=>{
    async function readQuestionInfo(){
      if(!question_id){
        return;
      }
      const ac = new AbortController();
      try{
        const questionInformation = await readQuestion(question_id, ac.signal);
        if(questionInformation){
          setFormData(questionInformation)
        }
      }catch(error){
        if(error.name === "AbortError"){
          console.log("Aborted")
          ac.abort();
        }else{
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
  const handleSubmit = (e) => {
    const ac = new AbortController();
    e.preventDefault();
    async function addQuestionToQuiz() {
      try {
        if (formType === "create") {
          await createFunction();
        } else if (formType === "edit") {
          await editFunction();
        }
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    addQuestionToQuiz();
    return () => ac.abort();
  };
  const createFunction = async () => {
    const ac = new AbortController();
    try {
      await createQuestion(formData, ac.signal);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Aborted");
      } else {
        throw error;
      }
    }
    return () => ac.abort();
  };
  const editFunction = async () => {
    const ac = new AbortController();
    try {
      await updateQuestion(formData, ac.signal);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Aborted!");
      } else {
        throw error;
      }
    }
    return ac.abort();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-info">
        <div>
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
        <div>
          <label htmlFor="correct">correct</label>
          <input
            id="correct"
            type="text"
            name="correct"
            required={true}
            value={formData.correct}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="buttons">
        <button type="reset" id="reset">
          Reset
        </button>
        <button type="submit" id="submit">
          Submit
        </button>
      </div>
    </form>
  );
}
