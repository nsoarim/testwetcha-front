import styles from './MainTitleWithImage.module.scss';
import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

function CommentDeleteModal(props) {
  const { showDelete, closeDelete } = props;

  return (
    <div
      className={showDelete ? styles.modalWrapper : styles.modalWrapperClosed}
      onClick={closeDelete}
    >
      <div className={styles.deleteModal}>
        <div
          className={styles.confirmBlock}
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <p className={styles.alert}>알림</p>
          <p
            className={styles.confirmation}
            onClick={e => {
              e.stopPropagation();
            }}
          >
            코멘트를 삭제하시겠어요?
          </p>
        </div>
        <div className={styles.confirmationButton}>
          <div className={styles.cancel} onClick={!showDelete}>
            취소
          </div>
          <div
            className={styles.deleteConfirm}
            onClick={e => {
              e.stopPropagation();
            }}
            // onClick={코멘트 삭제}
          >
            확인
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentDeleteModal;
