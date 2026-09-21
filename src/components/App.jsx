import { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./main";
import Loader from "./Loader";
import Error from "./Error";

import { useReducer } from "react";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";

const initialState = {
  questions: [],
  allQuestions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
  streak: 0,
  sumMaxPoints: 0,
};

const SECS_PER_QUESTION = 20;

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        allQuestions: action.payload,
        status: "ready",
      };

    case "dataFailed":
      return { ...state, status: "error" };

    case "start":
      return {
        ...state,
        status: "active",
        questions: action.payload,
        secondsRemaining: action.payload.length * SECS_PER_QUESTION,
      };

    case "newAnswer": {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        streak:
          action.payload === question.correctOption ? state.streak + 1 : 0,

        points:
          action.payload === question.correctOption
            ? state.streak >= 3
              ? state.points + question.points + 10
              : state.points + question.points
            : state.points,
        sumMaxPoints:
          state.streak >= 3
            ? state.sumMaxPoints + (question.points + 10)
            : state.sumMaxPoints + question.points,
      };
    }
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case "restart":
      return {
        ...initialState,
        highscore: state.highscore,
        questions: state.allQuestions,
        allQuestions: state.allQuestions,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining <= 1 ? "finished" : state.status,
      };
    default:
      throw new Error("Action Unknown");
  }
}

export default function App() {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highscore,
      secondsRemaining,
      sumMaxPoints,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const [difficulty, setDifficulty] = useState("all");

  let questionsList;
  questionsList =
    difficulty === "all"
      ? questions.slice()
      : questions.slice().filter((q) => q.difficulty === difficulty);
  const numQuestions = questionsList.length;
  // const sumPoints = questionsList.reduce((prev, cur) => prev + cur.points, 0);

  console.log(questionsList);

  useEffect(function () {
    fetch(`${import.meta.env.BASE_URL}questions-f1.json`)
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: "dataReceived",
          payload: data.questions,
        }),
      )
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numQuestions={numQuestions}
            dispatch={dispatch}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            questionsList={questionsList}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              points={points}
              sumPoints={sumMaxPoints}
              numQuestions={numQuestions}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />

            <footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                index={index}
              />
            </footer>
          </>
        )}

        {status === "finished" && (
          <FinishScreen
            points={points}
            sumPoints={sumMaxPoints}
            highscore={highscore}
            dispatch={dispatch}
            setDifficulty={setDifficulty}
          />
        )}
      </Main>
    </div>
  );
}
