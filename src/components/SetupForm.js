import React from "react";
import { useGlobalContext } from "../context";
import styles from "./SetupForm.module.css";

const SetupForm = () => {
  const { error, handleChange, handleSubmit, quiz } = useGlobalContext();
  return (
    <form className={styles["setup-form"]} onSubmit={handleSubmit}>
      <h1>Setup Quiz</h1>
      {error && (
        <p className={styles.error}>
          There was an error. Please choose other options.
        </p>
      )}
      <div className={styles["form-control"]}>
        <label htmlFor="amount">Number of Questions</label>
        <input
          type="number"
          min="1"
          max="50"
          name="amount"
          value={quiz.amount}
          required
          id="amount"
          onChange={handleChange}
        />
      </div>
      <div className={styles["form-control"]}>
        <label htmlFor="category"> Category</label>
        <select
          id="category"
          name="category"
          value={quiz.category}
          required
          onChange={handleChange}
        >
          <option value="general_knowledge">General Knowledge</option>
          <option value="books">Books</option>
          <option value="films">Films</option>
          <option value="music">Music</option>
          <option value="musicals_theaters">Musicals & Theaters</option>
          <option value="television">Television</option>
          <option value="video_games">Video Games</option>
          <option value="board_games">Board Games</option>
          <option value="science_nature">Science & Nature</option>
          <option value="science_computers">Science & Computers</option>
          <option value="science_mathematics">Science& Mathematics</option>
          <option value="mythology">Mythology</option>
          <option value="sports">Sports</option>
          <option value="geography">Geography</option>
          <option value="history">History</option>
          <option value="politics">Politics</option>
          <option value="art">Art</option>
        </select>
      </div>
      <div className={styles["form-control"]}>
        <label htmlFor="difficulty"> Difficulty</label>
        <select
          id="difficulty"
          name="difficulty"
          value={quiz.difficulty}
          required
          onChange={handleChange}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <button type="submit">Start</button>
    </form>
  );
};

export default SetupForm;
