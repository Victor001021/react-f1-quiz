import Header from "./Header";
import Main from "./main";
import Loader from "./Loader";
import Error from "./Error";

import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import { QuestionProvider, useQuestions } from "../context/QuestionsContext";

function Quiz() {
  const { status } = useQuestions();

  return (
    <Main>
      {status === "loading" && <Loader />}
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

      {status === "finished" && <FinishScreen />}
    </Main>
  );
}

export default function App() {
  return (
    <div className="app">
      <Header />
      <QuestionProvider>
        <Quiz />
      </QuestionProvider>
    </div>
  );
}
