import AppHeader from "../app-header/app-header";
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constuctor';
import styles from './app.module.css';
import { useEffect, useState } from 'react';
import { getIngredientsData } from '../../utils/api';


function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [ingredientsData, setIngredientsData] = useState([]);

  useEffect(() => {
    const fetchIngredientsData = async () => {
      setIsLoading(true);
      try {
        const data = await getIngredientsData();
        setIngredientsData(data);
        setHasError(false);
      } catch (e) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIngredientsData();
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