import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Search.module.scss';
import SearchMovieImage from './SearchListImage';
import { BASE_URL } from '../../config';

function SearchMovie() {
  const [movieData, setMovieData] = useState([]);
  let urlName = decodeURI(window.location.search);
  urlName = urlName.substr(1);

  useEffect(() => {
    fetch(`http://${BASE_URL}:8000/movie?search=${urlName}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        let dataForSearch = data.searchedMovies.MovieList;
        dataForSearch.map(item => {
          item.release_date = item.release_date.split('/')[0];
        });
        setMovieData(dataForSearch);
      });
  }, []);

  return (
    <div className={styles.Search}>
      <div className={styles.SearchHeader}>
        <div className={styles.SearchMovieTilte}>"{urlName} "의 검색결과</div>
      </div>
      <div className={styles.SearchMovie}>
        <div className={styles.SearchSection}>
          {movieData.map(comment => {
            return (
              <SearchMovieImage
                key={comment.id}
                id={comment.id}
                imgUrl={comment.poster_url}
                name={comment.name}
                year={comment.release_date}
                country={comment.country}
                genre={comment.genre_name}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default SearchMovie;
