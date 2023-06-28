import styles from './order-image.module.css';
import { FC } from 'react';


interface OrderImageProps {
  alt: string,
  image: string,
  count?: string | number,
  extraCountClass: string,
  applyExtraStyles?: boolean,
}

const OrderImage: FC<OrderImageProps> = ({ alt, image, count, extraCountClass, applyExtraStyles }) => {
  const imageClass = applyExtraStyles ? `${styles.image} ${extraCountClass}` : styles.image;

  return (
    <div className={`${styles.box}`}>
      <img src={image} alt={alt} className={imageClass}></img>
      {count && (typeof count === 'number' || typeof count === 'string') &&
        <span className={`${styles.count} text text_type_digits-default`}>
          {`${count}`}
        </span>
      }
    </div>
  );
};

export default OrderImage;