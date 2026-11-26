import { useNavigate } from "react-router-dom";
import { useQuestions } from "../context/QuestionsContext";
import { useState } from "react";
import { useRanking } from "../hooks/useRanking";

function FinishScreen() {
  const {
    points,
    sumMaxPoints,
    highscore,
    dispatch,
    difficulty,
    setDifficulty,
  } = useQuestions();
  const percentage = (points / sumMaxPoints) * 100;
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState();
  const [isSaved, setIsSaved] = useState(false);
  const { setPlayerRanking, isPending } = useRanking();

  function handleRestart() {
    setDifficulty("all");
    dispatch({ type: "restart" });
    navigate("/", { replace: true });
  }

  function handleSubmitRanking(e) {
    e.preventDefault();

    const data = { playerName, points, difficulty };

    setPlayerRanking(data, {
      onSuccess: () => {
        setIsSaved(true);
        navigate("/ranking");
      },
    });
  }

  return (
    <>
      <div className="result">
        <p>
          {percentage
            ? `Sua pontuação foi ${points} de ${sumMaxPoints} (${Math.ceil(percentage)})%`
            : `Sua pontuação foi ${points}`}
        </p>
        <p className="highscore">(Recorde: {highscore} pontos)</p>
      </div>

      <form className="save-score-form" onSubmit={handleSubmitRanking}>
        <input
          type="text"
          className="player-input"
          placeholder="Digite seu nome..."
          maxLength={20}
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          disabled={isSaved}
        />
        <button type="submit" className="btn btn-save" disabled={isSaved}>
          {isSaved ? "Salvo ✓" : "Salvar no Ranking"}
        </button>
      </form>

      <footer>
        <button
          className="btn btn-ui"
          onClick={() => navigate("/ranking")}
          disabled={isPending}
        >
          Ranking
        </button>
        <button
          className="btn btn-ui"
          onClick={handleRestart}
          disabled={isPending}
        >
          Reiniciar Quiz
        </button>
      </footer>
    </>
  );
}

export default FinishScreen;
