import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchIngredients } from '../../services/actions/ingredients-actions';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css';
import { loginSuccess } from '../../services/actions/login-actions';
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
import { getUserDetails, fetchWithRefresh } from '../../services/actions/user-actions';
import { FeedPage } from '../../pages/feedPage/feed-page';
import { UserOrdersPage } from '../../pages/userOrdersPage/user-orders-page';


function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state?.background;
  const { loadingIngredients, errorIngredients, dataRequest } = useSelector(
    (state) => state.ingredients
  );

  useEffect(() => {
    dispatch(fetchIngredients());
    const accessToken = getCookie('accessToken');
    const refreshToken = getCookie('refreshToken');

    if (accessToken && refreshToken) {
      dispatch(loginSuccess(accessToken, refreshToken));
      dispatch({ type: 'ISAUTH_CHECKED', payload: true });
    } else {
      dispatch(fetchWithRefresh());
    }
  }, [dispatch]);

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      dispatch(getUserDetails());
    }
  }, [location, dispatch]);

  return (
    <section className={styles.app}>
      <AppHeader />
      {loadingIngredients && <p>Загрузка...</p>}
      {errorIngredients && <p>Произошла ошибка</p>}
      {dataRequest && (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ingredients/:id" element={<IngredientPage />} />
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