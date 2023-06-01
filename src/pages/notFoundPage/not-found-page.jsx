import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './not-found-page.module.css';
import { Link } from 'react-router-dom';


const NotFoundPage = () => {
  return (
    <section className={styles.container}>
      <h1 className={`${styles.title} text text_type_main-medium`}>4O4</h1>
      <p className='text text_type_main-default text_color_active mb-4'>Ooops! Как вас сюда занесло?...</p>
      <p className='text text_type_main-default text_color_active mb-4'>Пожалуй, лучше вернуться на орбитальную станцию!</p>
      <div className={styles.image}></div>
      <div>
        <Link to='/'>
          <Button htmlType='button' type='primary' size='large' extraClass='mt-6'>
            Вернуться на главную
          </Button>
        </Link>
      </div>

    </section>
  )
}


export { NotFoundPage };