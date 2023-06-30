
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { useEffect } from 'react';
import OrderExplication from '../../components/order-explication/order-explication';
import Modal from '../../components/modal/modal';
import styles from './explicit-order-page.module.css';
import { startConnection, startUserConnection, wsConnectionClosed } from '../../services/slices/webSocket-slice';
import { getCookie } from '../../utils/cookies';

export const ExplicitOrderPage = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const background = location.state?.background;
  const { id } = useParams();
  const accessToken = getCookie('accessToken');



  useEffect(() => {

    if (accessToken) {
      if (location.pathname.includes('/orders')) {
        dispatch(startUserConnection(accessToken));
      } else {
        dispatch(startConnection());
      }
    }

    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch, location, accessToken]);


  const isLoading = useAppSelector((state) => state.ws.isLoading || state.wsUser.isLoading);

  // Если данные ещё загружаются, показываем индикатор загрузки
  if (isLoading) {
    return <div>Loading...</div>;
  }



  const closeModal = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      {background ? (
        <Modal onClose={closeModal}>
          <OrderExplication order={id} inModal={true} />
        </Modal>
      ) : (
        <OrderExplication order={id} inModal={false} />
      )}
    </div>
  );
};