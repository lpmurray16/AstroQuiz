import { useState, useEffect } from "react";
import questionList from "../config/questions.js";
import "../styles/quiz.css";

// should probably separate some components into their own files

const Quiz = () => {
    const [question, setQuestion] = useState(questionList[0]);
    const [answer, setAnswer] = useState("");
    const [score, setScore] = useState(0);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isLastQuestion, setIsLastQuestion] = useState(false);
    const [isOver, setIsOver] = useState(false);

    useEffect(() => {
        if (questionNumber === questionList.length - 1) {
            setIsLastQuestion(true);
        }
    }, [questionNumber]);

    const handleAnswer = (e) => {
        setAnswer(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (answer === question.correctAnswer) {
            setScore(score + 1);
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
        setIsAnswered(true);
    };

    const handleNextQuestion = () => {
        setQuestion(questionList[questionNumber + 1]);
        setAnswer("");
        setIsAnswered(false);
        setQuestionNumber(questionNumber + 1);

        if (questionNumber === questionList.length - 1) {
            setIsOver(true);
        }
    };

    const handleRestart = () => {
        setQuestion(questionList[0]);
        setAnswer("");
        setScore(0);
        setQuestionNumber(0);
        setIsCorrect(false);
        setIsAnswered(false);
        setIsOver(false);
    };

    return (
        <div className="quiz-container">
            <div className="quiz-question">
                {isOver ? (
                    <div className="quiz-question__over">
                        <h2 className="quiz-question__text">
                            That's All Folks! You scored {score} out of{" "}
                            {questionList.length} questions correctly.
                        </h2>
                        <p>
                            {((score / questionList.length) * 100).toFixed(2)}%
                            of the questions were answered correctly. <br></br>
                            <br></br>
                            {(() => {
                                if (score / questionList.length > 0.75) {
                                    return " You're a Harry Potter nerd!";
                                } else if (score / questionList.length > 0.5) {
                                    return " You can do better. Just saying.";
                                } else if (score / questionList.length > 0.25) {
                                    return " You're terrible, kys.";
                                } else {
                                    return " You need to jump in a lake of lava. Or read more HP books.";
                                }
                            })()}
                        </p>
                        <button className="button" onClick={handleRestart}>
                            Restart
                        </button>
                    </div>
                ) : (
                    <div className="quiz-question__container">
                        <h2 className="quiz-question__text">
                            {questionNumber + 1}) {question.question}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="quiz-question__choices">
                                {question.choices.map((c, index) => (
                                    <label className="label" key={index}>
                                        <input
                                            type="radio"
                                            name="choice"
                                            value={c}
                                            onChange={handleAnswer}
                                            checked={
                                                answer === c ? true : false
                                            }
                                        />
                                        <span className="checkmark"></span>
                                        {c}
                                    </label>
                                ))}
                            </div>
                            <button
                                type="submit"
                                style={{
                                    display: !isAnswered ? "block" : "none",
                                }}
                                className="button"
                            >
                                Submit
                            </button>
                        </form>
                        <div className="quiz-question__next">
                            <button
                                className="button"
                                style={{
                                    display: isAnswered ? "block" : "none",
                                }}
                                onClick={handleNextQuestion}
                            >
                                Next Question &rarr;
                            </button>
                        </div>
                        {isAnswered && (
                            <div className="quiz-question__feedback">
                                {isCorrect ? (
                                    <div className="quiz-question__feedback--correct">
                                        <p>Correct!✅</p>
                                    </div>
                                ) : (
                                    <div className="quiz-question__feedback--incorrect">
                                        <p>Incorrect!❌</p>
                                        <p>
                                            The correct answer was:{" "}
                                            <span
                                                style={{
                                                    fontWeight: "bold",
                                                    fontStyle: "italic",
                                                }}
                                            >
                                                {question.correctAnswer}
                                            </span>
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                        <div className="quiz-question__feedback">
                            <p>
                                You've scored {score} out of{" "}
                                {questionList.length}
                            </p>
                            <div className="progress_bar--container">
                                <label htmlFor="completion_bar">
                                    Progress:{" "}
                                </label>
                                <progress
                                    id="completion_bar"
                                    value={questionNumber}
                                    max={questionList.length}
                                ></progress>
                            </div>

                            <button
                                className="button button--restart"
                                onClick={handleRestart}
                            >
                                Restart Quiz
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Quiz;
