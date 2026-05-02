import React from "react";

const ConfirmModal = ({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  confirmText = "Yes, I'm sure",
  cancelText = "No, cancel",
  loading = false,
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      aria-modal="true"
      role="dialog"
    >
      <div className="relative w-full max-w-md max-h-full p-4">
        <div className="relative p-4 border shadow-sm bg-neutral-primary-soft border-default rounded-base md:p-6">
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 end-2.5 text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 inline-flex justify-center items-center"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>

          {/* Content */}
          <div className="p-4 text-center md:p-5">
            <svg
              className="w-12 h-12 mx-auto mb-4 text-fg-disabled"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <h3 className="mb-6 text-body">{title}</h3>

            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={onConfirm}
                disabled={loading}
                className="text-white bg-danger box-border border border-transparent hover:bg-danger-strong focus:ring-4 focus:ring-danger-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none disabled:opacity-60"
              >
                {loading ? "Processing..." : confirmText}
              </button>

              <button
                onClick={onClose}
                disabled={loading}
                className="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
              >
                {cancelText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
