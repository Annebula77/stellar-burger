import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './profile-page.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { NotFoundPage } from "../notFoundPage/not-found-page";
import { CustomNavLink } from "../../utils/hoc";
import { isAuthChecked, getUserDetails, logoutApi } from "../../services/actions/user-actions";
import Loader from "../../components/loader/loader";
import { updateUserDetails } from '../../services/actions/user-actions';




const ProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((state) => state.user);
  const isAuthenticated = useSelector((store) => store.user.isAuthChecked);
  console.log("isAuthenticated: ", isAuthenticated);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',

  });
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserDetails());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (user && !isLoading) {
      setFormValues({
        name: user.user.name,
        email: user.user.email,
      });
    }
  }, [user, isLoading]);
  console.log(user)

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserDetails(formValues.name, formValues.email, formValues.password));
  }



  const onLogout = () => {
    dispatch(logoutApi());
    console.log('Logout action dispatched');
    dispatch(isAuthChecked(false));
  };

  if (isLoading) {
    return <Loader />;
  }

  console.log(formValues)

  return (
    <section className={styles.container}>
      <nav className={styles.menu}>
        <ul className={styles.menu__box}>
          <li className={styles.menu__item}>
            <CustomNavLink
              to="/profile"
              activeClass={styles.active}
            >
              Профиль
            </CustomNavLink>
          </li>
          <li className={styles.menu__item}>
            <CustomNavLink
              to="/profile/orders"
              activeClass={styles.active}
            >
              История заказов
            </CustomNavLink>
          </li>
          <li className={styles.menu__item}>
            <CustomNavLink
              to="/login"
              activeClass={styles.active}
              onClick={() => {
                if (isAuthenticated) {
                  onLogout();
                } else {
                  navigate("/login", { replace: true });
                }
              }}
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
      <form className={styles.profile} onSubmit={onSubmit}>
        <div className={styles.input}>
          <Input
            type={"text"}
            value={formValues.name}
            onChange={(e) => {
              const { value } = e.target;
              setFormValues((prevValues) => ({
                ...prevValues,
                name: value,
              }));
            }}
            placeholder={"Имя"}
            name={"name"}
            size={"default"}
          />
        </div>
        <div className={styles.input}>
          <EmailInput
            onChange={(e) => {
              const { value } = e.target;
              setFormValues((prevValues) => ({
                ...prevValues,
                email: value.trim() !== "" ? value : ''
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
            extraClass="mb-2"
          />
        </div>

        <Button htmlType="submit" type="primary" size="large" extraClass="mt-3">
          Сохранить
        </Button>
      </form>
      {location.pathname === "/profile/orders" && (
        <NotFoundPage />
      )}
    </section >
  );
};

export default ProfilePage;