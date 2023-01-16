import { useGlobalContext } from "./context";
import styles from "./App.module.css";
import SetupForm from "./components/SetupForm";
import Questions from "./components/Questions";
import Loading from "./components/Loading";
import Modal from "./components/Modal";

function App() {
  const { setup, loading, modal } = useGlobalContext();

  return (
    <div className={styles.app}>
      {setup && <SetupForm />}
      {loading && <Loading />}
      {modal && <Modal />}
      {!setup && !loading && <Questions />}
    </div>
  );
}

export default App;
