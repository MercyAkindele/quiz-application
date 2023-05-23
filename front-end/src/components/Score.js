import { useState, useEffect } from "react";
import { getAllScores } from "../api/api";
export default function ScoreBoard() {
  const [scores, setScores] = useState([]);
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
      return () => ac.abort();
    }
    listOfScores();
  }, []);
  return (
    <>
      {scores.map((score) => (
        <ul>
          <li key={score.score_id}>{score.score}</li>
        </ul>
      ))}
    </>
  );
}
