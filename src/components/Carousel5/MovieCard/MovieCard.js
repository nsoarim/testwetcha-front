import styles from './MovieCard.module.scss';
import { useNavigate } from 'react-router-dom';

const MovieCard = props => {
  const navigate = useNavigate();
  const onClickWrapper = () => {
    navigate(`/detail/${props.movie_id}`);
    window.scrollTo(0, 0);
  };
  return (
    <div className={styles.MovieCardWrapper} onClick={onClickWrapper}>
      <div className={styles.PosterBox}>
        <div className={styles.SequenceNumberBox}>{props.sequenceNumber}</div>
        <img className={styles.PosterImage} src={props.imgUrl} />
      </div>
      <div className={styles.MovieInfoWrapper}>
        <div className={styles.MovieInfoTitle}>{props.title}</div>
        <div className={styles.MovieInfoSubWrapper}>
          <div>{props.releasedYear + '·' + props.countryName}</div>
          <div className={styles.MovieInfoRating}>{props.genre_name}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
