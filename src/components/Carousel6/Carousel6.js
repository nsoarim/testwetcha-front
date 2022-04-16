import styles from './Carousel6.module.scss';
import { useState, useRef, useEffect } from 'react';
import Carousel6Card from './Carousel6Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleChevronRight,
  faCircleChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from '../../config';

function Carousel6(props) {
  const [scrollXTop, setScrollXTop] = useState(0);
  const [scrollXBottom, setScrollXTBottom] = useState(0);
  const sectionTop = useRef(null);
  const sectionBottom = useRef(null);

  const cursorTop = event => {
    setScrollXTop(event.target.scrollLeft);
  };

  const cursorBottom = event => {
    setScrollXTBottom(event.target.scrollLeft);
  };
  // const cursorBottom = event => {
  //   setScrollX(event.target.scrollLeft);
  // };

  const moveLeftTop = scrollOffset => {
    sectionTop.current.scrollLeft += scrollOffset;
  };

  const moveLeftBottom = scrollOffset => {
    sectionBottom.current.scrollLeft += scrollOffset;
  };

  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    fetch(
      `http://${BASE_URL}:8000/movie?${props.urlName}=${props.CategoryId}&limit=${props.limit}`,
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
    <div className={styles.wholeWrapper}>
      <div className={styles.wrapper}>
        <div className={styles.carouselComp}>
          <title className={styles.CategoryTitle}>{props.categoryName}</title>
          <section
            className={styles.topSlider}
            onScroll={cursorTop}
            ref={sectionTop}
          >
            {movieList.map(movie => (
              <Carousel6Card
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
            ))}
            {scrollXTop === 0 ? null : (
              <FontAwesomeIcon
                icon={faCircleChevronLeft}
                className={styles.topLeft}
                onClick={() => {
                  moveLeftTop(-1434);
                }}
              />
            )}
            {scrollXTop > 1400 ? null : (
              <FontAwesomeIcon
                icon={faCircleChevronRight}
                className={styles.topRight}
                onClick={() => {
                  moveLeftTop(1434);
                }}
              />
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default Carousel6;
