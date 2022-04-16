import styles from './Search.module.scss';
import { useNavigate } from 'react-router-dom';

function SimilarMovieImage(props) {
  const navigate = useNavigate();

  const goToDetailPage = () => {
    navigate(`/detail/${props.id}`);
  };
  return (
    <section className={styles.SearchSections} onClick={goToDetailPage}>
      <img
        id={props.id}
        src={'https://' + props.imgUrl}
        alt={props.name}
        className={styles.SearchSectionImg}
      />
      <div className={styles.SearchSectionName}>{props.name}</div>
      <div className={styles.SearchSectioninfo}>
        <div className={styles.Searchyear}>{props.year}</div>
        <div className={styles.dot}> ・ </div>
        <div className={styles.SearchCountry}>{props.country}</div>
      </div>
      <div className={styles.MovieSectionGenre}>{props.genre}</div>
    </section>
  );
}
export default SimilarMovieImage;
