import styles from './order-details.module.css';

function OrderDetails() {
  return (
    <div className={styles.container}>
      <h2 className={`text text_type_digits-large ${styles.neon}`}>034536</h2>
      <p className='text text_type_main-medium mt-8 mb-15'>идентификатор заказа</p>
      <div className={styles.v}></div>
      <p className='text text_type_main-default mt-15 mb-2'>Ваш заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

export default OrderDetails;