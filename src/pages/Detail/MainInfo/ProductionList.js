import styles from './ProductionList.module.scss';

function ProductionList(props) {
  const { url, name } = props;
  // console.log(el);
  return (
    <li className={styles.actor__list}>
      <div className={styles.actor__list__imgBox}>
        <img className={styles.actor__list__img} alt={name} src={url} />
      </div>
      <div className={styles.actor__list__text}>
        <p className={styles.actor__list__text__name}>{name}</p>
        <p className={styles.actor__list__text__role}>감독</p>
      </div>
    </li>
  );
}

export default ProductionList;
