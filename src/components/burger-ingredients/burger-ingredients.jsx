import styles from './burger-ingredients.module.css';
import Tabs from '../tabs/tabs';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import { useState, useRef, forwardRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { setIngredientDetails, clearIngredientDetails } from '../../services/actions/ingredient-action';
import { TabItems } from '../../utils/consts';
import { useLocation, useNavigate, useParams } from 'react-router-dom';



const BurgerIngredients = forwardRef((props, ref) => {
  const ingredientList = useSelector((state) => state.ingredients);
  const dispatch = useDispatch();

  const containerRef = useRef(null);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);
  const [current, setCurrent] = useState(TabItems.BUN);
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const modal = params.id && location.state && location.state.modal;
  const [showModal, setShowModal] = useState(modal || false);

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


  const openModal = (ingredient) => {
    dispatch(setIngredientDetails(ingredient));
    setShowModal(true);
  };
  const closeModal = () => {
    dispatch(clearIngredientDetails());
    setShowModal(false);
    navigate(`/`);
  }

  return (
    <section className={styles.section}>
      <h1 className={`text text_type_main-large ${styles.title}`}>Собери бургер</h1>
      <Tabs bunRef={bunRef} sauceRef={sauceRef} mainRef={mainRef} current={current} />
      <section className={styles.container} ref={containerRef} onScroll={handleScroll} >
        <IngredientsCategory title='Булки' data={buns} openModal={openModal} ref={bunRef} />
        <IngredientsCategory title='Соусы' data={sauce} openModal={openModal} ref={sauceRef} />
        <IngredientsCategory title='Начинки' data={main} openModal={openModal} ref={mainRef} />
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