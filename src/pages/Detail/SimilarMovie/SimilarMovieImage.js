import styles from './SimilarMovie.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function SimilarMovieImage(props) {
  const navigate = useNavigate();

  const goToDetailPage = () => {
    navigate(`/detail/${props.id}`);
    window.scrollTo(0, 0);
    window.location.reload();
  };
  return (
    <section className={styles.MovieSections} onClick={goToDetailPage}>
      <img
        id={props.id}
        src={props.imgUrl}
        alt={props.name}
        className={styles.MovieSectionImg}
      />
      <div className={styles.MovieSectionName}>{props.name}</div>
      <div className={styles.MovieSectionRating}>
        <div className={styles.MovieSectionRating}>
          {props.country + ' · ' + props.release_date}
        </div>
      </div>
      <div className={styles.MovieSectionGenre}>{props.genre}</div>
    </section>
  );
}
export default SimilarMovieImage;
