"use client";

import { useState } from "react";

import { CloseIcon } from "../Icons/CloseIcon";
import { Modal } from "../Shared/Modal";

export const ErrorModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="flex flex-col justify-between w-[360px] h-40 p-6 border border-liner-gray rounded-[20px] drop-shadow-[0px 2px 24px rgba(39, 43, 49, 0.20)] bg-white ">
            <div className="flex items-center justify-between">
              <div className="error-modal-title text-black">
                <span>Something went wrong</span>
              </div>
              <button
                className="outline-0 cursor-pointer"
                onClick={() => setIsModalOpen(false)}
                type="button"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="text-right">
              <button
                className="modal-button cursor-pointer text-white bg-bd-active px-6 py-[14px] rounded-[10px]"
                type="button"
                onClick={() => setIsModalOpen(false)}
              >
                <span>OK</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
