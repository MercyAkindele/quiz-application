import { useState, useEffect } from "react";
import { getAllScores, deleteScore } from "../api/api";
import "../styles/score.css";

export default function ScoreBoard() {
  const [scores, setScores] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    async function listOfScores() {
      const ac = new AbortController();
      try {
        let theScores = await getAllScores(ac.signal);
        setScores(theScores);
      } catch (error) {
        if (error.name === "AbortError") {
          ac.abort();
        } else {
          throw error;
        }
      }
    }
    listOfScores();
  }, [reload]);

  const handleDelete = async (scoreId) => {
    const ac = new AbortController();
    const confirmDeleteOfScore = window.confirm(
      "Once the score has been deleted, it cannot be retrieved!"
    );
    if (confirmDeleteOfScore) {
      try {
        await deleteScore(scoreId, ac.signal);
        setReload(!reload);
      } catch (error) {
        if (error.name === "AbortError") {
          ac.abort();
        } else {
          throw error;
        }
      }
    }
  };

  return (
    <div className="scoreBoard">
      <div className="scoresContainer">
        <ul>
          {(scores.scores || []).map((score) => (
            <li key={score.score_id} className="listScores">
              <h3 id="yourScore">Your Score: {score.score} </h3>
              <button
                id="deleteButt"
                onClick={() => handleDelete(score.score_id)}
              >
                delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
