import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';


function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.container}>
        <div className={styles.container__left}>
          <button type='button' className={styles.header__cell} >
            <BurgerIcon type='primary' />
            <p className='text text_type_main-default'>Конструктор</p>
          </button>
          <button type='button' className={styles.header__cell} >
            <ListIcon type='secondary' />
            <p className='text text_type_main-default text_color_inactive'>Лента заказов</p>
          </button>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <button type='button' className={styles.header__cell} >
          <ProfileIcon type='secondary' />
          <p className='text text_type_main-default text_color_inactive'>Личный кабинет</p>
        </button>
      </nav>
    </header>
  )

}


export default AppHeader;