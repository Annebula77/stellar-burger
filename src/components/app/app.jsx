import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import styles from './app.module.css'

function App() {
  return (
    <section className={styles.app}>
      <AppHeader />
      <Main />
    </section>
  );
}

export default App;