import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login-page.module.css';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loginApi } from '../../services/thunks/login-thunk'
import { useAppDispatch, useAppSelector } from '../../utils/hooks';


const LoginPage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const loginDetails = useAppSelector((store) => store.login);
  const isLoggedIn = useAppSelector((store) => store.user.user !== null);


  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const [fromPath, setFromPath] = useState('/');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  function onSubmitFrom(e) {
    e.preventDefault();
    dispatch(loginApi(formValues));
  }

  useEffect(() => {
    if (location.state && location.state.from) {
      setFromPath(location.state.from);
    }
  }, [location.state]);

  useEffect(() => {
    if (loginDetails.status) {
      setFormValues({
        email: '',
        password: '',
      });

      if (isLoggedIn) {
        navigate(location?.state?.from || '/');
      }
    }
  }, [loginDetails, isLoggedIn, location.state, navigate]);

  return (
    <form className={styles.container} onSubmit={onSubmitFrom}>
      <h1 className={`${styles.title} text text_type_main-medium`}>Вход</h1>
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
          Войти
        </Button>
      </div>
      <p className='text text_type_main-default text_color_inactive mb-4'>Вы - новый пользователь? <span><Link to='/register' className={styles.links}>Зарегистрироваться</Link></span> </p>
      <p className='text text_type_main-default text_color_inactive mb-4'>Забыли пароль? <span ><Link to='/forgot-password' className={styles.links}>Восстановить пароль</Link></span></p>
    </form>
  )
}

export { LoginPage };
