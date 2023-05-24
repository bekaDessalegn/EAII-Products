import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from 'flowbite-react';
import {HiOutlineExclamationCircle} from 'react-icons/hi'

export default function DeleteModal({ isOpen, onClose, title, children, onClick }) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 overflow-y-auto"
        onClose={onClose}
      >
        <div className="flex items-center justify-center min-h-screen">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 lg:p-8 z-20">
              <div className="flex items-start justify-end">
                <button className="bg-white rounded-md text-gray-400 hover:text-gray-500" onClick={onClose}>
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="text-center">
        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
          {children}
        </h3>
        <div className="flex justify-center gap-4">
          <Button
            color="failure"
            onClick={onClick}
          >
            Yes, I'm sure
          </Button>
          <Button
            color="gray"
            onClick={onClose}
          >
            No, cancel
          </Button>
        </div>
      </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
