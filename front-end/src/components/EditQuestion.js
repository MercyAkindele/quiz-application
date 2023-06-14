import { useParams } from "react-router-dom";
import QuestionForm from "./QuestionForm";

export default function EditQuestion() {
  const { question_id } = useParams();
  return <QuestionForm question_id={question_id} formType="edit" />;
}
