import React, { useState, useEffect } from 'react';
import styles from './Carousel5.module.scss';
import MovieCard from './MovieCard/MovieCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleChevronRight,
  faCircleChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from '../../config';

const Carousel5 = props => {
  const SliderWrapperRef = React.useRef();
  const [leftButtonOn, setLeftButtonOn] = useState('Hidden');
  const [rightButtonOn, setRightButtonOn] = useState('');
  function MoveRight() {
    SliderWrapperRef.current.scrollTo(
      SliderWrapperRef.current.scrollLeft +
        SliderWrapperRef.current.clientWidth,
      0
    );
  }
  function MoveLeft() {
    SliderWrapperRef.current.scrollTo(
      SliderWrapperRef.current.scrollLeft -
        SliderWrapperRef.current.clientWidth,
      0
    );
  }
  function checkScrollPos() {
    if (SliderWrapperRef.current.scrollLeft <= 0) {
      setLeftButtonOn('Hidden');
      return;
    } else if (
      SliderWrapperRef.current.scrollLeft >=
      SliderWrapperRef.current.scrollWidth -
        SliderWrapperRef.current.clientWidth
    ) {
      setRightButtonOn('Hidden');
      return;
    }
    setRightButtonOn('');
    setLeftButtonOn('');
  }

  const [movieList, setMovieList] = useState([]);
  useEffect(() => {
    fetch(
      `http://${BASE_URL}:8000/movie?category-id=${props.CategoryId}&limit=${props.limit}`,
      {
        method: 'GET',
      }
    )
      .then(res => res.json())
      .then(data => {
        let dataForCarousel = data.movies;
        let sequenceNumber = 1;
        dataForCarousel.map(data => {
          data.release_year = data.release_date.split('/')[0];
          data.sequenceNumber = sequenceNumber;
          sequenceNumber += 1;
        });
        setMovieList(dataForCarousel);
      });
  }, []);
  return (
    <div className={styles.Carousel5Wrapper}>
      <div className={styles.DivForButton}>
        <FontAwesomeIcon
          icon={faCircleChevronLeft}
          className={`${styles.Button} ${styles[leftButtonOn]}`}
          onClick={MoveLeft}
        />

        <FontAwesomeIcon
          icon={faCircleChevronRight}
          className={`${styles.Button} ${styles[rightButtonOn]}`}
          onClick={MoveRight}
        />
      </div>
      <div className={styles.Title}>{props.categoryName}</div>
      <div
        className={styles.SliderWrapper}
        ref={SliderWrapperRef}
        onScroll={checkScrollPos}
      >
        {movieList.map(movie => {
          return (
            <MovieCard
              key={movie.id}
              movie_id={movie.id}
              title={movie.name}
              releasedYear={movie.release_year}
              countryName={movie.country_name}
              averageRatingScore={movie.count}
              sequenceNumber={movie.sequenceNumber}
              imgUrl={'https://' + movie.poster_url}
              genre_name={movie.genre_name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Carousel5;
