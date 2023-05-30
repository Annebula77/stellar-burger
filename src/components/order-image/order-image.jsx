import styles from './order-image.module.css';


const OrderImage = ({ name, image, count, extraCountClass }) => {
  return (
    <div className={`${styles.box}`}>
      <img src={image} alt={name} className={styles.image}></img>
      {count > 1 &&
        <span
          className={`${styles.count} ${extraCountClass} text text_type_digits-default`}
        >
          {`${count}`}
        </span>
      }
    </div>
  )
}


export default OrderImage;