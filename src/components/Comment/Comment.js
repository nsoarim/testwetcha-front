import React, { useState, useEffect } from 'react';
import styles from './Comment.module.scss';
import CommentCard from './CommentCard/CommentCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from '../../config';

const Comment = props => {
  const [commentList, setCommentList] = useState([]);
  useEffect(() => {
    fetch(`http://${BASE_URL}:8000/comment?movieId=${props.movieId}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setCommentList(data.CommentData);
      });
  }, [props.movieId]);

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
    if (SliderWrapperRef.current.scrollLeft == 0) {
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
  return (
    <div className={styles.Carousel5Wrapper}>
      <div className={styles.DivForButton}>
        <button
          className={`${styles.Button} ${styles[leftButtonOn]} ${styles.ul__prevBtn}`}
          onClick={MoveLeft}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button
          className={`${styles.Button} ${styles[rightButtonOn]} ${styles.ul__nextBtn}`}
          onClick={MoveRight}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <div className={styles.Title}>코멘트</div>
      <div
        className={styles.SliderWrapper}
        ref={SliderWrapperRef}
        onScroll={checkScrollPos}
      >
        <div className={styles.space}></div>

        {commentList.map(comment => {
          return (
            <CommentCard
              key={comment.comment_id}
              LoginPopUpRequest={props.LoginPopUpRequest}
              islogin={props.islogin}
              userName={comment.name}
              id={comment.comment_id}
              likeCount={comment.count}
              commentContent={comment.comment}
              want={comment.want}
            />
          );
        })}

        <div className={styles.space}></div>
      </div>
    </div>
  );
};

export default Comment;
