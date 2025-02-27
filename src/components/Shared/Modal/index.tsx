import { type MouseEvent, type ReactNode, useEffect, useRef } from "react";

("ue client");

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  onBackdropClose?: boolean;
};

export const Modal = (props: ModalProps) => {
  const { isOpen, onClose, children, onBackdropClose } = props;

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      console.log("WHJGHDASg");
      dialog.close();
    }
  }, [isOpen]);

  const handleClose = (event?: MouseEvent<HTMLDialogElement>) => {
    if (!onBackdropClose) return;

    if (event?.target === dialogRef.current && onBackdropClose) {
      console.log("WE HERE");
      onClose();
    } else {
      console.log("Target", event?.target === dialogRef.current, event?.target);
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleClose}
      onKeyUp={(e) => e.key === "Escape" && handleClose()}
      className="h-full flex items-center bg-transparent justify-center p-0 backdrop:bg-modal-bg mx-auto"
    >
      {children}
    </dialog>
  );
};
