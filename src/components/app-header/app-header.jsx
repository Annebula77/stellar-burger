import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { useLocation, Link } from 'react-router-dom';





function AppHeader() {
  const location = useLocation();

  const activeTypology = (path) => {
    return location.pathname === path
      ? 'text text_type_main-default'
      : 'text text_type_main-default text_color_inactive';
  };

  return (
    <header className={styles.header}>
      <nav className={styles.container}>
        <div className={styles.container__left}>
          <Link to='/' className={styles.link}>
            <button type='button' className={styles.header__cell}>
              <BurgerIcon type={location.pathname === '/' ? 'primary' : 'secondary'} />
              <p className={activeTypology('/')}>Конструктор</p>
            </button>
          </Link>
          <button type='button' className={styles.header__cell} >
            <ListIcon type='secondary' />
            <p className='text text_type_main-default text_color_inactive'>Лента заказов</p>
          </button>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <Link to='/profile' className={styles.link}>
          <button type='button' className={styles.header__cell}>
            <ProfileIcon type={location.pathname === '/profile' ? 'primary' : 'secondary'} />
            <p className={activeTypology('/profile')}>Личный кабинет</p>
          </button>
        </Link>
      </nav>
    </header>
  )

}


export default AppHeader;