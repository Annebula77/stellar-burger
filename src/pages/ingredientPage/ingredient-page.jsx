
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import Modal from '../../components/modal/modal';
import styles from './ingredient-page.module.css';

export const IngredientPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;

  const closeModal = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      {background ? (
        <Modal onClose={closeModal}>
          <IngredientDetails ingredientId={id} />
        </Modal>
      ) : (
        <IngredientDetails ingredientId={id} extraClass={styles.ingredient} />
      )}
    </div>
  );
};