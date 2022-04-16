import styles from './CommentCard.module.scss';
import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../../config';

const CommentCard = props => {
  useEffect(() => {
    getLike();
    if (props.islogin) {
      checkLike();
    }
  }, []);

  const [commentLikeCount, setCommentLikeCount] = useState(0);
  const [commentLike, setCommentLike] = useState(false);
  useEffect(() => {}, [commentLike]);
  let shortCommentContent = '';

  let likeCount = props.likeCount;

  if (props.likeCount == null) {
    likeCount = 0;
  }

  function postLike() {
    fetch(`http://${BASE_URL}:8000/comment/like`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        commentId: props.id,
      }),
    })
      .then(res => res.json())
      .then(result => {
        checkLike();
        setCommentLikeCount(commentLikeCount + 1);
      });
  }

  function getLike() {
    fetch(`http://${BASE_URL}:8000/comment/like?commentId=${props.id}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data != undefined) {
          if (data.CommentLikeResult.length > 0) {
            setCommentLikeCount(data.CommentLikeResult[0].count);
          }
        }
      });
  }

  function checkLike() {
    fetch(`http://${BASE_URL}:8000/comment/like/check?commentId=${props.id}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.CommentLike.length == 0) {
          setCommentLike(false);
        } else {
          setCommentLike(true);
        }
      });
  }

  function deleteLike() {
    fetch(`http://${BASE_URL}:8000/comment/like?commentId=${props.id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        checkLike();
        setCommentLikeCount(commentLikeCount - 1);
      });
  }

  function cutCommentContent(inputText) {
    if (inputText.length > 100) {
      for (let i = 0; i < 125; i++) {
        shortCommentContent += inputText[i];
      }
      shortCommentContent += '...';
    } else {
      shortCommentContent = inputText;
    }
  }

  cutCommentContent(props.commentContent);

  return (
    <div className={styles.CommentCardWrapper}>
      <div className={styles.NameAndWantsWrapper}>
        <div className={styles.Name}>{props.userName}</div>
        {props.want ? (
          <button className={styles.Want}>보고싶어요</button>
        ) : null}
      </div>
      <div className={styles.Line} />
      <div className={styles.CommentContentWrapper}>{shortCommentContent}</div>
      <div className={styles.Line} />
      <div className={styles.CommentLikeWrapper}>
        <div className={styles.LikeCount}>{commentLikeCount}</div>
      </div>
      <div className={styles.Line} />
      <div className={styles.CommentLikeWrapper}>
        {props.islogin ? (
          commentLike ? (
            <button
              onClick={() => {
                deleteLike();
              }}
              className={`${styles.LikeButton} ${styles.LikeButton_on}`}
            >
              좋아요
            </button>
          ) : (
            <button
              onClick={() => {
                postLike();
              }}
              className={styles.LikeButton}
            >
              좋아요
            </button>
          )
        ) : (
          <button
            onClick={() => {
              props.LoginPopUpRequest();
            }}
            className={styles.LikeButton}
          >
            좋아요
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
