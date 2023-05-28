
import styles from './user-orders-page.module.css';
import UserOrderFeed from '../../components/user-order-feed/user-order-feed'

const UserOrdersPage = () => {

  return (
    <section className={styles.section}>
      <div className={styles.orders__section}>
        <div className={styles.orders__container}>
          <UserOrderFeed />
        </div>
      </div>
    </section>
  );
};

export { UserOrdersPage };