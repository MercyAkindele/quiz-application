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
        console.log("this is theScores", theScores)
        console.log("this is the scores to add to the list", scores)
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

  console.log("this is scores before the return statement", scores)

  return (
    <>
      <ul>
        {(scores.scores || []).map((score) => (
          <li key={score.score_id}>{score.score}</li>
        ))}
      </ul>
    </>
  );
}
