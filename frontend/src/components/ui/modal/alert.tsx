"use client";

import { useState } from "react";
import Modal from "./index";

type Callback = () => void;

let showAlertFunc: (msg: string) => void;
let showConfirmFunc: (msg: string, onOk: Callback, onCancel?: Callback) => void;

export function ModalManager() {
  // Alert 상태
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Confirm 상태
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmHasCancel, setConfirmHasCancel] = useState(true);
  const [onOk, setOnOk] = useState<Callback>(() => () => {});
  const [onCancel, setOnCancel] = useState<Callback>(() => () => {});

  // Alert 호출 함수
  showAlertFunc = (msg: string) => {
    setAlertMessage(msg);
    setAlertVisible(true);
  };

  // Confirm 호출 함수
  showConfirmFunc = (msg: string, ok: Callback, cancel?: Callback) => {
    setConfirmMessage(msg);
    setOnOk(() => ok);
    setOnCancel(() => cancel || (() => {}));
    if (cancel) {
      setConfirmHasCancel(true);
    } else {
      setConfirmHasCancel(false);
    }
    setConfirmVisible(true);
  };

  return (
    <>
      <Modal
        visible={alertVisible}
        title="알림"
        content={alertMessage}
        onClose={() => setAlertVisible(false)}
        onConfirm={() => setAlertVisible(false)}
        confirmText="확인"
      />

      <Modal
        visible={confirmVisible}
        title="알림"
        content={confirmMessage}
        onClose={() => {
          onCancel();
          setConfirmVisible(false);
        }}
        onConfirm={() => {
          onOk();
          setConfirmVisible(false);
        }}
        cancelText={confirmHasCancel ? "취소" : undefined}
        confirmText="확인"
      />
    </>
  );
}

// 전역 호출용 함수
export const fn_alert = (msg: string) => showAlertFunc(msg);
export const fn_confirm = (msg: string, onOk: Callback, onCancel?: Callback) =>
  showConfirmFunc(msg, onOk, onCancel);
