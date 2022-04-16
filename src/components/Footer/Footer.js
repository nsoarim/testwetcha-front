import styles from './Footer.module.scss';
import { faBlog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useState, useEffect } from 'react';
import { BASE_URL } from '../../config';

function Footer() {
  const [ratingTotal, setRatingTotal] = useState();

  const goToBlog = () => {
    window.open('https://youngseokim-kr.github.io/', '_blank');
  };
  const goToFacebook = () => {
    window.open('https://github.com/youngseoKim-kr', '_blank');
  };
  const goToTwitter = () => {
    window.open('https://youngseokim-kr.github.io/', '_blank');
  };

  useEffect(() => {
    fetch(`http://${BASE_URL}:8000/rating/users-ratings`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setRatingTotal(data.allRatings[0].ratings_all);
      });
  }, []);

  return (
    <div className={styles.Footer}>
      <p className={styles.footerTopSection}>
        지금까지{' '}
        <span className={styles.footerTopSectionColor}>
          ★ {ratingTotal}개의 평가가
        </span>{' '}
        쌓였어요.
      </p>
      <div className={styles.footerSection}>
        <div className={styles.SectionLeft}>
          <ul className={styles.LeftHeader}>
            <li>서비스 이용약관 | </li>
            <li>개인정보 처리방침 | </li>
            <li>회사 안내</li>
          </ul>
          <ul className={styles.LeftCenter}>
            <li>고객센터 | </li>
            <li>02-123-4567</li>
          </ul>
          <ul className={styles.LeftCenter}>
            <li>광고 문의 | </li>
            <li>abc@gmail.com</li>
          </ul>
          <ul className={styles.LeftCenter}>
            <li>제휴 및 대외 협력</li>
            <li>https://youngseokim-kr.github.io</li>
          </ul>
          <ul className={styles.LeftBottomHeader}>
            <li>주식회사 위챠</li>
            <li>대표 김영서</li>
            <li>서울특별시 서초구 강남대로 123 영서빌딩</li>
          </ul>
          <ul className={styles.LeftBottom}>
            <li>사업자 등록 번호</li>
            <li>123-45-6789</li>
          </ul>
          <ul className={styles.LeftBottom}>
            <li>WETCHA PEDIA</li>
            <li>© 2022 by WETCHA, Inc. All rights reserved.</li>
          </ul>
        </div>
        <div className={styles.sectionRigh}>
          <FontAwesomeIcon
            icon={faBlog}
            className={styles.footerFont}
            onClick={goToBlog}
          />
          <FontAwesomeIcon
            icon={faFacebook}
            className={styles.footerFont}
            onClick={goToFacebook}
          />
          <FontAwesomeIcon
            icon={faTwitter}
            className={styles.footerFont}
            onClick={goToTwitter}
          />
        </div>
      </div>
    </div>
  );
}
export default Footer;
