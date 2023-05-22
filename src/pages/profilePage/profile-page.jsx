import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile-page.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { NotFoundPage } from '../notFoundPage/not-found-page';
import { CustomNavLink } from '../../utils/hoc';
import { isAuthChecked, logoutApi } from '../../services/actions/user-actions';
import Loader from '../../components/loader/loader';
import { updateUserDetails } from '../../services/actions/user-actions';
import { getUserDetails } from '../../services/actions/user-actions';
import { useParams } from 'react-router-dom';




const ProfilePage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((state) => state.user);

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',

  });
  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormValues({
        name: user.name || '',
        email: user.email || '',
        password: '',
      });
    }
  }, [user]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserDetails(formValues.name, formValues.email, formValues.password));
  };

  let { '*': subpath } = useParams();

  const onLogout = () => {
    dispatch(logoutApi());
    dispatch(isAuthChecked(false));
  };

  if (isLoading) {
    return <Loader />;
  }


  return (
    <section className={styles.container}>
      <nav className={styles.menu}>
        <ul className={styles.menu__box}>
          <li className={styles.menu__item}>
            <CustomNavLink
              to='/profile'
              activeClass={styles.active}
            >
              Профиль
            </CustomNavLink>
          </li>
          <li className={styles.menu__item}>
            <CustomNavLink
              to='/profile/orders'
              activeClass={styles.active}
            >
              История заказов
            </CustomNavLink>
          </li>
          <li className={styles.menu__item}>
            <CustomNavLink
              to='/login'
              activeClass={styles.active}
              onClick={onLogout}
            >
              Выход
            </CustomNavLink>
          </li>
        </ul>
        <p
          className={`${styles.text} text_type_main-default text_color_inactive text`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      {subpath === 'orders'
        ? <NotFoundPage />
        : (
          <form className={styles.profile} onSubmit={onSubmit}>
            <div className={styles.input}>
              <Input
                type={'text'}
                value={formValues.name || ''}
                onChange={(e) => {
                  const { value } = e.target;
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    name: value,
                  }));
                }}
                placeholder={'Имя'}
                name={'name'}
                size={'default'}
              />
            </div>
            <div className={styles.input}>
              <EmailInput
                onChange={(e) => {
                  const { value } = e.target;
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    email: value.trim() !== '' ? value : '',
                  }));
                }}
                value={formValues.email || ''}
                name={'email'}
                isIcon={false}
              />
            </div>
            <div className={styles.input}>
              <PasswordInput
                onChange={(e) => {
                  const { value } = e.target;
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    password: value,
                  }));
                }}
                value={formValues.password}
                name={'password'}
                extraClass='mb-2'
              />
            </div>

            <Button htmlType='submit' type='primary' size='large' extraClass='mt-3'>
              Сохранить
            </Button>
          </form>
        )
      }
    </section >
  );
};

export default ProfilePage;