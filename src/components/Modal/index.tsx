import { useEffect, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";

const modalRootEl = document.getElementById("model-root") as HTMLElement;

interface ModalProps {
  children?: ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  const el = useRef(document.createElement("div"));

  useEffect(() => {
    // Use this in case CRA throws an error about react-hooks/exhaustive-deps
    const current = el.current;

    // We assume `modalRoot` exists with '!'
    modalRootEl?.appendChild(current);
    return () => {
      modalRootEl?.removeChild(current);
    };
  }, []);

  return createPortal(children, el.current);
};

export default Modal;
