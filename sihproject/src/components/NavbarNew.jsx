import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Group from "../assets/Group.png";
import user from "../assets/user.png";
import menu from "../assets/menu.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NavbarNew = () => {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex-1">
        <img
          src={Group}
          className="w-46 h-28 pl-5 pt-5 max-sm:h-20"
          alt="Logo"
        />
      </div>
      <div className="hidden lg:flex flex-1 justify-end">
        <nav className="flex gap-10 pr-20 max-md:gap-5">
          <a href="/" className="text-black hover:underline">
            HOME
          </a>

          <Menu as="div" className="relative">
            <Menu.Button className="inline-flex items-center text-black">
              Services
              <ChevronDownIcon className="ml-2 h-5 w-5" aria-hidden="true" />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute mt-2 w-[480px] max-md:w-[280px] origin-top-right bg-white divide-y divide-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/services"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block text-center py-4 h-[60px]"
                      )}
                    >
                      Services
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/services"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block text-center py-4 h-[60px]"
                      )}
                    >
                      Others
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>

          <Menu as="div" className="relative">
            <Menu.Button className="inline-flex items-center text-black">
              Resources
              <ChevronDownIcon className="ml-2 h-5 w-5" aria-hidden="true" />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute mt-2 w-[480px] max-md:w-[280px] origin-top-right bg-white divide-y divide-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/services"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block text-center py-4 h-[60px]"
                      )}
                    >
                      Dummy
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/services"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block text-center py-4 h-[60px]"
                      )}
                    >
                      Lorem
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>

          <a href="/about" className="text-black hover:underline">
            About Us
          </a>

          <Menu as="div" className="relative">
            <Menu.Button>
              <img src={user} className="h-[25px] w-[25px]" alt="User" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute mt-2 w-48 origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <div className="px-4 py-2">
                      <p>John Doe</p>
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2"
                      )}
                    >
                      Profile
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2"
                      )}
                    >
                      Parcels
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2"
                      )}
                    >
                      History
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </nav>
      </div>

      <div className="lg:hidden flex-1 flex justify-end pr-6">
        <Menu as="div" className="relative">
          <Menu.Button>
            <img src={menu} className="h-[25px] w-[25px]" alt="Menu" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute mt-2 w-48 origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <div className="px-4 py-2">
                    <p>John Doe</p>
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="/"
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2"
                    )}
                  >
                    Profile
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="/services"
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2"
                    )}
                  >
                    Services
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="/resources"
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2"
                    )}
                  >
                    Resources
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="/about"
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2"
                    )}
                  >
                    About Us
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default NavbarNew;
