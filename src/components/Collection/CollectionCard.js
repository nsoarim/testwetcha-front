import { useState } from 'react';
import styles from './Collection.module.scss';
import CollectionImg from './CollectionImg';

function CollectionCard(props) {
  return (
    <div className={styles.CollectionCard}>
      <div className={styles.Collection__double}>
        <div className={styles.collection__card}>
          <section className={styles.collection__imgBoxContainer}>
            {props.total.map((movie, k) => {
              if (k < 4) {
                return (
                  <CollectionImg
                    key={movie.movie_id}
                    imgUrl={movie.poster_url}
                    movie_id={movie.movie_id}
                  />
                );
              }
            })}
          </section>
          <section className={styles.collection__imgBoxContainer}>
            {props.total.map((movie, k) => {
              if (k >= 4) {
                return (
                  <CollectionImg
                    key={movie.movie_id}
                    imgUrl={movie.poster_url}
                    movie_id={movie.movie_id}
                  />
                );
              }
            })}
          </section>
        </div>
      </div>

      <h2 className={styles.collection__card__title}>
        {props.total[0].category_name}
      </h2>
    </div>
  );
}

export default CollectionCard;
