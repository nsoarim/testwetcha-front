import styles from './MainTitleWithImage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faPlus,
  faBookmark,
  faPencil,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect } from 'react';
import CommentDelete from './CommentDeleteModal';
import CommentEditComponent from './CommentEditComponent';
import { BASE_URL } from '../../../config';

function MainTitleWithImage(props) {
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(-1);
  const [isRating, setIsRating] = useState(-1);
  const [want, setWant] = useState(false);
  const [noWant, setnoWant] = useState(true);
  const [howWasIt, setHowWasIt] = useState('평가하기');
  const [wantHover, setWantHover] = useState(false);
  const [commentHover, setCommentHover] = useState(false);
  const [commentEdit, setCommentEdit] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    CheckWant();
    Checkrating();
  }, []);
  useEffect(() => {
    if (rating != -1 && isRating == false) {
      PostRating(rating * 0.5);
    } else if (rating != -1 && isRating == true) {
      PatchRating(rating * 0.5);
    }
  }, [rating]);

  function CheckWant() {
    fetch(`http://${BASE_URL}:8000/want/${props.movieId}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.wantInfo[0].want_val == 'N') {
          setnoWant(true);
        } else if (data.wantInfo[0].want_val == '1') {
          setWant(true);
          setnoWant(false);
        } else {
          setWant(false);
          setnoWant(false);
        }
      });
  }

  function PostWant() {
    fetch(`http://${BASE_URL}:8000/want/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        movieId: props.movieId,
      }),
    })
      .then(res => res.json())
      .then(result => {
        CheckWant();
      });
  }

  function PatchWant() {
    let inputWant = 0;

    if (want) {
      setWant(false);
      inputWant = 0;
    } else {
      setWant(true);
      inputWant = 1;
    }
    fetch(`/want`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        wantVal: inputWant,
        movieId: props.movieId,
      }),
    })
      .then(res => res.json())
      .then(result => {});
  }

  function PostRating(val) {
    fetch(`http://${BASE_URL}:8000/rating/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        movieId: props.movieId,
        ratingVal: val,
      }),
    })
      .then(res => res.json())
      .then(result => {
        setIsRating(true);
        props.RequestReloadRating();
      });
  }

  function Checkrating() {
    fetch(`http://${BASE_URL}:8000/rating/${props.movieId}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.userRatingInfo[0].rating_val == 'N') {
          setIsRating(false);
        } else if (data.userRatingInfo[0].rating_val > 0) {
          setIsRating(true);
          setRating(data.userRatingInfo[0].rating_val * 2);
        }
      });
  }

  function PatchRating(val) {
    fetch(`http://${BASE_URL}:8000/rating`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        movieId: props.movieId,
        ratingVal: val,
      }),
    })
      .then(res => res.json())
      .then(result => {
        props.RequestReloadRating();
      });
  }

  function DeleteRating() {
    fetch(`http://${BASE_URL}:8000/rating/${props.movieId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(props.RequestReloadRating());
  }

  useEffect(() => {
    fetch(`http://${BASE_URL}:8000/movie/images/${props.movieId}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.movieImages != undefined) {
          if (data.movieImages.length > 0) {
            setImageUrl('http://' + data.movieImages[0].images_url);
          }
        }
      });
  }, [props.movieId]);

  const commentEditOpen = () => {
    console.log('true');
    setCommentEdit(true);
  };

  const commentEditClose = () => {
    console.log('false');
    setCommentEdit(false);
  };

  useEffect(() => {
    if (rating == 0) {
      return setHowWasIt('평가하기');
    }
    if (rating == 1) {
      return setHowWasIt('최악이에요');
    }
    if (rating == 2) {
      return setHowWasIt('싫어요');
    }
    if (rating == 3) {
      return setHowWasIt('재미없어요');
    }
    if (rating == 4) {
      return setHowWasIt('별로에요');
    }
    if (rating == 5) {
      return setHowWasIt('부족해요');
    }
    if (rating == 6) {
      return setHowWasIt('보통이에요');
    }
    if (rating == 7) {
      return setHowWasIt('볼만해요');
    }
    if (rating == 8) {
      return setHowWasIt('재미있어요');
    }
    if (rating == 9) {
      return setHowWasIt('훌륭해요!');
    }
    if (rating == 10) {
      return setHowWasIt('최고에요!');
    }
  }, [rating]);

  // useEffect(() => {
  //   fetch('/data/ratingStars.json')
  //     .then(res => res.json())
  //     .then(data => {
  //       SetStarImg(data);
  //     });
  // }, []);

  return (
    <div className={styles.wholeWrapper}>
      <div className={styles.imageWrapper}>
        <img className={styles.movieSceneImage} src={imageUrl} />
      </div>
      <section className={styles.infoBlock}>
        <img
          className={styles.poster}
          src={`https://${props.movieInfo.poster_url}`}
        />
        <section className={styles.titlesAndIcons}>
          <article className={styles.movieTitle}>
            {props.movieInfo.movie_name}
          </article>
          <p className={styles.movieInfo}>
            {props.movieInfo.release_date} &middot; {props.movieInfo.genre_name}{' '}
            &middot; {props.movieInfo.country_name}
          </p>
          <div className={styles.averageRating}>
            평균 <FontAwesomeIcon icon={faStar} className={styles.starIcon} />
            {'  '}
            {props.movieRating.ratings_avg
              ? ` ${props.movieRating.ratings_avg} `
              : `  아직 평가가 없습니다. `}
            {`(${props.movieRating.ratings_total}명)`}
          </div>
          <article className={styles.clickables}>
            <div className={styles.starAndLetter}>
              <p className={styles.rateStars}>{howWasIt}</p>
              {props.islogin ? (
                <div className={styles.rating}>
                  <div className={styles.eachStars}>
                    <img
                      className={
                        1 <= (hover || rating) ? styles.on : styles.off
                      }
                      src="/images/star/star_1.png"
                      // key={stars.id}
                      onClick={() => {
                        rating === 1 ? setRating(1) : setRating(1);
                      }}
                      onMouseEnter={() => setHover(1)}
                      onMouseLeave={() => setHover(rating)}
                    />
                  </div>
                  <div className={styles.eachStars}>
                    <img
                      className={
                        2 <= (hover || rating) ? styles.on : styles.off
                      }
                      src="/images/star/star_2.png"
                      // key={stars.id}
                      onClick={() => {
                        rating === 2 ? setRating(2) : setRating(2);
                      }}
                      onMouseEnter={() => setHover(2)}
                      onMouseLeave={() => setHover(rating)}
                    />
                  </div>
                  <div className={styles.eachStars}>
                    <img
                      className={
                        3 <= (hover || rating) ? styles.on : styles.off
                      }
                      src="/images/star/star_3.png"
                      // key={stars.id}
                      onClick={() => {
                        rating === 3 ? setRating(3) : setRating(3);
                      }}
                      onMouseEnter={() => setHover(3)}
                      onMouseLeave={() => setHover(rating)}
                    />
                  </div>
                  <div className={styles.eachStars}>
                    <img
                      className={
                        4 <= (hover || rating) ? styles.on : styles.off
                      }
                      src="/images/star/star_4.png"
                      // key={stars.id}
                      onClick={() => {
                        rating === 4 ? setRating(4) : setRating(4);
                      }}
                      onMouseEnter={() => setHover(4)}
                      onMouseLeave={() => setHover(rating)}
                    />
                  </div>
                  <div className={styles.eachStars}>
                    <img
                      className={
                        5 <= (hover || rating) ? styles.on : styles.off
                      }
                      src="/images/star/star_5.png"
                      // key={stars.id}
                      onClick={() => {
                        rating === 5 ? setRating(5) : setRating(5);
                      }}
                      onMouseEnter={() => setHover(5)}
                      onMouseLeave={() => setHover(rating)}
                    />
                  </div>
                  <div className={styles.eachStars}>
                    <img
                      className={
                        6 <= (hover || rating) ? styles.on : styles.off
                      }
                      src="/images/star/star_6.png"
                      // key={stars.id}
                      onClick={() => {
                        rating === 6 ? setRating(6) : setRating(6);
                      }}
                      onMouseEnter={() => setHover(6)}
                      onMouseLeave={() => setHover(rating)}
                    />
                  </div>
                  <div className={styles.eachStars}>
                    <img
                      className={
                        7 <= (hover || rating) ? styles.on : styles.off
                      }
                      src="/images/star/star_7.png"
                      // key={stars.id}
                      onClick={() => {
                        rating === 7 ? setRating(7) : setRating(7);
                      }}
                      onMouseEnter={() => setHover(7)}
                      onMouseLeave={() => setHover(rating)}
                    />
                  </div>
                  <div className={styles.eachStars}>
                    <img
                      className={
                        8 <= (hover || rating) ? styles.on : styles.off
                      }
                      src="/images/star/star_8.png"
                      // key={stars.id}
                      onClick={() => {
                        rating === 8 ? setRating(8) : setRating(8);
                      }}
                      onMouseEnter={() => setHover(8)}
                      onMouseLeave={() => setHover(rating)}
                    />
                  </div>
                  <div className={styles.eachStars}>
                    <img
                      className={
                        9 <= (hover || rating) ? styles.on : styles.off
                      }
                      src="/images/star/star_9.png"
                      // key={stars.id}
                      onClick={() => {
                        rating === 9 ? setRating(9) : setRating(9);
                      }}
                      onMouseEnter={() => setHover(9)}
                      onMouseLeave={() => setHover(rating)}
                    />
                  </div>
                  <div className={styles.eachStars}>
                    <img
                      className={
                        10 <= (hover || rating) ? styles.on : styles.off
                      }
                      src="/images/star/star_10.png"
                      // key={stars.id}
                      onClick={() => {
                        rating === 10 ? setRating(10) : setRating(10);
                      }}
                      onMouseEnter={() => setHover(10)}
                      onMouseLeave={() => setHover(rating)}
                    />
                  </div>
                </div>
              ) : (
                <div className={styles.rating}>
                  <div className={styles.eachStars}>
                    <img
                      className={
                        1 <= (hover || rating) ? styles.on : styles.off
                      }
                      src="/images/star/star_1.png"
                      // key={stars.id}
                      onClick={() => {
                        props.RequesLoginPopup();
                      }}
                      onMouseEnter={() => setHover(1)}
                      onMouseLeave={() => setHover(rating)}
                    />
                  </div>
                  <div className={styles.eachStars}>
                    <img
                      className={
                        2 <= (hover || rating) ? styles.on : styles.off
                      }
                      src="/images/star/star_2.png"
                      // key={stars.id}
                      onClick={() => {
                        props.RequesLoginPopup();
                      }}
                      onMouseEnter={() => setHover(2)}
                      onMouseLeave={() => setHover(rating)}
                    />
                  </div>
                  <div className={styles.eachStars}>
                    <img
                      className={
                        3 <= (hover || rating) ? styles.on : styles.off
                      }
                      src="/images/star/star_3.png"
                      // key={stars.id}
                      onClick={() => {
                        props.RequesLoginPopup();
                      }}
                      onMouseEnter={() => setHover(3)}
                      onMouseLeave={() => setHover(rating)}
                    />
                  </div>
                  <div className={styles.eachStars}>
                    <img
                      className={
                        4 <= (hover || rating) ? styles.on : styles.off
                      }
                      src="/images/star/star_4.png"
                      // key={stars.id}
                      onClick={() => {
                        props.RequesLoginPopup();
                      }}
                      onMouseEnter={() => setHover(4)}
                      onMouseLeave={() => setHover(rating)}
                    />
                  </div>
                  <div className={styles.eachStars}>
                    <img
                      className={
                        5 <= (hover || rating) ? styles.on : styles.off
                      }
                      src="/images/star/star_5.png"
                      // key={stars.id}
                      onClick={() => {
                        props.RequesLoginPopup();
                      }}
                      onMouseEnter={() => setHover(5)}
                      onMouseLeave={() => setHover(rating)}
                    />
                  </div>
                  <div className={styles.eachStars}>
                    <img
                      className={
                        6 <= (hover || rating) ? styles.on : styles.off
                      }
                      src="/images/star/star_6.png"
                      // key={stars.id}
                      onClick={() => {
                        props.RequesLoginPopup();
                      }}
                      onMouseEnter={() => setHover(6)}
                      onMouseLeave={() => setHover(rating)}
                    />
                  </div>
                  <div className={styles.eachStars}>
                    <img
                      className={
                        7 <= (hover || rating) ? styles.on : styles.off
                      }
                      src="/images/star/star_7.png"
                      // key={stars.id}
                      onClick={() => {
                        props.RequesLoginPopup();
                      }}
                      onMouseEnter={() => setHover(7)}
                      onMouseLeave={() => setHover(rating)}
                    />
                  </div>
                  <div className={styles.eachStars}>
                    <img
                      className={
                        8 <= (hover || rating) ? styles.on : styles.off
                      }
                      src="/images/star/star_8.png"
                      // key={stars.id}
                      onClick={() => {
                        props.RequesLoginPopup();
                      }}
                      onMouseEnter={() => setHover(8)}
                      onMouseLeave={() => setHover(rating)}
                    />
                  </div>
                  <div className={styles.eachStars}>
                    <img
                      className={
                        9 <= (hover || rating) ? styles.on : styles.off
                      }
                      src="/images/star/star_9.png"
                      // key={stars.id}
                      onClick={() => {
                        props.RequesLoginPopup();
                      }}
                      onMouseEnter={() => setHover(9)}
                      onMouseLeave={() => setHover(rating)}
                    />
                  </div>
                  <div className={styles.eachStars}>
                    <img
                      className={
                        10 <= (hover || rating) ? styles.on : styles.off
                      }
                      src="/images/star/star_10.png"
                      // key={stars.id}
                      onClick={() => {
                        props.RequesLoginPopup();
                      }}
                      onMouseEnter={() => setHover(10)}
                      onMouseLeave={() => setHover(rating)}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 별 하드코딩 끝 */}
            <div className={styles.icons}>
              {props.islogin ? (
                noWant ? (
                  <div
                    className={styles.wantToWrapper}
                    onMouseEnter={() => setWantHover(true)}
                    onMouseLeave={() => setWantHover(false)}
                    onClick={
                      want === true
                        ? () => {
                            setWant(false);
                          }
                        : () => {
                            setWant(true);
                            PostWant();
                          }
                    }
                  >
                    <FontAwesomeIcon
                      icon={want === true ? faBookmark : faPlus}
                      className={
                        want === true
                          ? wantHover === true
                            ? styles.yesPleaseHover
                            : styles.yesPlease
                          : wantHover === true
                          ? styles.notYetHover
                          : styles.notYet
                      }
                    />
                    {/* <FontAwesomeIcon icon={faBookmark} className={styles.yesPlease} /> 눌렀을때 리본으로 변경 */}
                    <p className={styles.wantTo}> 보고싶어요</p>
                  </div>
                ) : (
                  <div
                    className={styles.wantToWrapper}
                    onMouseEnter={() => setWantHover(true)}
                    onMouseLeave={() => setWantHover(false)}
                    onClick={
                      want === true
                        ? () => {
                            PatchWant();
                          }
                        : () => {
                            PatchWant();
                          }
                    }
                  >
                    <FontAwesomeIcon
                      icon={want === true ? faBookmark : faPlus}
                      className={
                        want === true
                          ? wantHover === true
                            ? styles.yesPleaseHover
                            : styles.yesPlease
                          : wantHover === true
                          ? styles.notYetHover
                          : styles.notYet
                      }
                    />
                    {/* <FontAwesomeIcon icon={faBookmark} className={styles.yesPlease} /> 눌렀을때 리본으로 변경 */}
                    <p className={styles.wantTo}> 보고싶어요</p>
                  </div>
                )
              ) : (
                <div
                  className={styles.wantToWrapper}
                  onMouseEnter={() => setWantHover(true)}
                  onMouseLeave={() => setWantHover(false)}
                  onClick={props.RequesLoginPopup}
                >
                  <FontAwesomeIcon
                    icon={want === true ? faBookmark : faPlus}
                    className={
                      want === true
                        ? wantHover === true
                          ? styles.yesPleaseHover
                          : styles.yesPlease
                        : wantHover === true
                        ? styles.notYetHover
                        : styles.notYet
                    }
                  />
                  {/* <FontAwesomeIcon icon={faBookmark} className={styles.yesPlease} /> 눌렀을때 리본으로 변경 */}
                  <p className={styles.wantTo}> 보고싶어요</p>
                </div>
              )}
              {props.islogin ? (
                <div
                  className={styles.commentWrapper}
                  onMouseEnter={() => setCommentHover(true)}
                  onMouseLeave={() => setCommentHover(false)}
                  onClick={props.RequestCommentPopup}
                >
                  <FontAwesomeIcon
                    icon={faPencil}
                    className={
                      commentHover === true ? styles.notYetHover : styles.notYet
                    }
                  />
                  <p className={styles.comment}> 코멘트</p>
                </div>
              ) : (
                <div
                  className={styles.commentWrapper}
                  onMouseEnter={() => setCommentHover(true)}
                  onMouseLeave={() => setCommentHover(false)}
                  onClick={props.RequesLoginPopup}
                >
                  <FontAwesomeIcon
                    icon={faPencil}
                    className={
                      commentHover === true ? styles.notYetHover : styles.notYet
                    }
                  />
                  <p className={styles.comment}> 코멘트</p>
                </div>
              )}
              {/* <CommentEditComponent
                open={commentEdit}
                close={commentEditClose}
              /> */}
            </div>
          </article>
        </section>
      </section>
    </div>
  );
}
export default MainTitleWithImage;
