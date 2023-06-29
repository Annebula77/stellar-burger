
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { useEffect } from 'react';
import OrderExplication from '../../components/order-explication/order-explication';
import Modal from '../../components/modal/modal';
import styles from './explicit-order-page.module.css';
import { startConnection, wsConnectionClosed } from '../../services/slices/webSocket-slice';
import { getCookie } from '../../utils/cookies';

export const ExplicitOrderPage = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const background = location.state?.background;
  const { id } = useParams();
  const accessToken = getCookie('accessToken');
  const userOrders = useAppSelector(state => state.wsUser.orders);
  const orders = useAppSelector(state => state.ws.orders);

  const ordersList = location.pathname.includes('feed') ? orders : userOrders;
  const order = ordersList?.find(order => order._id === id);

  useEffect(() => {
    if (location.pathname.includes('/orders')) {
      dispatch(startConnection(accessToken));
    } else {
      dispatch(startConnection());
    }
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch, location, accessToken]);

  if (!order) {
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