"use client";

import { useEffect, useRef } from "react";

import { type ErrorState, getErrorDetails } from "@/lib/errors/errorHandler";
import { CloseIcon } from "../Svg/CloseIcon";

type ErroModalProps = {
  isOpen: boolean;
  message?: string;
  error?: unknown;
  onClose: () => void;
};

export const ErrorModal = ({
  isOpen,
  message,
  error,
  onClose,
}: ErroModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Get detailed error information if an error object is provided
  const errorDetails: ErrorState = error
    ? getErrorDetails(error)
    : {
        title: "Something went wrong",
        message: message || "An error occurred while processing your request.",
        suggestion: "Please try again later.",
      };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className="h-full flex items-center bg-transparent justify-center p-0 backdrop:bg-modal-bg mx-auto"
    >
      <div className="flex flex-col justify-between w-[360px] p-6 border border-search-gray rounded-[20px] drop-shadow-[0px 2px 24px rgba(39, 43, 49, 0.20)] bg-white ">
        <div className="flex items-center justify-between">
          <div className="error-modal-title text-black font-medium text-lg">
            <span>{errorDetails.title}</span>
          </div>
          <button
            className="outline-0 cursor-pointer"
            onClick={onClose}
            type="button"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="my-3 text-sm text-gray-700">
          <p>{errorDetails.message}</p>
          {errorDetails.suggestion && (
            <p className="mt-2 text-gray-500">{errorDetails.suggestion}</p>
          )}
        </div>

        <div className="text-right mt-2">
          <button
            className="modal-button cursor-pointer text-white bg-bd-active px-6 py-[14px] rounded-[10px]"
            type="button"
            onClick={onClose}
          >
            <span>OK</span>
          </button>
        </div>
      </div>
    </dialog>
  );
};
