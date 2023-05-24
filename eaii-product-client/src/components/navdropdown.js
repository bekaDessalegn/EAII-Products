import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { AiOutlineDown } from 'react-icons/ai'

const categories = ["Diabetes", "Breast Cancer", "Skin", "TelecomHealth"]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

export default function NavDropDown() {
  return (
    <Menu as="div" className="relative text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center items-center gap-x-1.5 bg-white px-3 py-2 text-sm font-semibold text-secondaryColor hover:bg-gray-50">
          Health
          <AiOutlineDown className="-mr-1 h-4 w-4 text-gray-400" aria-hidden="true"  />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-50 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {categories.map((category, index) => (
              <div key={index}>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  {category}
                </a>
              )}
            </Menu.Item>
            </div>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}