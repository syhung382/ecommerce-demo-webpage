import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import type { ModalViewImageProps } from "../../utils/interface";
import { currentUrlImage } from "../../api/axiosInstance";
import { IconChevronLeft, IconChevronRight, IconClose } from "../icons";

const ModalViewImage = ({
  onClose,
  currentIndex,
  list,
  onNext,
  onPrev,
}: ModalViewImageProps) => {
  return (
    <Transition show={currentIndex !== null} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="relative">
              <img
                src={`${currentUrlImage}${list[currentIndex].imageUrl}`}
                alt="Preview"
                className="max-w-[90vw] max-h-[90vh] rounded-lg"
              />

              <button
                className="absolute top-2 right-2 text-white text-xl font-bold bg-black/60 rounded-full p-1 cursor-pointer"
                onClick={onClose}
              >
                <IconClose />
              </button>

              {currentIndex > 0 && (
                <button
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-black/50 rounded-full p-1 cursor-pointer"
                  onClick={onPrev}
                >
                  <IconChevronLeft width={20} height={20} />
                </button>
              )}

              {currentIndex < list.length - 1 && (
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-black/50 rounded-full p-1 cursor-pointer"
                  onClick={onNext}
                >
                  <IconChevronRight width={20} height={20} />
                </button>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalViewImage;
