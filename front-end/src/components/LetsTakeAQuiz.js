import "../styles/instructions.css";
export default function LetsTakeAQuiz() {
  return (
    <>
      <h1 className="theTitle">Let's Take A Quiz</h1>
      <div className="instructionsCon">
        <div className="instructions">
          <ul>
            <li>
              First Navigate to the create question page, to create questions to
              answer
            </li>
            <li>
              After submitting as many questions and answers as you like, you
              can check the question list to see if all of your questions are
              posted
            </li>
            <li>
              If you would like to edit or delete a question, you may do so in
              the question list
            </li>
            <li>
              Then you may proceed to take the quiz and see how much you
              remember
            </li>
            <li>
              If you have not created a quiz, you will get a dummy quiz to
              complete if you navigate to take a quiz
            </li>
            <li>Enjoy!</li>
          </ul>
        </div>
      </div>
    </>
  );
}
