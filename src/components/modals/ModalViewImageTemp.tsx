import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import type { ModalViewImageProps } from "../../utils/interface";
import { IconChevronLeft, IconChevronRight, IconClose } from "../icons";

const ModalViewImageTemp = ({
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
            <Dialog.Panel
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[90vw] h-full max-h-[90vh] flex items-center justify-center"
            >
              <img
                src={list[currentIndex].imageUrl}
                alt="Preview"
                className="max-w-full max-h-full rounded-lg object-contain"
              />

              {/* Nút đóng - luôn hiển thị */}
              <button
                className="absolute top-4 right-4 md:top-6 md:right-6 text-white text-xl font-bold bg-black/60 hover:bg-black/80 rounded-full p-2 cursor-pointer transition-colors"
                onClick={onClose}
              >
                <IconClose className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              {/* Nút prev - chỉ hiển thị khi có ảnh trước đó */}
              {currentIndex > 0 && (
                <button
                  className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full p-3 cursor-pointer transition-colors"
                  onClick={onPrev}
                >
                  <IconChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              )}

              {/* Nút next - chỉ hiển thị khi có ảnh tiếp theo */}
              {currentIndex < list.length - 1 && (
                <button
                  className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full p-3 cursor-pointer transition-colors"
                  onClick={onNext}
                >
                  <IconChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalViewImageTemp;
