import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';


function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.container}>
        <div className={styles.left_wrapper}>
          <a className={styles.header_cell} href='#'>
            <BurgerIcon type='primary' />
            <p className='text text_type_main-default'>Конструктор</p>
          </a>
          <a className={styles.header_cell} href='#'>
            <ListIcon type='secondary' />
            <p className='text text_type_main-default text_color_inactive'>Лента заказов</p>
          </a>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <a className={styles.header_cell} href='#'>
          <ProfileIcon type='secondary' />
          <p className='text text_type_main-default text_color_inactive'>Личный кабинет</p>
        </a>
      </nav>


    </header>
  )

}


export default AppHeader;