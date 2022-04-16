import styles from './InfoList.module.scss';

// function InfoList(props) {
//   const { name, release_date, genre, country, run_time, age, story } = props;
//   return (
//     <div className={styles.basic__content}>
//       <p>{name}</p>
//       <p>
//         {release_date} · {country} · {genre}
//       </p>
//       <p>
//         {run_time} · {age}
//       </p>
//       <p className={styles.movie__story}>{story}</p>
//     </div>
//   );
// }

const InfoList = ({ name, date, country, genre, run_time, age, story }) => {
  if (age == 0) {
    age = '전체이용가';
  } else if (age == 19) {
    age = '청불';
  } else {
    age += '세';
  }
  return (
    <div className={styles.basic__content}>
      <p>{name}</p>
      <p>
        {date} · {country} · {genre}
      </p>
      <p>
        {run_time}분 · {age}
      </p>
      <p className={styles.movie__story}>{story}</p>
    </div>
  );
};
export default InfoList;
