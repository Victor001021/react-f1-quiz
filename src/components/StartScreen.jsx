function StartScreen({
  numQuestions,
  dispatch,
  difficulty,
  setDifficulty,
  questionsList,
}) {
  function handleDifficulty(e) {
    setDifficulty(e.target.value);
    console.log(questionsList);
  }

  return (
    <div className="start">
      <h2>Bem vindo ao quiz da F1!</h2>

      <h3>{numQuestions} questões para testar o seu conhecimento em F1</h3>
      <footer>
        <select value={difficulty} onChange={(e) => handleDifficulty(e)}>
          <option value="all">Todas</option>
          <option value="easy">Fácil</option>
          <option value="medium">Médio</option>
          <option value="hard">Difícil</option>
        </select>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "start", payload: questionsList })}
        >
          Vamos começar!
        </button>
      </footer>
    </div>
  );
}

export default StartScreen;
