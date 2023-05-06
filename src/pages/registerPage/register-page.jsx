import { Button, EmailInput, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './register-page.module.css';
import { useState } from 'react';

const RegisterPage = () => {

  const [nameValue, setNameValue] = useState('')
  const onNameChange = e => {
    setNameValue(e.target.value)
  }
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
      <h1 className={`${styles.title} text text_type_main-medium`}>Регистрация</h1>
      <div className={styles.input}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          size={'default'}
          extraClass="ml-1 pt-6"
          value={nameValue}
          onChange={onNameChange}
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

      <div className={styles.input}>
        <Button htmlType="button" type="primary" size="large" extraClass="mb-20">
          Зарегистрироваться
        </Button>
      </div>
      <p className="text text_type_main-default text_color_inactive mb-4">Уже зарегистрированы? <span className={styles.links}>Войти</span></p>
    </section>
  )
}


export { RegisterPage };