import styles from './MainInfo.module.scss';
import ProductionList from './ProductionList';
import InfoList from './InfoList';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BASE_URL } from '../../../config';

import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

function MainInfo(props) {
  const [profileList, setProfileList] = useState([]);

  const [scrollX, setScrollX] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);

  const containerRef = useRef();
  const innerRef = useRef();

  useEffect(() => {
    fetch('/data/production.json', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setProfileList(data);
      });
  }, []);

  function handleScrollX(event) {
    setScrollX(event.target.scrollLeft);
    setSlideWidth(event.target.scrollWidth - event.target.offsetWidth);
  }

  function handlePrevBtn() {
    innerRef.current.scrollBy(-containerRef.current.offsetWidth, 0);
  }

  function handleNextBtn() {
    innerRef.current.scrollBy(containerRef.current.offsetWidth, 0);
  }

  let ratingsString = '';
  if (props.movieRating.ratings_total == 0) {
    ratingsString = '아직 평가가 없습니다.';
  } else {
    ratingsString = '평균 ★ ' + props.movieRating.ratings_avg;
  }
  return (
    <>
      <section className={styles.info__basic}>
        <header className={styles.basic__header}>
          <h2 className={styles.header__title}>기본정보</h2>
          {/* <h3>더보기</h3> */}
        </header>
        {/* {infoList.map(el => {
            return (
              <InfoList
                key={el.movie_id}
                name={el.movie_name}
                release_date={el.release_date}
                genre={el.genre_name}
                country={el.country_name}
                run_time={el.run_time}
                age={el.movie_age}
                story={el.movie_story}
              />
            );
          })} */}
        <InfoList
          key={props.movieInfo.movie_id}
          name={props.movieInfo.movie_name}
          date={props.movieInfo.release_date}
          country={props.movieInfo.country_name}
          genre={props.movieInfo.genre_name}
          run_time={props.movieInfo.run_time}
          age={props.movieInfo.movie_age}
          story={props.movieInfo.movie_story}
        />
      </section>
      <section className={styles.info__actor}>
        <header className={`${styles.actor__header} ${styles.header__title}`}>
          출연/제작
        </header>

        <div className={styles.actor__content} ref={containerRef}>
          <ul
            className={styles.actor__ul}
            ref={innerRef}
            onScroll={handleScrollX}
          >
            {scrollX >= 1 ? (
              <button
                className={`${styles.ul__prevBtn} ${styles.ul__btn}`}
                onClick={handlePrevBtn}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
            ) : null}
            {profileList.map(el => {
              return (
                <ProductionList key={el.id} name={el.name} url={el.imgUrl} />
              );
            })}
          </ul>
          {scrollX !== slideWidth || scrollX === 0 ? (
            <button
              className={`${styles.ul__nextBtn} ${styles.ul__btn}`}
              onClick={handleNextBtn}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          ) : null}
        </div>
      </section>
      <section className={styles.info__graph}>
        <header className={styles.graph__header}>
          <h2 className={styles.header__title}>별점</h2>
          <div className={styles.header__average}>
            <span>{ratingsString}</span>
            <span>({props.movieRating.ratings_total}명)</span>
          </div>
        </header>
      </section>
    </>
  );
}

export default MainInfo;
