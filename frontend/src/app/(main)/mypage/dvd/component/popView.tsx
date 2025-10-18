"use client";

import Modal from "@/components/ui/modal";
import { useEffect, useState } from "react";
import style from "./style.module.scss";

export default function PopView({ link, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (link) {
      setVisible(true);
    }
  }, [link]);

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  return (
    <Modal
      title="영화보기"
      visible={visible}
      content={
        <>
          <div className={style["player-body"]}>
            {link ? (
              <iframe
                src={link}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={style["player-iframe"]}
              />
            ) : (
              <div className={style["empty"]}>영상 링크가 없습니다.</div>
            )}
          </div>
        </>
      }
      onClose={handleClose}
      size="xl"
    />
  );
}
