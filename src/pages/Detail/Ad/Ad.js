import styles from './Ad.module.scss';

function Ad() {
  const goToAd = () => {
    window.open('https://justcoder.co.kr/', '_blank');
  };

  return (
    <div className={styles.DetailAd} onClick={goToAd}>
      <img
        src="/./images/fullstack4_5.png"
        alt="Ad"
        className={styles.AdImage}
      />
      <div className={styles.AdExplanation}>
        <ul>
          <li className={styles.AdTitle}>JustCode X 위챠 스토리공모</li>
          <li className={styles.subTitle1}>단편소설, 시리즈대본</li>
          <li className={styles.subTitle2}>JUSTCODE</li>
        </ul>
        <button className={styles.AdButton}>상세보기</button>
      </div>
    </div>
  );
}
export default Ad;
