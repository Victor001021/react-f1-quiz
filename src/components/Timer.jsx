import { useEffect } from "react";
import { useQuestions } from "../context/QuestionsContext";

function Timer() {
  const { dispatch, secondsRemaining } = useQuestions();

  const safeSeconds = Math.max(0, Number(secondsRemaining) || 0);
  const mins = Math.floor(safeSeconds / 60);
  const secs = safeSeconds % 60;

  const formattedMins = String(mins).padStart(2, "0");
  const formattedSecs = String(secs).padStart(2, "0");

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
    <div translate="no" className={`timer ${safeSeconds <= 60 ? "red" : ""}`}>
      {formattedMins}:{formattedSecs}
    </div>
  );
}

export default Timer;
