import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import Nav from '../../components/Nav/Nav';
import MainTitleWithImage from './MainTitleWithImage/MainTitleWithImage';
import Comment_popup from './Comment_popup/Comment_popup';
import Ad from './Ad/Ad';
import Gallery from './Gallery/Gallery';
import MainInfo from './MainInfo/MainInfo';
import Comment from '../../components/Comment/Comment';
import SimilarMovie from './SimilarMovie/SimilarMovie';
import styles from './Detail.module.scss';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import { BASE_URL } from '../../config';

function Detail() {
  const params = useParams();

  const [loginPopUpRequest, setLoginPopUpRequest] = useState(0);
  const [commentPopUpRequest, setCommentPopUpRequest] = useState(0);
  const [movieInfo, setmovieInfo] = useState({
    movie_id: 0,
    movie_name: '',
    release_date: '',
    genre_name: '',
    country_name: '',
    run_time: 0,
    movie_age: 0,
    movie_story: '',
    poster_url: '',
  });

  const [movieRating, setmovieRating] = useState({
    ratings_total: 0,
    ratings_avg: 0,
  });
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    fetch(`http://${BASE_URL}:8000/user/verification`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(result => {
        if (result.message === 'NOW_LOGIN') {
          setIsLogin(true);
        } else if (result.message === 'NOW_LOGOUT') {
          setIsLogin(false);
        }
      });
  }, []);

  useEffect(() => {
    fetch(`http://${BASE_URL}:8000/movie/${params.id}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        let movieInfo = data.movieInfo;
        setmovieInfo(movieInfo[0]);
      });

    fetch(`http://${BASE_URL}:8000/rating/movie-ratings/${params.id}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data) setmovieRating(data.movieRatingsInfo[0]);
      });
  }, []);
  const [reloadRating, setReloadRating] = useState(false);

  function RequestCommentPopup() {
    setCommentPopUpRequest(commentPopUpRequest + 1);
  }
  function RequesLoginPopup() {
    setLoginPopUpRequest(loginPopUpRequest + 1);
  }
  return (
    <>
      <Nav loginRequest={loginPopUpRequest} />
      <Comment_popup
        key={movieInfo.movie_id}
        movieId={movieInfo.movie_id}
        movieName={movieInfo.movie_name}
        popupRequest={commentPopUpRequest}
      />
      <MainTitleWithImage
        islogin={isLogin}
        RequesLoginPopup={RequesLoginPopup}
        RequestCommentPopup={RequestCommentPopup}
        movieInfo={movieInfo}
        movieRating={movieRating}
        movieId={params.id}
      />
      <div className={styles.Wrapper}>
        <div className={styles.detailWrapper}>
          <div className={styles.info__wrapper}>
            <MainInfo movieInfo={movieInfo} movieRating={movieRating} />
            <Comment
              islogin={isLogin}
              movieId={movieInfo.movie_id}
              RequesLoginPopup={RequesLoginPopup}
            />
            <SimilarMovie genre_name={movieInfo.genre_name} />
          </div>
          <div className={styles.adGalleryWrapper}>
            <Ad />
            <Gallery movieId={movieInfo.movie_id} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Detail;
