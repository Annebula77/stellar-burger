import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forgot-password-page.module.css';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { useNavigate, Link } from 'react-router-dom';
import { forgotPasswordApi } from '../../services/thunks/forgot-password-thunk';


const ForgotPasswordPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const forgotPassword = useAppSelector((state) => state.forgotPassword);

  const [emailValue, setEmailValue] = useState<string>('');
  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value)
  }
  useEffect(() => {
    if (forgotPassword.status) {
      setEmailValue('');
      navigate('/reset-password', { state: { reset: true } });
    }
  }, [forgotPassword, navigate])

  return (
    <form className={styles.container} onSubmit={(e) => {
      e.preventDefault();
      dispatch(forgotPasswordApi(emailValue));
    }}>
      <h1 className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</h1>
      <div className={styles.input}>
        <EmailInput
          placeholder='Укажите E-mail'
          onChange={onEmailChange}
          value={emailValue || ''}
          name={'email'}
          isIcon={false}
        />
      </div>
      <div className={styles.input}>
        <Button htmlType='submit' type='primary' size='large' extraClass='mb-20'>
          Восстановить
        </Button>
      </div>
      <p className='text text_type_main-default text_color_inactive mb-4'>Вспомнили пароль? <span><Link to='/login' className={styles.links}>Войти</Link></span></p>
    </form>
  )
}

export { ForgotPasswordPage };