import styles from './SignUp.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState, useRef } from 'react';
import { BASE_URL } from '../../config';

const SignUp = props => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [name, setName] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [cursor, setCursor] = useState('auto');
  const [nameBoxColor, setNameBoxColor] = useState('#f5f5f5');
  const [idBoxColor, setIdBoxColor] = useState('#f5f5f5');
  const [pwBoxColor, setPwBoxColor] = useState('#f5f5f5');
  const { open, close, openLogin } = props;

  const handleNameInput = e => {
    setName(e.target.value);
  };
  const handleIdInput = e => {
    setId(e.target.value);
  };
  const handlePwInput = e => {
    setPw(e.target.value);
  };

  const keyInput = e => {
    if (e.key === 'Enter' && isActive === false) {
      handleSignup();
    }
  };

  useEffect(() => {
    isPassedSignUp();
  }, [name, id, pw]);

  const isPassedSignUp = () => (
    checkEmail(id) && checkPW(pw)
      ? (setIsActive(false), setCursor('pointer'))
      : (setIsActive(true), setCursor('auto')),
    name.length > 1 || name.length === 0
      ? setNameBoxColor('#f5f5f5')
      : setNameBoxColor('#FEF0EF'),
    checkEmail(id) || id.length === 0
      ? setIdBoxColor('#f5f5f5')
      : setIdBoxColor('#FEF0EF'),
    checkPW(pw) || pw.length === 0
      ? setPwBoxColor('#f5f5f5')
      : setPwBoxColor('#FEF0EF')
  );

  // 이메일 체크
  function checkEmail(str) {
    const reg_email =
      /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if (!reg_email.test(str)) {
      return false;
    } else {
      return true;
    }
  }

  // 비밀번호 체크
  function checkPW(str) {
    const reg_pw =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (!reg_pw.test(str)) {
      return false;
    } else {
      return true;
    }
  }
  const nameInputBox = useRef();
  const idInputBox = useRef();
  const pwInputBox = useRef();

  //inputbox 초기화하고 마우스커서 idbox로 옮기기
  function clearInput() {
    nameInputBox.current.value = '';
    idInputBox.current.value = '';
    pwInputBox.current.value = '';
    setIsActive(true);
    // setidBoxColor('#e3e3e3');
    // setpwdBoxColor('#e3e3e3');
    nameInputBox.current.focus();
  }

  // 서버 연결 회원가입
  const handleSignup = () => {
    fetch(`http://${BASE_URL}:8000/user`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: id,
        password: pw,
      }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.message === 'EXISTING_USER') {
          alert('이미 존재하는 아이디 입니다.');
          clearInput();
        } else {
          alert('축하합니다! 회원가입 성공!');
          close();
        }
      });
  };

  return (
    <div
      className={
        open ? `${styles.openModal} ${styles.modal}` : `${styles.modal}`
      }
      onClick={() => {
        close();
        setNameBoxColor('#f5f5f5');
        setIdBoxColor('#f5f5f5');
        setPwBoxColor('#f5f5f5');
      }}
    >
      {open ? (
        <section
          className={styles.modal__section}
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <div className={styles.signUp__logo}>
            <img
              alt="logo"
              src="/./images/wetcha.png"
              className={styles.signUp__logo__img}
            />
          </div>
          <div className={styles.signUp__title}>회원가입</div>
          <form className={styles.signUp__form}>
            <input
              className={styles.signUp__form__input}
              type="text"
              // id="idInput"
              placeholder="이름"
              onKeyPress={keyInput}
              onChange={handleNameInput}
              required={true}
              ref={nameInputBox}
              autoComplete="off"
              style={{ backgroundColor: nameBoxColor }}
            />
            <input
              className={styles.signUp__form__input}
              type="id"
              id="idInput"
              placeholder="이메일"
              onKeyDown={keyInput}
              onChange={handleIdInput}
              ref={idInputBox}
              autoComplete="off"
              style={{ backgroundColor: idBoxColor }}
            />
            <input
              className={styles.signUp__form__input}
              id="pwInput"
              type="password"
              placeholder="비밀번호"
              onKeyDown={keyInput}
              onChange={handlePwInput}
              ref={pwInputBox}
              style={{ backgroundColor: pwBoxColor }}
            />
            <button
              style={{ cursor: cursor }}
              className={styles.signUp__form__btn}
              disabled={isActive}
              onClick={handleSignup}
              type="button"
            >
              회원가입
            </button>
          </form>
          <div className={styles.login}>
            <p>이미 가입하셨나요?</p>
            <button
              onClick={() => {
                close();
                openLogin();
              }}
            >
              로그인
            </button>
          </div>
          <div className={styles.signUp__or}>OR</div>
          <button className={styles.login__facebook}>
            <FontAwesomeIcon
              icon={faFacebook}
              className={styles.login__facebook__logo}
            />
            Facebook으로 로그인
          </button>
        </section>
      ) : null}
    </div>
  );
};

export default SignUp;
