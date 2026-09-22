import { useQuestions } from "../context/QuestionsContext";

function FinishScreen() {
  const { points, sumMaxPoints, highscore, dispatch, setDifficulty } =
    useQuestions();
  const percentage = (points / sumMaxPoints) * 100;

  function handleRestart() {
    setDifficulty("all");
    dispatch({ type: "restart" });
  }
  return (
    <>
      <p className="result">
        Sua pontuação foi {points} de {sumMaxPoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Recorde: {highscore} pontos)</p>
      <button className="btn btn-ui" onClick={handleRestart}>
        Reiniciar Quiz
      </button>
    </>
  );
}

export default FinishScreen;
