import { Button, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './reset-password-page.module.css';
import { useState } from 'react';

const ResetPasswordPage = () => {

  const [passwordValue, setPasswordValue] = useState('')
  const onPasswordChange = e => {
    setPasswordValue(e.target.value)
  }
  const [inputValue, setInputValue] = useState('')
  const onInputChange = e => {
    setInputValue(e.target.value)
  }

  return (
    <section className={styles.container}>
      <h1 className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</h1>
      <div className={styles.input}>
        <PasswordInput
          placeholder={"Введите новый пароль"}
          onChange={onPasswordChange}
          value={passwordValue}
          name={'password'}
          extraClass="mb-2"
        />
      </div>
      <div className={styles.input}>
        <Input
          type={"text"}
          value={inputValue}
          onChange={onInputChange}
          placeholder={"Введите код из письма"}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />
      </div>
      <div className={styles.input}>
        <Button htmlType="button" type="primary" size="large" extraClass="mb-20">
          Сохранить
        </Button>
      </div>
      <p className="text text_type_main-default text_color_inactive mb-4">Вспомнили пароль? <span className={styles.links}>Войти</span></p>
    </section>
  )
}


export { ResetPasswordPage };