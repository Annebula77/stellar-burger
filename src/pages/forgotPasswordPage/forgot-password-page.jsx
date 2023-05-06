import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './forgot-password-page.module.css';
import { useState } from 'react';

const ForgotPasswordPage = () => {
  const [emailValue, setEmailValue] = useState('')
  const onEmailChange = e => {
    setEmailValue(e.target.value)
  }

  return (
    <section className={styles.container}>
      <h1 className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</h1>
      <div className={styles.input}>
        <EmailInput
          placeholder="Укажите E-mail"
          onChange={onEmailChange}
          value={emailValue}
          name={'email'}
          isIcon={false}
        />
      </div>
      <div className={styles.input}>
        <Button htmlType="button" type="primary" size="large" extraClass="mb-20">
          Восстановить
        </Button>
      </div>
      <p className="text text_type_main-default text_color_inactive mb-4">Вспомнили пароль? <span className={styles.links}>Войти</span></p>
    </section>
  )
}


export { ForgotPasswordPage };