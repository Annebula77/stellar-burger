import AppHeader from "../app-header/app-header";
import styles from "./app.module.css";
import { HomePage } from "../../pages/homePage/homePage";
import { LoginPage } from "../../pages/loginPage/login-page";
import { RegisterPage } from "../../pages/registerPage/register-page";
import { ForgotPasswordPage } from "../../pages/forgotPasswordPage/forgot-password-page";
import { ResetPasswordPage } from "../../pages/resetPasswordPage/reset-password-page";
import { NotFoundPage } from "../../pages/notFoundPage/not-found-page";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchIngredients } from "../../services/actions/ingredients-actions";
import { Routes, Route } from 'react-router-dom';


function App() {
  const dispatch = useDispatch();
  const { ingredients, loadingIngredients, errorIngredients, dataRequest } =
    useSelector((state) => state.ingredients);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);
  return (
    <>
      <section className={styles.app}>
        <AppHeader />
        {loadingIngredients && <p>Загрузка...</p>}
        {errorIngredients && <p>Произошла ошибка</p>}
        {dataRequest && (
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/forgot-password' element={<ForgotPasswordPage />} />
            <Route path='/reset-password' element={<ResetPasswordPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        )}
      </section>
    </>
  )

}

export default App;