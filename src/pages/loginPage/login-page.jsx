import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './login-page.module.css';
import { useState } from 'react';

const LoginPage = () => {
  const [emailValue, setEmailValue] = useState('')
  const onEmailChange = e => {
    setEmailValue(e.target.value)
  }

  const [passwordValue, setPasswordValue] = useState('')
  const onPasswordChange = e => {
    setPasswordValue(e.target.value)
  }
  return (
    <section className={styles.container}>
      <h1 className={`${styles.title} text text_type_main-medium`}>Вход</h1>
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

      <div className={styles.input}>
        <Button htmlType="button" type="primary" size="large" extraClass="mb-20">
          Войти
        </Button>
      </div>
      <p className="text text_type_main-default text_color_inactive mb-4">Вы - новый пользователь? <span className={styles.links}>Зарегистрироваться</span></p>
      <p className="text text_type_main-default text_color_inactive mb-4">Забыли пароль? <span className={styles.links}>Восстановить пароль</span></p>
    </section>
  )
}


export { LoginPage };