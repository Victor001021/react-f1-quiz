import { useEffect } from "react";
import { useQuestions } from "../context/QuestionsContext";

function Timer() {
  const { dispatch, secondsRemaining } = useQuestions();
  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;

  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch],
  );

  return (
    <div className={`timer ${secondsRemaining <= 60 ? "red" : ""}`}>
      {mins < 10 && "0"}
      {mins}:{secs < 10 && "0"}
      {secs}
    </div>
  );
}

export default Timer;
