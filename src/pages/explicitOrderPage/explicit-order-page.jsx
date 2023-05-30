
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import OrderExplication from '../../components/order-explication/order-explication';
import Modal from '../../components/modal/modal';
import styles from './explicit-order-page.module.css';
import { startWsConnection, wsConnectionClosed } from '../../services/actions/webSocket-actions';
import { getCookie } from '../../utils/cookies';

export const ExplicitOrderPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const background = location.state?.background;
  const { id } = useParams();
  const accessToken = getCookie('accessToken');
  const orders = useSelector(state => state.ws.data?.orders);
  const order = orders?.find(order => order._id === id);

  useEffect(() => {
    if (location.pathname.includes('/orders')) {
      dispatch(startWsConnection('user', accessToken));
    } else {
      dispatch(startWsConnection());
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