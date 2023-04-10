import styles from './burger-ingredients.module.css';
import Tabs from '../tabs/tabs';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import { useState, useRef, forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';


function filterIngredientsByType(ingredients, type) {
  return ingredients.filter((ingredient) => ingredient.type === type);
}


const BurgerIngredients = forwardRef((props, ref) => {
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const dispatch = useDispatch();

  const buns = filterIngredientsByType(ingredients, 'bun');
  const mains = filterIngredientsByType(ingredients, 'main');
  const sauces = filterIngredientsByType(ingredients, 'sauce');

  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const openModal = (ingredient) => {
    setSelectedIngredient(ingredient);
    dispatch(openModal());
  };
  const closeModal = () => setShowModal(false);

  return (
    <section className={styles.section}>
      <h1 className={`text text_type_main-large ${styles.title}`}>Собери бургер</h1>
      <Tabs bunRef={bunRef} sauceRef={sauceRef} mainRef={mainRef} />
      <section className={styles.container}>
        <IngredientsCategory title='Булки' ingredients={buns} openModal={openModal} ref={bunRef} />
        <IngredientsCategory title='Соусы' ingredients={sauces} openModal={openModal} ref={sauceRef} />
        <IngredientsCategory title='Начинки' ingredients={mains} openModal={openModal} ref={mainRef} />
      </section>
      {showModal && (
        <Modal onClose={closeModal}>
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}
    </section>
  );
});

export default BurgerIngredients;