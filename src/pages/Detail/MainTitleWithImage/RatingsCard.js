import styles from './MainTitleWithImage.module.scss';

function RatingsCard({ stars }) {
  return (
    <div className={styles.eachStars}>
      <img className={styles.starStyle} src={stars.imageUrl} />
    </div>
  );
}

export default RatingsCard;
