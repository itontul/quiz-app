import React from "react";
import { useGlobalContext } from "../context";
import styles from "./Modal.module.css";

const Modal = () => {
  const { correct, questions, closeModal } = useGlobalContext();
  const percentage = (correct / questions.length) * 100;
  return (
    <>
      <div className={styles.backdrop}></div>
      <div className={styles.modal}>
        <h2>Quiz Finished</h2>
        <p>You answered {percentage}% of questions correctly</p>
        <button onClick={() => closeModal()}>Play again</button>
      </div>
    </>
  );
};

export default Modal;
