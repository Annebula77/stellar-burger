import { Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './reset-password-page.module.css';
import { useState, useEffect, FormEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../utils/hooks';
import { useNavigate, Link } from 'react-router-dom';
import { resetPasswordApi } from '../../services/thunks/reset-password-thunk';

const ResetPasswordPage = () => {
  const dispatch = useAppDispatch();
  const resetPassword = useAppSelector((state) => state.resetPassword);
  const navigate = useNavigate();
  const [value, setValue] = useState({
    password: '',
    token: '',
  });

  useEffect(() => {
    if (resetPassword.success === true) {
      navigate('/login');
      setValue({
        password: '',
        token: '',
      });
    }
  }, [resetPassword, navigate]);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(resetPasswordApi(value));
  };

  return (
    <form className={styles.container} onSubmit={handleFormSubmit}>
      <h1 className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</h1>
      <div className={styles.input}>
        <PasswordInput
          placeholder={'Введите новый пароль'}
          onChange={(e) => setValue({ ...value, password: e.target.value })}
          value={value.password}
          name={'password'}
          extraClass='mb-2'
        />
      </div>
      <div className={styles.input}>
        <Input
          type={'text'}
          value={value.token}
          onChange={(e) => setValue({ ...value, token: e.target.value })}
          placeholder={'Введите код из письма'}
          name={'token'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass='mb-6'
        />
      </div>
      <div className={styles.input}>
        <Button htmlType='submit' type='primary' size='large' extraClass='mb-20'>
          Сохранить
        </Button>
      </div>
      <p className='text text_type_main-default text_color_inactive mb-4'>
        Вспомнили пароль? <span><Link to='/login' className={styles.links}>Войти</Link></span>
      </p>
    </form>
  );
}

export { ResetPasswordPage };