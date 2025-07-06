import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import type { ConfirmDialogProps } from "../../utils/interface";
import { LoadingSpinner } from "../loading";

const ConfirmDialog = ({
  isOpen,
  title = "Xác nhận xóa",
  description = "Bạn có chắc muốn xóa mục này? Hành động này không thể hoàn tác!",
  onConfirm,
  onCancel,
  buttonConfirmTitle,
  buttonCancelTitle = "Hủy",
  typeButton,
  isLoading,
}: ConfirmDialogProps) => {
  let type = "";
  switch (typeButton) {
    case "info":
      type = "bg-blue-600 hover:bg-blue-700";
      break;
    case "success":
      type = " bg-green-600 hover:bg-green-700";
      break;

    default:
      type = "bg-red-600 hover:bg-red-700";
      break;
  }

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onCancel}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="scale-95 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="ease-in duration-150"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-95 opacity-0"
          >
            <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-xl max-w-sm w-full p-5 shadow-xl">
              <Dialog.Title className="text-lg font-semibold text-gray-800 dark:text-white">
                {title}
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {description}
              </Dialog.Description>

              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={onCancel}
                  className="px-3 py-1.5 text-sm rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 cursor-pointer"
                >
                  {buttonCancelTitle}
                </button>
                {isLoading === true ? (
                  <button
                    disabled
                    className={`px-3 py-1.5 text-sm text-gray-800 rounded-md cursor-pointer bg-gray-400`}
                  >
                    <LoadingSpinner size={20} borderSize={6} />
                  </button>
                ) : (
                  <button
                    onClick={onConfirm}
                    className={`px-3 py-1.5 text-sm text-white rounded-md cursor-pointer ${type}`}
                  >
                    {buttonConfirmTitle}
                  </button>
                )}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ConfirmDialog;
