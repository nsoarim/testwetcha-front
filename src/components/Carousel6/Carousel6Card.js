import styles from './Carousel6.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Carousel6Card(props) {
  const navigate = useNavigate();
  const onClickWrapper = () => {
    navigate(`/detail/${props.movie_id}`);
    window.scrollTo(0, 0);
  };
  return (
    <section className={styles.posterArea} onClick={onClickWrapper}>
      <img className={styles.posterImg} src={props.imgUrl} />
      <div className={styles.info}>
        <p className={styles.movieName}>{props.title}</p>
        <p className={styles.ratings}>{props.genre_name}</p>
      </div>
    </section>
  );
}

export default Carousel6Card;
