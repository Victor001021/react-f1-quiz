function NextButton({ dispatch, answer, numQuestions, index }) {
  const isLastQuestion = index + 1 === numQuestions;
  if (answer === null) return null;

  return (
    <button
      className="btn btn-ui"
      onClick={() =>
        isLastQuestion
          ? dispatch({ type: "finish" })
          : dispatch({ type: "nextQuestion" })
      }
    >
      {isLastQuestion ? "Finalizar" : "Próximo"}
    </button>
  );
}

export default NextButton;
