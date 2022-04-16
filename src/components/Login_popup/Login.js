import styles from './Login.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState, useRef } from 'react';
import { BASE_URL } from '../../config';

const Login = props => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [cursor, setCursor] = useState('auto');
  const [idBoxColor, setIdBoxColor] = useState('#f5f5f5');
  const [pwBoxColor, setPWBoxColor] = useState('#f5f5f5');
  const { open, close, openSignUp } = props;

  const handleIdInput = e => {
    setId(e.target.value);
  };

  const handlePwInput = e => {
    setPw(e.target.value);
  };

  // 엔터로 화면이동
  const keyInput = e => {
    if (e.key === 'Enter' && isActive === false) {
      handleLogin();
    }
  };

  useEffect(() => {
    isPassedLogin();
  }, [id, pw]);

  const isPassedLogin = () => (
    checkEmail(id) && checkPW(pw)
      ? (setIsActive(false), setCursor('pointer'))
      : (setIsActive(true), setCursor('auto')),
    checkEmail(id) || id.length === 0
      ? setIdBoxColor('#F5F5F5')
      : setIdBoxColor('#FEF0EF'),
    checkPW(pw) || pw.length === 0
      ? setPWBoxColor('#F5F5F5')
      : setPWBoxColor('#FEF0EF')
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

  const idInputBox = useRef();
  const pwInputBox = useRef();
  //inputbox 초기화하고 마우스커서 idbox로 옮기기
  const clearInput = () => {
    idInputBox.current.value = '';
    pwInputBox.current.value = '';
    setIsActive(true);
    idInputBox.current.focus();
  };

  // 서버 연결 로그인
  const handleLogin = () => {
    fetch(`http://${BASE_URL}:8000/user/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: id,
        password: pw,
      }),
    })
      .then(res => res.json())
      .then(result => {
        // console.log(result);
        //통신오류
        if (result.message === 'INVALID_USER') {
          alert(' 아이디 또는 비밀번호를 잘못 입력했습니다.');
          clearInput();
        }
        // 성공시 url 이동
        else if (result.message === 'Sign in succesful') {
          alert('로그인 성공!');
          close();
          window.location.reload();
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
        setIdBoxColor('#f5f5f5');
        setPWBoxColor('#f5f5f5');
      }}
    >
      {open ? (
        <section
          className={styles.modal__section}
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <div className={styles.login__logo}>
            <img
              alt="logo"
              src="/./images/wetcha.png"
              className={styles.login__logo__img}
            />
          </div>
          <div className={styles.login__title}>로그인</div>
          <form className={styles.login__form}>
            <input
              className={styles.login__form__input}
              type="id"
              id="idInput"
              placeholder="이메일"
              onKeyPress={keyInput}
              onChange={handleIdInput}
              ref={idInputBox}
              autoComplete="off"
              style={{ backgroundColor: idBoxColor }}
            />
            <input
              className={styles.login__form__input}
              id="pwInput"
              type="password"
              placeholder="비밀번호"
              onKeyPress={keyInput}
              onChange={handlePwInput}
              ref={pwInputBox}
              style={{ backgroundColor: pwBoxColor }}
            />
            <button
              className={styles.login__form__btn}
              style={{ cursor: cursor }}
              disabled={isActive}
              onClick={handleLogin}
              type="button"
            >
              로그인
            </button>
          </form>
          <div className={styles.signUp}>
            <p>계정이 없으신가요?</p>
            <button
              onClick={() => {
                close();
                openSignUp();
              }}
            >
              회원가입
            </button>
          </div>
          <div className={styles.login__or}>OR</div>
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

export default Login;
