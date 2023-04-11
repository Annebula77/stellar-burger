import styles from './burger-ingredients.module.css';
import Tabs from '../tabs/tabs';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import { useState, useRef, forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { setIngredientDetails, clearIngredientDetails } from '../../services/actions/ingredient-action';



const BurgerIngredients = forwardRef((props, ref) => {
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const containerRef = useRef(null);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);
  const [current, setCurrent] = useState('bun');
  const handleScroll = () => {
    if (containerRef.current.getBoundingClientRect().top > bunRef.current.getBoundingClientRect().top) {
      setCurrent('bun');
    }
    if (containerRef.current.getBoundingClientRect().top > sauceRef.current.getBoundingClientRect().top) {
      setCurrent('sauce');
    }
    if (containerRef.current.getBoundingClientRect().top > mainRef.current.getBoundingClientRect().top) {
      setCurrent('main');
    }
  };


  const openModal = (ingredient) => {
    dispatch(setIngredientDetails(ingredient));
    setShowModal(true);
  };
  const closeModal = () => {
    dispatch(clearIngredientDetails());
    setShowModal(false);
  }

  return (
    <section className={styles.section}>
      <h1 className={`text text_type_main-large ${styles.title}`}>Собери бургер</h1>
      <Tabs bunRef={bunRef} sauceRef={sauceRef} mainRef={mainRef} current={current} />
      <section className={styles.container} ref={containerRef} onScroll={handleScroll} >
        <IngredientsCategory title='Булки' type="bun" openModal={openModal} ref={bunRef} />
        <IngredientsCategory title='Соусы' type="sauce" openModal={openModal} ref={sauceRef} />
        <IngredientsCategory title='Начинки' type="main" openModal={openModal} ref={mainRef} />
      </section>
      {showModal && (
        <Modal onClose={closeModal}>
          <IngredientDetails />
        </Modal>
      )}
    </section>
  );
});

export default BurgerIngredients;