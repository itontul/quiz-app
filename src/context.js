import axios from "axios";
import { createContext, useContext, useState } from "react";

const AppContext = createContext();

const API_URL = "https://opentdb.com/api.php?";

const table = {
  general_knowledge: 9,
  books: 10,
  films: 11,
  music: 12,
  musicals_theaters: 13,
  television: 14,
  video_games: 15,
  board_games: 16,
  science_nature: 17,
  science_computers: 18,
  science_mathematics: 19,
  mythology: 20,
  sports: 21,
  geography: 22,
  history: 23,
  politics: 24,
  art: 25,
};

const AppProvider = ({ children }) => {
  const [setup, setSetup] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "general_knowledge",
    difficulty: "easy",
  });
  console.log(quiz);

  const fetchQuestions = async (url) => {
    setLoading(true);
    try {
      const resp = await axios(url);
      if (resp) {
        const data = resp.data.results;
        if (data.length > 0) {
          setQuestions(data);
          setLoading(false);
          setSetup(false);
        } else {
          setSetup(true);
          setError(true);
          setLoading(false);
        }
      } else {
        setSetup(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkAnswer = (val) => {
    if (val) {
      setCorrect((old) => old + 1);
    }
    nextQuestion();
  };

  const nextQuestion = () => {
    if (index < questions.length - 1) {
      setIndex((prev) => prev + 1);
    }
    if (index === questions.length - 1) {
      setModal(true);
    }
  };

  const handleChange = (e) => {
    setError(false);
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({ ...quiz, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, difficulty, category } = quiz;
    const URL = `${API_URL}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`;
    fetchQuestions(URL);
  };

  const closeModal = () => {
    setModal(false);
    setSetup(true);
    setIndex(0);
    setCorrect(0);
  };
  return (
    <AppContext.Provider
      value={{
        questions,
        index,
        setIndex,
        error,
        loading,
        setup,
        correct,
        checkAnswer,
        nextQuestion,
        closeModal,
        modal,
        handleChange,
        quiz,
        handleSubmit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
