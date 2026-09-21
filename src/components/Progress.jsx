function Progress({ index, numQuestions, points, sumPoints, answer }) {
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Questão{" "}
        <strong>
          {index + 1}/{numQuestions}
        </strong>
      </p>
      <p>
        Pontos:{" "}
        <strong>
          {points}/{sumPoints}
        </strong>
      </p>
    </header>
  );
}

export default Progress;
