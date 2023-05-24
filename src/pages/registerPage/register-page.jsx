import { Button, EmailInput, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register-page.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/actions/register-actions';
import { loginApi } from '../../services/actions/login-actions';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((store) => store.registerUser.isAuthenticated);

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(registerUser(formValues.name, formValues.email, formValues.password));
    if (result) {
      dispatch(loginApi(formValues.email, formValues.password));
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <form className={styles.container} onSubmit={(e) => onFormSubmit(e)}>
      <h1 className={`${styles.title} text text_type_main-medium`}>Регистрация</h1>
      <div className={styles.input}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          name={'name'}
          size={'default'}
          extraClass='ml-1 pt-6'
          value={formValues.name}
          onChange={handleChange}
        />

      </div>
      <div className={styles.input}>
        <EmailInput
          onChange={handleChange}
          value={formValues.email}
          name={'email'}
          isIcon={false}
        />
      </div>
      <div className={styles.input}>
        <PasswordInput
          onChange={handleChange}
          value={formValues.password}
          name={'password'}
          extraClass='mb-2'
        />
      </div>

      <div className={styles.input}>
        <Button htmlType='submit' type='primary' size='large' extraClass='mb-20'>
          Зарегистрироваться
        </Button>
      </div>
      <p className='text text_type_main-default text_color_inactive mb-4'>Уже зарегистрированы? <span><Link to='/login' className={styles.links}>Войти</Link></span></p>
    </form>
  )
}


export { RegisterPage };