"use client";

import { useState } from "react";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

const DeleteBlock = ({ id }) => {
  const [modal, setModal] = useState({ isOpen: false, message: "", onConfirm: null });
  const router = useRouter();

  const deleteTicket = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Tickets/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete the ticket");
      }

      router.refresh();
    } catch (error) {
      setModal({
        isOpen: true,
        message: "An error occurred while deleting the ticket. Please try again.",
        onConfirm: () => setModal({ isOpen: false, message: "", onConfirm: null }),
      });
    }
  };

  const confirmDelete = () => {
    setModal({
      isOpen: true,
      message: "Are you sure you want to delete this ticket? This action cannot be undone.",
      onConfirm: () => {
        setModal({ isOpen: false, message: "", onConfirm: null });
        deleteTicket();
      },
    });
  };

  return (
    <div>
      <FontAwesomeIcon
        icon={faX}
        role="button"
        aria-label="Delete ticket"
        className="icon text-red-500 hover:cursor-pointer hover:text-red-300"
        onClick={confirmDelete}
      />

      {modal.isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-gray-800 text-white p-6 rounded-xl shadow-lg max-w-sm w-full">
            <p className="mb-6 text-sm text-gray-300">{modal.message}</p>
            <div className="flex justify-around">
              {modal.onConfirm && (
                <button
                  className="btn bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                  onClick={modal.onConfirm}
                >
                  Confirm
                </button>
              )}
              <button
                className="btn bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded"
                onClick={() => setModal({ isOpen: false, message: "", onConfirm: null })}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteBlock;
