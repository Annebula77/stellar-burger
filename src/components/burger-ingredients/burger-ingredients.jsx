import styles from './burger-ingredients.module.css';
import Tabs from '../tabs/tabs';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import { useState, useRef, forwardRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIngredientDetails } from '../../services/actions/ingredient-action';
import { TabItems } from '../../utils/consts';
import { useLocation, useNavigate } from 'react-router-dom';



const BurgerIngredients = ({ closeModal }) => {
  const ingredientList = useSelector((state) => state.ingredients);
  const dispatch = useDispatch();

  const containerRef = useRef(null);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);
  const [current, setCurrent] = useState(TabItems.BUN);
  const navigate = useNavigate();
  const location = useLocation();



  const buns = useMemo(
    () =>
      ingredientList.ingredients.filter((item) => {
        return item.type === "bun"
      }),
    [ingredientList]
  );

  const sauce = useMemo(
    () =>
      ingredientList.ingredients.filter((item) => {
        return item.type === "sauce"
      }),
    [ingredientList]
  );

  const main = useMemo(
    () =>
      ingredientList.ingredients.filter((item) => {
        return item.type === "main"
      }),
    [ingredientList]
  );

  const handleScroll = () => {
    if (containerRef.current.getBoundingClientRect().top > bunRef.current.getBoundingClientRect().top) {
      setCurrent(TabItems.BUN);
    }
    if (containerRef.current.getBoundingClientRect().top > sauceRef.current.getBoundingClientRect().top) {
      setCurrent(TabItems.SAUCE);
    }
    if (containerRef.current.getBoundingClientRect().top > mainRef.current.getBoundingClientRect().top) {
      setCurrent(TabItems.MAIN);
    }
  };

  const openModal = (ingredientId, ingredient) => {
    const modalLocation = `/ingredients/${ingredientId}`;
    const currentLocation = location.pathname;

    navigate(modalLocation, {
      state: { modal: true, background: currentLocation }
    });

    // Обновление URL без перезагрузки страницы
    window.history.replaceState(null, '', modalLocation);
    window.addEventListener('popstate', closeModal);

    dispatch(setIngredientDetails(ingredient));
  };

  return (
    <section className={styles.section}>
      <h1 className={`text text_type_main-large ${styles.title}`}>Собери бургер</h1>
      <Tabs bunRef={bunRef} sauceRef={sauceRef} mainRef={mainRef} current={current} />
      <section className={styles.container} ref={containerRef} onScroll={handleScroll} >
        <IngredientsCategory title='Булки' data={buns} openModal={(ingredient) => openModal(ingredient._id, ingredient)} ref={bunRef} />
        <IngredientsCategory title='Соусы' data={sauce} openModal={(ingredient) => openModal(ingredient._id, ingredient)} ref={sauceRef} />
        <IngredientsCategory title='Начинки' data={main} openModal={(ingredient) => openModal(ingredient._id, ingredient)} ref={mainRef} />
      </section>
    </section>
  );
};

export default BurgerIngredients;