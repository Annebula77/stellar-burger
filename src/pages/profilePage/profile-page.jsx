import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './profile-page.module.css';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { NotFoundPage } from "../notFoundPage/not-found-page";
import { CustomNavLink } from "../../utils/hoc";


const ProfilePage = () => {
  const location = useLocation();
  const [emailValue, setEmailValue] = useState('mail@stellar.burgers')
  const onEmailChange = e => {
    setEmailValue(e.target.value)
  }

  const [passwordValue, setPasswordValue] = useState('**********')
  const onPasswordChange = e => {
    setPasswordValue(e.target.value)
  }

  const [value, setValue] = useState('Марк');
  const onInputChange = e => {
    setValue(e.target.value)
  }
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
      {location.pathname === "/profile" && (
        <form className={styles.profile}>
          <div className={styles.input}>
            <Input
              type={"text"}
              value={value}
              onChange={onInputChange}
              placeholder={"Имя"}
              name={"name"}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
            />
          </div>
          <div className={styles.input}>
            <EmailInput
              onChange={onEmailChange}
              value={emailValue}
              name={'email'}
              isIcon={false}
            />
          </div>
          <div className={styles.input}>
            <PasswordInput
              onChange={onPasswordChange}
              value={passwordValue}
              name={'password'}
              extraClass="mb-2"
            />
          </div>

          <Button htmlType="submit" type="primary" size="large" extraClass="mt-3">
            Сохранить
          </Button>
        </form>
      )}
      {location.pathname === "/profile/orders" && (
        <NotFoundPage />
      )}
    </section >
  );
};

export { ProfilePage };