import { useQueryClient } from "@tanstack/react-query";
import { useQuestions } from "../context/QuestionsContext";
import { useNavigate } from "react-router-dom";

function StartScreen() {
  const { dispatch, questions, numQuestions, difficulty, setDifficulty } =
    useQuestions();

  const navigate = useNavigate();

  function handleDifficulty(e) {
    setDifficulty(e.target.value);
  }

  function handleStart() {
    let questionsList = queryClient.getQueryData(["questions", difficulty]);

    if (!questionsList) {
      questionsList =
        difficulty === "all"
          ? questions
          : questions.filter((q) => q.difficulty === difficulty);
    }

    if (!questionsList.length) return;

    dispatch({ type: "start", payload: questionsList });
    navigate("/quiz");
  }

  const queryClient = useQueryClient();

  return (
    <div className="start">
      <h2>Bem vindo ao quiz da F1!</h2>

      <h3>
        {numQuestions} {numQuestions > 1 ? "questões" : "questão"} para testar o
        seu conhecimento em F1
      </h3>
      <footer>
        <select value={difficulty} onChange={(e) => handleDifficulty(e)}>
          <option value="all">Todas as dificuldades</option>
          <option value="easy">Fácil</option>
          <option value="medium">Médio</option>
          <option value="hard">Difícil</option>
        </select>
        <button className="btn btn-ui" onClick={() => handleStart()}>
          Vamos começar!
        </button>
      </footer>
    </div>
  );
}

export default StartScreen;
