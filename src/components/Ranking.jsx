import { useNavigate } from "react-router-dom";
import { useQuestions } from "../context/QuestionsContext";
import { useGetRanking } from "../hooks/useGetRanking";
import Loader from "./Loader";
import { usePlayerPosition } from "../hooks/usePlayerPosition";

function Ranking() {
  const { dispatch, setDifficulty } = useQuestions();
  const navigate = useNavigate();

  function handleRestart() {
    setDifficulty("all");
    dispatch({ type: "restart" });
    navigate("/", { replace: true });
  }

  const { ranking = [], isPending } = useGetRanking();

  const rankingId = localStorage.getItem("rankingId");

  const { data: playerData, isPending: isLoadingPosition } =
    usePlayerPosition(rankingId);

  if (isPending) return <Loader label={"ranking"} />;
  if (isLoadingPosition) return <Loader label={"posição"} />;

  console.log(playerData);

  return (
    <div className="ranking">
      <header className="ranking-header">
        <h2>Ranking</h2>
      </header>

      <section className="ranking-card">
        <div className="ranking-columns">
          <span>Posição</span>
          <span>Jogador</span>
          <span>Pontos</span>
          <span>Dificuldade</span>
        </div>

        <div className="ranking-list">
          {ranking.map((player, index) => (
            <div
              className={`ranking-row position-${index + 1}`}
              key={player.id}
            >
              <div className="ranking-position">
                {index < 3 ? (
                  <span className="trophy">{["🥇", "🥈", "🥉"][index]}</span>
                ) : null}

                {index >= 3 && <strong>{index + 1}</strong>}
              </div>

              <div className="ranking-player">
                <span>{player.playerName}</span>
              </div>

              <strong className="ranking-points">{player.points}</strong>
              <strong className="ranking-difficulty">
                {player.difficulty === "hard" && "Dificil"}
                {player.difficulty === "medium" && "Médio"}
                {player.difficulty === "easy" && "Fácil"}
                {player.difficulty === "all" && "Todas"}
              </strong>
            </div>
          ))}
        </div>
      </section>

      {playerData && (
        <div className="my-ranking">
          <span>Sua posição:</span>
          <strong className="my-position">#{playerData.position}</strong>
          <strong>{playerData.playerName}</strong>
          <strong className="my-points">{playerData.points} pontos</strong>
        </div>
      )}

      <button className="btn btn-ui" onClick={handleRestart}>
        Reiniciar Quiz
      </button>
    </div>
  );
}

export default Ranking;
