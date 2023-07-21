import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { fetchIngredients } from '../../services/thunks/ingredients-thunks';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css';
import { initializeLoginFromCookies } from '../../services/slices/login-slice';
import { getCookie } from '../../utils/cookies';
import { HomePage } from '../../pages/homePage/homePage';
import { LoginPage } from '../../pages/loginPage/login-page';
import { RegisterPage } from '../../pages/registerPage/register-page';
import { ForgotPasswordPage } from '../../pages/forgotPasswordPage/forgot-password-page';
import { ResetPasswordPage } from '../../pages/resetPasswordPage/reset-password-page';
import { NotFoundPage } from '../../pages/notFoundPage/not-found-page';
import ProfilePage from '../../pages/profilePage/profile-page';
import ProtectedRouteElement from '../ProtectedRouteElement/protectedRouteElement';
import PublicRouteElement from '../PublicRouteElement/public-route-element';
import { IngredientPage } from '../../pages/ingredientPage/ingredient-page';
import { getUserDetails } from '../../services/thunks/user-thunks';
import { isAuthChecked } from '../../services/slices/user-slice';
import { FeedPage } from '../../pages/feedPage/feed-page';
import { UserOrdersPage } from '../../pages/userOrdersPage/user-orders-page';
import { ExplicitOrderPage } from '../../pages/explicitOrderPage/explicit-order-page';


function App() {


  const dispatch = useAppDispatch();
  const { loadingIngredients, errorIngredients, dataRequest } = useAppSelector(
    (store) => store.ingredients);

  useEffect(() => {
    dispatch(fetchIngredients());
    const accessToken = getCookie('accessToken');
    const refreshToken = getCookie('refreshToken');

    if (accessToken && refreshToken) {
      dispatch(initializeLoginFromCookies({ accessToken, refreshToken }));
      dispatch(isAuthChecked(true));
    }

  }, [dispatch]);

  useEffect(() => {
    const refreshToken = getCookie('refreshToken');
    if (refreshToken) {
      dispatch(getUserDetails());
    }
  }, [dispatch]);



  return (
    <section className={styles.app}>
      <AppHeader />
      {loadingIngredients && <p>Загрузка...</p>}
      {errorIngredients && <p>Произошла ошибка</p>}
      {dataRequest && (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ingredients/:id" element={<IngredientPage />} />
          <Route path="/feed/:id" element={<ExplicitOrderPage />} />
          <Route path="/orders/:id" element={<ExplicitOrderPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/login" element={<PublicRouteElement element={<LoginPage />} />} />
          <Route path="/register" element={<PublicRouteElement element={<RegisterPage />} />} />
          <Route path="/forgot-password" element={<PublicRouteElement element={<ForgotPasswordPage />} />} />
          <Route path="/reset-password" element={<PublicRouteElement element={<ResetPasswordPage />} />} />
          <Route path="/profile/*" element={<ProtectedRouteElement element={<ProfilePage />} />} >
            <Route path="orders" element={<UserOrdersPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      )}
    </section>
  );
}

export default App;