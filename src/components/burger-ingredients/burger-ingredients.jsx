import styles from './burger-ingredients.module.css';
import Tabs from '../tabs/tabs';
import Ingredient from '../ingredient/ingredient';
import { ingredientsData } from '../../utils/data';
import { cardProp } from '../../utils/prop-types';


function BurgerIngredients() {
  return (
    <section className={styles.section}>
      <h1 className={`text text_type_main-large ${styles.title}`}>Собери бургер</h1>
      <Tabs />
      <section className={styles.container}>
        <h2 className='text_type_main-medium mt-10'>Булки</h2>
        <ul className={styles.ingredient_box}>
          {ingredientsData.map(props => {
            if (props.type === "bun") {
              return <Ingredient key={props._id} {...props} />
            }
          })}
        </ul>
        <h2 className='text_type_main-medium mt-10'>Соусы</h2>
        <ul className={styles.ingredient_box}>
          {ingredientsData.map(props => {
            if (props.type === "sauce") {
              return <Ingredient key={props._id} {...props} />
            }
          })}
        </ul>
        <h2 className="text text_type_main-medium">Начинки</h2>
        <ul className={styles.ingredient_box}>
          {ingredientsData.map(props => {
            if (props.type === "main") {
              return <Ingredient key={props._id} {...props} />
            }
          })}
        </ul>
      </section>
    </section >
  )
}

BurgerIngredients.propTypes = {
  _id: cardProp,
  type: cardProp
}


export default BurgerIngredients;