import { Button, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './reset-password-page.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation, Navigate } from 'react-router-dom';
import { resetPasswordApi } from "../../services/actions/reset-password-actions";

const ResetPasswordPage = () => {


  const dispatch = useDispatch();
  const resetPassword = useSelector((state) => state.resetPassword);
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthorized = location.state && location.state.reset;
  const defaultData = {
    password: '',
    token: '',
  };


  const [value, setValue] = useState(defaultData);


  useEffect(() => {
    if (resetPassword.status) {
      navigate('/login');
      setValue(defaultData);
    }
  }, [resetPassword, navigate, defaultData])

  return isAuthorized ? (
    <form className={styles.container} onSubmit={(e) => {
      e.preventDefault();
      dispatch(resetPasswordApi(value));
    }}>
      <h1 className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</h1>
      <div className={styles.input}>
        <PasswordInput
          placeholder={"Введите новый пароль"}
          onChange={e => setValue({
            ...value,
            password: e.target.value
          }
          )}
          value={value.password}
          name={'password'}
          extraClass="mb-2"
        />
      </div>
      <div className={styles.input}>
        <Input
          type={"text"}
          value={value.token}
          onChange={e => setValue({
            ...value,
            token: e.target.value
          }
          )}
          placeholder={"Введите код из письма"}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />
      </div>
      <div className={styles.input}>
        <Button htmlType="submit" type="primary" size="large" extraClass="mb-20">
          Сохранить
        </Button>
      </div>
      <p className="text text_type_main-default text_color_inactive mb-4">Вспомнили пароль? <span><Link to='/login' className={styles.links}>Войти</Link></span></p>
    </form>
  ) : (<Navigate to='/forgot-password' replace />)
}


export { ResetPasswordPage };