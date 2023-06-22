import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { useLocation, Link } from 'react-router-dom';
import { useAppSelector } from '../../utils/hooks';
import { useEffect, useState } from 'react';


function AppHeader() {
  const location = useLocation();
  const isLoggedIn = useAppSelector((store) => store.user.user !== null);
  const { user } = useAppSelector((state) => state.user);


  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (isLoggedIn && user) {
      setUserName(user.name);
    } else {
      setUserName('Личный кабинет');
    }
  }, [isLoggedIn, user]);

  const activeTypology = (path) => {
    return location.pathname.startsWith(path) ? 'text text_type_main-default' : 'text text_type_main-default text_color_inactive';
  };

  return (
    <header className={styles.header}>
      <nav className={styles.container}>
        <div className={styles.container__left}>
          <Link to="/" className={styles.link}>
            <button type="button" className={styles.header__cell}>
              <BurgerIcon type={location.pathname.length === 1 ? 'primary' : 'secondary'} />
              <p className={location.pathname.length === 1 ? activeTypology('/') : activeTypology('/*')}>Конструктор</p>
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
        <Link to="/profile/orders" className={styles.link}>
          <button type="button" className={styles.header__cell}>
            <ProfileIcon type={location.pathname.startsWith("/profile") ? "primary" : "secondary"} />
            <p className={location.pathname.startsWith("/profile") ? activeTypology('/profile') : activeTypology('/profile/orders')}>{userName}</p>
          </button>
        </Link>
      </nav>
    </header>
  )

}


export default AppHeader;