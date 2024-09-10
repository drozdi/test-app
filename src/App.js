import { Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import { TodosPage } from './pages/TodosPage.js';



function App({endpoint = ''}) {
  return (<div className={styles.app}>
    <div className={styles.container}>
      <Routes>
        <Route path="/" element={<TodosPage />} />
      </Routes>
    </div>
  </div>)
}

export default App;
