import styles from './burger-ingredients.module.css';
import Tabs from '../tabs/tabs';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { useState, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TabItems } from '../../utils/consts';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { setIngredientDetails, clearIngredientDetails } from '../../services/actions/ingredient-action';




const BurgerIngredients = () => {
  const ingredientList = useSelector((state) => state.ingredients);
  const containerRef = useRef(null);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);
  const [current, setCurrent] = useState(TabItems.BUN);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const background = location.state?.background;


  const buns = ingredientList.ingredients.filter((item) => item.type === 'bun');
  const sauce = ingredientList.ingredients.filter((item) => item.type === 'sauce');
  const main = ingredientList.ingredients.filter((item) => item.type === 'main');

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

  const openModal = useCallback((ingredientId) => {
    dispatch(setIngredientDetails());
    navigate(`/ingredients/${ingredientId}`, { state: { modal: true, background: location } });
  }, [navigate, location]);

  const closeModal = useCallback(() => {
    dispatch(clearIngredientDetails());
    navigate('/', { state: { modal: false } });
  }, [navigate, background]);
  return (
    <section className={styles.section}>
      <h2 className={`text text_type_main-large ${styles.title}`}>Собери бургер</h2>
      <Tabs bunRef={bunRef} sauceRef={sauceRef} mainRef={mainRef} current={current} />
      <section className={styles.container} ref={containerRef} onScroll={handleScroll} >
        <IngredientsCategory title='Булки' data={buns} openModal={(ingredientId) => openModal(ingredientId)} ref={bunRef} />
        <IngredientsCategory title='Соусы' data={sauce} openModal={(ingredientId) => openModal(ingredientId)} ref={sauceRef} />
        <IngredientsCategory title='Начинки' data={main} openModal={(ingredientId) => openModal(ingredientId)} ref={mainRef} />
      </section>
      {background && (
        <Modal onClose={closeModal}>
          <IngredientDetails ingredientId={id} />
        </Modal>
      )}

    </section>
  );
};

export default BurgerIngredients;