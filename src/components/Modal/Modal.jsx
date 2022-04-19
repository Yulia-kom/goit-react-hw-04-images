import { useEffect } from "react";
import style from "./Modal.module.css";

export default function Modal({ modalImg, handleTogleModal, tags }) {
  useEffect(() => {
    window.addEventListener("keydown", onCloseModalByEsc);

    return () => {
      window.removeEventListener("keydown", onCloseModalByEsc);
    };
  });

  const onCloseModalByEsc = (event) => {
    if (event.keyCode === 27) {
      handleTogleModal("");
    }
  };

  return (
    <div
      className={style.Overlay}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          handleTogleModal("");
        }
      }}
    >
      <div className={style.Modal}>
        <img src={modalImg} alt={tags} />
      </div>
    </div>
  );
}
