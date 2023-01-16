import React from "react";
import { useGlobalContext } from "../context";
import styles from "./Questions.module.css";

const Questions = () => {
  const { questions, index, checkAnswer, correct, nextQuestion } =
    useGlobalContext();

  const currentQuestion = questions[index];
  const { incorrect_answers, question, correct_answer } = currentQuestion;
  let answers = [...incorrect_answers];
  let tempIndex = Math.floor(Math.random() * 4);
  if (tempIndex === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[tempIndex]);
    answers[tempIndex] = correct_answer;
  }
  return (
    <div>
      <p className={styles.score}>
        Correct Answer: {correct}/{index}
      </p>
      <h2 dangerouslySetInnerHTML={{ __html: question }} />
      <div className={styles["btn-container"]}>
        {answers.map((answer, ind) => {
          return (
            <button
              key={ind}
              dangerouslySetInnerHTML={{ __html: answer }}
              onClick={() => checkAnswer(correct_answer === answer)}
            />
          );
        })}
      </div>
      <button className={styles["next-btn"]} onClick={() => nextQuestion()}>
        Next Question
      </button>
    </div>
  );
};

export default Questions;
