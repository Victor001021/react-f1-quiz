import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

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

const QuestionsContext = createContext();

function QuestionProvider({ children }) {
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

  const [difficulty, setDifficulty] = useState("all");

  let questionsList;
  questionsList =
    difficulty === "all"
      ? questions.slice()
      : questions.slice().filter((q) => q.difficulty === difficulty);
  const numQuestions = questionsList.length;

  return (
    <QuestionsContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        sumMaxPoints,
        dispatch,
        numQuestions,
        difficulty,
        setDifficulty,
        questionsList,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
}

function useQuestions() {
  const context = useContext(QuestionsContext);
  if (context === undefined) throw new Error("Context used in wrong place");
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { QuestionProvider, useQuestions };
