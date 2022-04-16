import React, { useState, useEffect } from 'react';
import styles from './Nav.module.scss';
import Login from '../Login_popup/Login';
import SignUp from '../Signup_popUp/SignUp';
import disableScroll from 'disable-scroll';
import SearchList from './Search_popup/SearchList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config';

let arrayKey = 0;

function Nav(props) {
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState('');
  const [loginOpen, setLoginOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [SearchOpen, setSearchOpen] = useState(false);
  const [searchWord, setsearchWord] = useState(
    JSON.parse(localStorage.getItem('item')) || []
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (props.loginRequest > 0) {
      openLogin();
    }
  }, [props.loginRequest]);

  const openLogin = () => {
    setLoginOpen(true);
    disableScroll.on();
  };

  const closeLogin = () => {
    setLoginOpen(false);
    disableScroll.off();
  };

  const openSignUp = () => {
    setSignUpOpen(true);
    disableScroll.on();
  };

  const closeSignUp = () => {
    setSignUpOpen(false);
    disableScroll.off();
  };

  const SearchOpenModal = () => {
    setSearchOpen(true);
  };

  const SearchCloseModal = () => {
    setSearchOpen(false);
  };

  const pressEnter = e => {
    if (e.key === 'Enter') {
      if (!e.target.value == '') {
        addSearchWord(e.target.value);
        e.target.value = '';
      }
    }
  };

  const addSearchWord = item => {
    const items = {
      id: arrayKey,
      item: item,
    };
    arrayKey += 1;
    let newSearchword = searchWord;
    newSearchword.unshift(items);
    setsearchWord(newSearchword);
    window.localStorage.setItem('item', JSON.stringify(searchWord));
    goToSearchPage(items.item);
  };

  const goToSearchPage = item => {
    navigate(`/search?${item}`);
    window.location.reload();
  };

  const SearchDelete = e => {
    setsearchWord([]);
  };

  useEffect(() => {
    window.localStorage.setItem('item', JSON.stringify(searchWord));
  }, [searchWord]);

  // 로그인 검증
  useEffect(() => {
    fetch(`http://${BASE_URL}:8000/user/verification`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(result => {
        if (result.message === 'NOW_LOGIN') {
          setIsLogin(true);
          setUserName(result.user_name);
          // console.log('로그인중');
          // console.log(isLogin);
          // console.log(userName);
        } else if (result.message === 'NOW_LOGOUT') {
          setIsLogin(false);
          setUserName('');
        }
      });
  }, []);

  return (
    <div className="Nav">
      <header className={styles.navBar_container}>
        <nav className={styles.navBar}>
          {' '}
          <Link to="/" onUpdate={() => window.scrollTo(0, 0)}>
            <button className={styles.logoWrapper}>
              <img
                alt="로고"
                src="/./images/wetcha.png"
                className={styles.logo}
              />
            </button>
          </Link>
          <div className={`${styles.component_wrapper} component_wrapper`}>
            <div className={styles.searchBar_wrapper}>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className={styles.searchBar__icon}
              />
              <input
                className={styles.navBar__searchBar}
                placeholder="콘텐츠, 인물, 컬렉션, 유저를 검색해보세요."
                onFocus={SearchOpenModal}
                onBlur={SearchCloseModal}
                onKeyUp={pressEnter}
              />
              {SearchOpen && (
                <div className={styles.Search}>
                  <ul className={styles.SearchHeader}>
                    <li className={styles.SearchTitle}>최근 검색어</li>
                    <li
                      className={styles.SearchRemove}
                      onMouseDown={SearchDelete}
                    >
                      모두 삭제
                    </li>
                  </ul>
                  <ul>
                    {searchWord == '' && (
                      <li className={styles.SearchContent}>
                        검색어를 입력해 주세요.
                      </li>
                    )}
                    {searchWord.map((comment, k) => {
                      return <SearchList key={k} item={comment.item} />;
                    })}
                  </ul>
                </div>
              )}
            </div>

            {isLogin ? (
              <div className={styles.user_welcome}>
                <p className={styles.user_welcome_name}>{userName}</p>
                <p className={styles.user_welcome_sayHi}>님,</p>
                <p className={styles.user_welcome_sayHi}>반갑습니다.</p>
              </div>
            ) : (
              <div className={styles.button_wrapper}>
                <button
                  className={styles.navBar__signInBtn}
                  onClick={openLogin}
                >
                  로그인
                </button>
                <button
                  className={styles.navBar__signUpBtn}
                  onClick={openSignUp}
                >
                  회원가입
                </button>
              </div>
            )}
          </div>
        </nav>
        <Login open={loginOpen} close={closeLogin} openSignUp={openSignUp} />
        <SignUp open={signUpOpen} close={closeSignUp} openLogin={openLogin} />
      </header>
    </div>
  );
}
export default Nav;
