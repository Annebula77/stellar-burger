import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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
import { IngredientPage } from '../../pages/ingredientPage/ingredient-page';
import ProfilePage from '../../pages/profilePage/profile-page';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { clearIngredientDetails } from '../../services/actions/ingredient-action';
import ProtectedRouteElement from '../ProtectedRouteElement/protectedRouteElement';
import PublicRouteElement from '../PublicRouteElement/public-route-element';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.modal;
  const { ingredients, loadingIngredients, errorIngredients, dataRequest } = useSelector(
    (state) => state.ingredients
  );

  useEffect(() => {
    dispatch(fetchIngredients());
    const accessToken = getCookie('accessToken');
    const refreshToken = getCookie('refreshToken');

    if (accessToken && refreshToken) {
      dispatch(loginSuccess(accessToken, refreshToken));
      dispatch({ type: 'ISAUTH_CHECKED', payload: true });
    }
  }, [dispatch]);


  const closeModal = () => {
    dispatch(clearIngredientDetails());

    window.removeEventListener('popstate', closeModal);

    const background = location.state && location.state.background;
    if (background) {
      navigate(background, { replace: true });
    } else {
      navigate(-1, { state: { modal: false } });
    }
  };

  return (
    <>
      <section className={styles.app}>
        <AppHeader />
        {loadingIngredients && <p>Загрузка...</p>}
        {errorIngredients && <p>Произошла ошибка</p>}
        {dataRequest && (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ingredients/:id" element={!background ? <IngredientPage /> : null} />
            <Route
              path="/login"
              element={<PublicRouteElement element={<LoginPage />} />}
            />
            <Route
              path="/register"
              element={<PublicRouteElement element={<RegisterPage />} />}
            />
            <Route path="/forgot-password" element={<PublicRouteElement element={<ForgotPasswordPage />} />} />

            <Route path="reset-password" element={<PublicRouteElement element={<ResetPasswordPage />} />} />
            <Route path="/profile/*" element={<ProtectedRouteElement element={<ProfilePage />} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        )}
        {background && (
          <Modal onClose={() => closeModal(location)}>
            <Routes>
              <Route path="/ingredients/:id" element={<IngredientDetails />} />
            </Routes>
          </Modal>
        )}
      </section>
    </>
  );
}

export default App;