import { useEffect } from "react";
import { useQuestions } from "../context/QuestionsContext";
import Error from "./Error";
import Loader from "./Loader";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Question from "./Question";
import StartScreen from "./StartScreen";
import Timer from "./Timer";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const { status } = useQuestions();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (status === "finished") {
        navigate("/resultado", { replace: true });
      } else if (status === "ready") {
        navigate("/");
      }
    },
    [status, navigate],
  );

  return (
    <>
      {status === "loading" && <Loader label={"questões"} />}
      {status === "error" && <Error />}
      {status === "ready" && <StartScreen />}
      {status === "active" && (
        <>
          <Progress />
          <Question />

          <footer>
            <Timer />
            <NextButton />
          </footer>
        </>
      )}
    </>
  );
}

export default Quiz;
