import styles from './order-image.module.css';
import PropTypes from 'prop-types';

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
OrderImage.propTypes = {
  image: PropTypes.string.isRequired,
  extraCountClass: PropTypes.string,
};

export default OrderImage;