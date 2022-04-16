import styles from './Gallery.module.scss';
import GalleryImages from './GalleryImages';
import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import disableScroll from 'disable-scroll';
import { BASE_URL } from '../../../config';

function Gallery(props) {
  const [images, setImages] = useState([]);
  const [scrollX, setScrollX] = useState(0);
  const [scrollEnd, setScrollEnd] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgUrls, setImgUrls] = useState([]);
  const [imgIndex, setImgIndex] = useState(0);
  const [leftshow, setLeftShow] = useState(false);
  const [rightshow, setRightShow] = useState(false);
  const Section = useRef();

  const setCursor = event => {
    setScrollX(event.target.scrollLeft);
    setScrollEnd(event.target.scrollWidth - event.target.clientWidth);
  };

  const moveLeft = scrollOffset => {
    Section.current.scrollLeft += scrollOffset;
  };

  const modal = imgUrl => {
    if (imgUrl) {
      document.body.style.overflow = 'hidden';
      setImgUrls(imgUrl[0]);
      setIsModalOpen(true);
      setImgIndex(imgUrl[1]);
    }
  };
  let totalimageindex = imgIndex;
  const modalFalse = e => {
    document.body.style.overflow = 'unset';
    setIsModalOpen(false);
  };
  const notClick = event => {
    event.stopPropagation();
  };
  const LeftPage = event => {
    event.stopPropagation();
    setImgIndex(imgIndex - 1);
    totalimageindex -= 1;
    setImgUrls('http://' + images[totalimageindex].images_url);
  };
  const RightPage = event => {
    event.stopPropagation();
    setImgIndex(imgIndex + 1);
    totalimageindex = totalimageindex + 1;
    setImgUrls('http://' + images[totalimageindex].images_url);
  };
  useEffect(() => {
    totalimageindex === 0 ? setLeftShow(true) : setLeftShow(false);
    totalimageindex === images.length - 1
      ? setRightShow(true)
      : setRightShow(false);
  }, [imgIndex]);
  useEffect(() => {
    fetch(`http://${BASE_URL}:8000/movie/images/${props.movieId}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setImages(data.movieImages);
      });
  }, [props.movieId]);

  return (
    <div className={styles.GalleryTotal}>
      <div className={styles.Gallery}>
        <div className={styles.GalleryTitle}>갤러리</div>
        <div className={styles.ImageSection} onScroll={setCursor} ref={Section}>
          {images.map((image, index) => {
            return (
              <GalleryImages
                key={index}
                index={index}
                img={'http://' + image.images_url}
                name={image.name}
                modal={modal}
              />
            );
          })}
        </div>
        {scrollX === 0 ? null : (
          <FontAwesomeIcon
            icon={faCircleChevronLeft}
            className={styles.ChevronLeft}
            onClick={() => moveLeft(-345)}
          />
        )}
        {scrollX >= scrollEnd ? null : (
          <FontAwesomeIcon
            icon={faCircleChevronRight}
            className={styles.ChevronRight}
            onClick={() => moveLeft(345)}
          />
        )}
      </div>
      {isModalOpen && (
        <div className={styles.modalSection} onClick={modalFalse}>
          <img
            src={imgUrls}
            alt="Gallery"
            className={styles.bigImage}
            onClick={notClick}
          />
          <FontAwesomeIcon
            icon={faCircleChevronLeft}
            className={styles.modalChevronLeft}
            onClick={LeftPage}
            style={{ display: leftshow ? 'none' : 'block' }}
          />
          <FontAwesomeIcon
            icon={faCircleChevronRight}
            className={styles.modalChevronRight}
            onClick={RightPage}
            style={{ display: rightshow ? 'none' : 'block' }}
          />
        </div>
      )}
    </div>
  );
}
export default Gallery;
