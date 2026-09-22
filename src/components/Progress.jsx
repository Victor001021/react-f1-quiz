import { useQuestions } from "../context/QuestionsContext";

function Progress() {
  const { index, points, sumMaxPoints, answer, numQuestions } = useQuestions();
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Questão{" "}
        <strong>
          {index + 1}/{numQuestions}
        </strong>
      </p>
      <p>
        Pontos:{" "}
        <strong>
          {points}/{sumMaxPoints}
        </strong>
      </p>
    </header>
  );
}

export default Progress;
