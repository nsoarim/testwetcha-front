import { useState } from 'react';
import styles from './MainTitleWithImage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import CommentDeleteModal from './CommentDeleteModal';

function CommentEditComponent(props) {
  const { open, close } = props;
  const [deleteModal, setDeleteModal] = useState(false);
  const openModal = () => {
    setDeleteModal(true);
  };
  const closeModal = () => {
    console.log(deleteModal);
    setDeleteModal(false);
  };

  return (
    <div className={open ? styles.popUpOpen : styles.popUpOpenInvisible}>
      <div className={styles.buttonWrapper}>
        <div
          className={styles.commentEdit}
          // onClick={코멘트창}
        >
          <FontAwesomeIcon icon={faPencil} className={styles.modalPencil} />
          코멘트 수정
        </div>
        <div
          className={styles.commentDelete}
          onClick={deleteModal ? closeModal : openModal}
        >
          <FontAwesomeIcon icon={faTrash} className={styles.trash} /> 코멘트
          삭제
        </div>
        <CommentDeleteModal showDelete={deleteModal} closeDelete={closeModal} />
      </div>
    </div>
  );
}

export default CommentEditComponent;
