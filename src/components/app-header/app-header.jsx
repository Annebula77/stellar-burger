import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';


function AppHeader() {
  const location = useLocation();
  const isLoggedIn = useSelector((store) => store.user.isAuthChecked);
  const { user } = useSelector((state) => state.user);

  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (isLoggedIn && user) {
      setUserName(user.name);
    } else {
      setUserName('Личный кабинет');
    }
  }, [isLoggedIn, user]);

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
          <Link to='/feed' className={styles.link}>
            <button type='button' className={styles.header__cell} >
              <ListIcon type={location.pathname === '/feed' ? 'primary' : 'secondary'} />
              <p className={activeTypology('/feed')}>Лента заказов</p>
            </button>
          </Link>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <Link to='/profile' className={styles.link}>
          <button type='button' className={styles.header__cell}>
            <ProfileIcon type={location.pathname === '/profile' ? 'primary' : 'secondary'} />
            <p className={activeTypology('/profile')}>{userName}</p>
          </button>
        </Link>
      </nav>
    </header>
  )

}


export default AppHeader;