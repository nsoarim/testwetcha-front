import { useRef, useState, useEffect } from 'react';
import React from 'react';
import styles from './Collection.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import CollectionCard from './CollectionCard';
import { BASE_URL } from '../../config';

function Collection() {
  const [movieList, setMovieList] = useState([]);
  const value = 0;

  const containerRef = useRef();
  const innerRef = useRef();

  useEffect(() => {
    fetch(`http://${BASE_URL}:8000/movie?grouping=category&partitionLimit=8`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        const arrData = Array.from(Array(3), () => new Array(8));
        let k = 0;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 8; j++) {
            arrData[i][j] = data.watchaCollectionData[k++];
          }
        }
        setMovieList(arrData);
      });
  }, []);
  return (
    <div className={`Collection ${styles.collection}`}>
      <h1 className={styles.collection__title}>위챠피디아 컬렉션</h1>

      <div className={styles.collection__container} ref={containerRef}>
        <section className={styles.collection__inner} ref={innerRef}>
          {movieList.map((movie, k) => {
            return <CollectionCard key={k} total={movie} />;
          })}
        </section>
      </div>
    </div>
  );
}
export default Collection;
