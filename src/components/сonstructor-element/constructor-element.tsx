import styles from './constructor-element.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { useRef, FC } from 'react';
import { moveIngredientInContainer, deleteIngredientFromConstructor } from '../../services/slices/burger-constructor-slice';
import { IIngredient, DragItemHover } from '../../utils/essentials';

type ConstructorElProps = {
  index: number,
  item: IIngredient,
}


const ConstructorEl: FC<ConstructorElProps> = ({ index, item }) => {
  const dispatch = useDispatch();
  const { image, _id, price, name } = item;
  const ref = useRef(null);

  const handleDelete = (index: number) => {
    dispatch(deleteIngredientFromConstructor(index));
  }
  const [, drop] = useDrop({
    accept: 'item',
    hover(item: DragItemHover) {
      if (!ref.current) {
        return;
      }
      const dragElIndex = item.index;
      const hoverElIndex = index;
      dispatch(moveIngredientInContainer({ dragElIndex, hoverElIndex }));
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
      <DragIcon type='primary' />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() => handleDelete(index)}
      />
    </div>
  );
};

export default ConstructorEl;






