import styles from './order-feed.module.css';
import OrderOverviewShield from '../../components/order-overview-shield/order-overview-shield';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useCallback } from 'react';
import { getCookie } from '../../utils/cookies';
import { startWsConnection, wsConnectionClosed } from '../../services/actions/webSocket-actions';
import OrderExplication from '../order-explication/order-explication';
import { setModalContent, clearModalContent } from '../../services/actions/modal-action';
import Modal from '../modal/modal';


const OrderFeed = () => {
  const dispatch = useDispatch();
  const accessToken = getCookie('accessToken');
  const orders = useSelector((state) => state.ws.data?.orders);
  const modalContent = useSelector((state) => state.modal.modalContent);

  useEffect(() => {
    dispatch(startWsConnection('orders', accessToken));
    return () => {
      dispatch(wsConnectionClosed()); // Закрытие WebSocket соединения
    };

  }, []);

  const openModal = useCallback((order) => {
    dispatch(setModalContent('orderExplication', <OrderExplication order={order} />))
  })

  const closeModal = useCallback(() => {
    dispatch(clearModalContent());
  })




  return (
    <div className={styles.container}>
      {orders &&
        orders.map((order) => (
          <OrderOverviewShield key={order._id} order={order} onClick={() => openModal(order)} />
        ))}
      {
        modalContent && (
          <Modal onClose={closeModal}>
            {modalContent}
          </Modal>
        )
      }
    </div>
  );
};

export default OrderFeed;

