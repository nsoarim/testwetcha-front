import styles from './Collection.module.scss';
import { useNavigate } from 'react-router-dom';

function CollectionImg(props) {
  const navigate = useNavigate();
  const onClickWrapper = () => {
    navigate(`/detail/${props.movie_id}`);
    window.scrollTo(0, 0);
  };
  return (
    <div className={styles.collection__imgBox} onClick={onClickWrapper}>
      <img
        src={'https://' + props.imgUrl}
        alt="movie-poster"
        className={styles.collection__images}
      />
    </div>
  );
}

export default CollectionImg;
