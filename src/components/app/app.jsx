import AppHeader from "../app-header/app-header";
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constuctor';
import styles from './app.module.css';
import { useEffect, useState } from 'react';



const SERVER_URL = 'https://norma.nomoreparties.space/api/ingredients';

const checkResponse = res => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
};

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [ingredientsData, setIngredientsData] = useState([]);

  useEffect(() => {
    const getIngredientsData = async () => {
      setHasError(false);
      setIsLoading(true);
      try {
        const res = await fetch(SERVER_URL);
        const data = await checkResponse(res);
        setIngredientsData(data.data);
      } catch (e) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getIngredientsData();
  }, []);


  return (
    <>
      {isLoading && 'Загрузка...'}
      {hasError && 'Произошла ошибка'}
      {!isLoading && !hasError && ingredientsData.length && (
        <section className={styles.app}>
          <AppHeader />
          <section className={styles.main}>
            <BurgerIngredients ingredientsData={ingredientsData} />
            <BurgerConstructor ingredientsData={ingredientsData} />
          </section>
        </section>
      )}
    </>

  );


}


export default App;