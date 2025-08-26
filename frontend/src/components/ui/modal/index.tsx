"use client";

import React from "react";
import style from "./modal.module.scss";

interface ModalProps {
  visible: boolean;
  title?: string;
  content: string | React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  cancelText?: string;
  confirmText?: string;
}

const Modal: React.FC<ModalProps> = ({
  visible,
  title,
  content,
  onClose,
  onConfirm,
  cancelText,
  confirmText,
}) => {
  if (!visible) return null;

  return (
    <div className={style.overlay}>
      <div className={style.modal}>
        {title && <h3 className={style.title}>{title}</h3>}
        <div className={style.content}>{content}</div>
        <div className={style.footer}>
          {cancelText && (
            <button className={style.cancel} onClick={onClose}>
              {cancelText}
            </button>
          )}
          {onConfirm && confirmText && (
            <button className={style.confirm} onClick={onConfirm}>
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
