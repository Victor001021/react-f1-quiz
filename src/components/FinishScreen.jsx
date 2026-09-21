function FinishScreen({
  points,
  sumPoints,
  highscore,
  dispatch,
  setDifficulty,
}) {
  const percentage = (points / sumPoints) * 100;

  function handleRestart() {
    setDifficulty("all");
    dispatch({ type: "restart" });
  }
  return (
    <>
      <p className="result">
        Sua pontuação foi {points} de {sumPoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Recorde: {highscore} pontos)</p>
      <button className="btn btn-ui" onClick={handleRestart}>
        Reiniciar Quiz
      </button>
    </>
  );
}

export default FinishScreen;
