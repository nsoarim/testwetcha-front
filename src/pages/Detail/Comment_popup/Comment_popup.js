import styles from './Comment_popup.module.scss';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentSlash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
// import { text } from '@fortawesome/fontawesome-svg-core';
import { BASE_URL } from '../../../config';

const Comment_popup = props => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [saveBtnActive, setSaveBtnActive] = useState(false);
  const [isCommented, setIsCommented] = useState(false);
  const [prevText, setPrevText] = useState('');
  const [text, setText] = useState('');
  const [textareaValue, setTextAreaValue] = useState('');
  const [textValueLength, setTextValueLength] = useState(0);
  const [num, setNum] = useState(0);
  const textArea = useRef();
  const saveBtn = useRef();
  // const { open, close } = props;

  useEffect(() => {
    if (props.popupRequest > 0) {
      setPopupOpen(true);
    }
  }, [props.popupRequest]);
  // 글자수 세기
  useEffect(() => {
    setNum(textValueLength);
  }, [textValueLength]);

  const handleLength = e => {
    if (num > 200) {
      e.target.value = e.target.value.substring(0, 200);
    }
  };

  // textArea 바깥 눌러도 textArea 선택되도록
  const handletextAreaOnFocus = () => {
    textArea.current.focus();
  };

  const handleSaveBtn = () => {
    textArea.current.value.length > 0
      ? setSaveBtnActive(true)
      : setSaveBtnActive(false);
  };

  useEffect(() => {
    setTextAreaValue(textareaValue);
    // console.log('textAreaValue : ', textareaValue);
  }, [textareaValue]);

  //comment 가져오기
  useEffect(() => {
    fetch(`http://${BASE_URL}:8000/comment/content?movieId=${props.movieId}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(result => {
        if (result.CommentResult.length !== 0) {
          setIsCommented(true);
          setText(result.CommentResult[0].comment);
        } else {
          setIsCommented(false);
        }
      });
  }, []);

  useEffect(() => {});

  useEffect(() => {
    setPrevText(text);
    // console.log('text :', text);
    // textArea.current.value = text;
  }, [text]);

  useEffect(() => {
    // console.log('prevText', prevText);
    textArea.current.value = prevText;
  }, [prevText]);

  //comment 추가 (검증 완)
  const commentAdd = () => {
    fetch(`http://${BASE_URL}:8000/comment/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comment: textareaValue,
        movieId: props.movieId,
      }),
    })
      .then(res => res.json())
      .then(result => {
        // comment 등록 성공
        if (result.SUCCESS === 'COMMENT_INSERT') {
          alert('등록 성공!');
          window.location.reload();
          // close Comment popup
        }
      });
    setPopupOpen(false);
  };

  // comment 수정 (검증 완)

  const commentModify = () => {
    fetch(`http://${BASE_URL}:8000/comment/`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        comment: textareaValue,
        movieId: props.movieId,
      }),
    })
      .then(res => res.json())
      .then(result => {
        if (result.SUCCESS === 'COMMENT_MODIFY') {
          alert('수정 완료!');
        }
      });
    setPopupOpen(false);
    window.location.reload();
  };

  return (
    <>
      {/* {popupOpen ? ( */}
      <div className="Comment_popup">
        <div
          className={
            popupOpen
              ? `${styles.modal} ${styles.openModal}`
              : `${styles.modal}`
          }
          // onclick={close}
        >
          <section className={styles.comment}>
            <header className={styles.header}>
              <span className={styles.header__movieTitle}>
                {props.movieName}
              </span>
              <div
                className={styles.header__closeBtn}
                onClick={() => setPopupOpen(false)}
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  className={styles.header__closeBtn__icon}
                />
              </div>
            </header>
            <main className={styles.main} onClick={handletextAreaOnFocus}>
              <textarea
                className={styles.textarea}
                placeholder="이 작품에 대한 생각을 자유롭게 표현해주세요."
                ref={textArea}
                onKeyUp={e => {
                  setTextValueLength(e.target.value.length);
                  setTextAreaValue(e.target.value);
                  handleSaveBtn();
                }}
                onChange={handleLength}
              ></textarea>
            </main>
            <footer className={styles.footer}>
              <div>
                <FontAwesomeIcon
                  icon={faTwitter}
                  className={styles.footer__icons}
                />
                |
                <FontAwesomeIcon
                  icon={faCommentSlash}
                  className={styles.footer__icons}
                />
              </div>
              <div className={styles.footer__right}>
                <div className={styles.footer__right__num}>{`${num}/200`}</div>
                <button
                  className={styles.footer__right__saveBtn}
                  ref={saveBtn}
                  disabled={!saveBtnActive ? true : false}
                  onClick={
                    isCommented ? commentModify : commentAdd
                    // setPopupOpen(false);
                  }
                >
                  {isCommented ? '수정' : '저장'}
                </button>
              </div>
            </footer>
          </section>
        </div>
      </div>
      {/* ) : null} */}
    </>
  );
};

export default Comment_popup;
