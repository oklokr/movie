"use client";

import React from "react";
import style from "./modal.module.scss";
import Button from "../button";
import { IoCloseOutline } from "react-icons/io5";

interface ModalProps {
  visible: boolean;
  title?: string;
  content: string | React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  cancelText?: string;
  confirmText?: string;
  closeColor?: "black" | "white";
  size?: "sm" | "md" | "lg";
}

const Modal: React.FC<ModalProps> = ({
  visible,
  title,
  content,
  onClose,
  onConfirm,
  cancelText,
  confirmText,
  closeColor = "black",
  size = "sm",
}) => {
  if (!visible) return null;

  // size
  // sm: "400px",
  // md: "500px",
  // lg: "600px",

  return (
    <div className={style.overlay}>
      <div className={`${style.modal} ${style[size]}`}>
        {(title || size !== "sm") && (
          <h3 className={style.title}>
            {title}
            {size !== "sm" && (
              <button className={style["close-btn"]} onClick={onClose}>
                <IoCloseOutline size={50} color={closeColor} />
              </button>
            )}
          </h3>
        )}
        <div className={style.content}>{content}</div>
        <div className={style.footer}>
          {cancelText && (
            <Button
              variant="secondary"
              width={size === "lg" ? "50%" : "auto"}
              onClick={onClose}
            >
              {cancelText}
            </Button>
          )}
          {onConfirm && confirmText && (
            <Button
              variant="primary"
              width={size === "lg" ? "50%" : "auto"}
              onClick={onConfirm}
            >
              {confirmText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
