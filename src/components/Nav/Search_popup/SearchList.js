import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Search.module.scss';
import { BASE_URL } from '../../../config';

function SearchList(props) {
  const navigate = useNavigate();

  const goToSearchPage = () => {
    navigate(`http://${BASE_URL}:8000/search?${props.item}`);
    window.scrollTo(0, 0);
    window.location.reload();
  };

  return (
    <li className={styles.SearchContent} onMouseDown={goToSearchPage}>
      {props.item}
    </li>
  );
}
export default SearchList;
