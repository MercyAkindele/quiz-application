import { Routes, Route } from "react-router-dom";
import LetsTakeAQuiz from "../components/LetsTakeAQuiz";
import ListQuestions from "../components/ListQuestions";
import CreateQuestion from "../components/CreateQuestion";
import EditQuestion from "../components/EditQuestion";
import Quiz from "../components/Quiz";
import ScoreBoard from "../components/Score";
import NoMatch from "../components/NoMatch";

export default function RouteLayout() {
  return (
    <Routes>
      <Route path="/" element={<LetsTakeAQuiz />} />
      <Route path="/questions" element={<ListQuestions />} />
      <Route path="/questions/new" element={<CreateQuestion />} />
      <Route path="/questions/:question_id/edit" element={<EditQuestion />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/scores" element={<ScoreBoard />} />
      <Route path="*" element={<NoMatch/>}/>
    </Routes>
  );
}
