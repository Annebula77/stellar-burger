import styles from './constructor-element.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientType } from '../../utils/prop-types';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import { moveIngredientInContainer, deleteIngredientFromConstructor } from '../../services/actions/burger-constructor-action';
import PropTypes from 'prop-types';

const ConstructorEl = ({ index, item }) => {
  const dispatch = useDispatch();
  const { image, _id, price, name } = item;
  const ref = useRef(null);

  const handleDelete = (index, item) => {
    dispatch(deleteIngredientFromConstructor(item, index));
  }
  const [, drop] = useDrop({
    accept: 'item',
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragElIndex = item.index;
      const hoverElIndex = index;
      dispatch(moveIngredientInContainer(dragElIndex, hoverElIndex));
      item.index = hoverElIndex;
    },


  });

  const [{ opacity }, drag] = useDrag({
    type: 'item',
    item: { _id, index },
    collect: (monitor) => {
      return {
        opacity: monitor.isDragging() ? 0.8 : 1,
      };
    },
  });

  drag(drop(ref));

  return (
    <div
      className={`${styles.filling}`}
      style={{ opacity }}
      ref={ref}
    >
      <DragIcon type='primary' className={styles.dragButton} />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() => handleDelete(index, item)}
      />
    </div>
  );
};

ConstructorEl.propTypes = {
  item: ingredientType,
  index: PropTypes.number.isRequired,

};
export default ConstructorEl;






