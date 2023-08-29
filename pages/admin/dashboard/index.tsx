import React, { Fragment, useEffect, useState, ChangeEvent } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, BellIcon, XCircleIcon } from "@heroicons/react/outline";
import { GetServerSideProps } from "next";
import { saveAs } from "file-saver";
interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

const navigation: NavigationItem[] = [
  { name: "Home", href: "/", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
  { name: "Reports", href: "#", current: false },
];
import { signOut, useSession } from "next-auth/react";
import { dbConnect } from "../../../services/db.service";
import { User } from "../../../models/user";
import { useUser } from "../../../context/webContext";
import ActionsNavbar from "../../../components/common/actions-navbar";
import { useRouter } from "next/router";
import { eq } from "lodash";

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
interface Props {
  allusers: any[]; // Adjust this type as per your User model
}

const Home: React.FC<Props> = ({ allusers }) => {
  const { user, setUser } = useUser();
  const [users, setUsers] = useState(allusers);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUser = async () => {
    const token = localStorage.getItem("auth-token");
    const res = await fetch("/api/user/me", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    const data = await res.json();
    setUser(data.user);
  };
  const enableUser = async (id: string) => {
    const res = await fetch("/api/user/status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        id,
      },
    });
    const data = await res.json();
    location.reload();
  };
  const disableUser = async (id: string) => {
    const res = await fetch("/api/user/status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        id,
      },
    });
    const data = await res.json();
    location.reload();
  };
  const [query, setQuery] = useState("");
  const filterData = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e?.target?.value);
    if (e.target.value === "") {
      setUsers(allusers);
    } else {
      let filUsers = allusers.filter(
        (user) =>
          user.fullName.toLowerCase().includes(e.target.value.toLowerCase()) ||
          user.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
          user.phoneNumber.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setUsers(filUsers);
  }
  };
  const handleExport = () => {
    const csvData = users.map((user) =>
      [user.id, user.fullName, user.email, user.phoneNumber].join(",")
    );

    const csvContent = [["ID", "Name", "Email", "Contact"], ...csvData].join(
      "\n"
    );

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "users.csv");
  };
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    getUser();
    if (!localStorage.getItem("auth-token") || user?.role !== "admin")
      router.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html className="h-full bg-gray-100">
        <body className="h-full">
        ```
      */}
      {user?.username}
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-[#138bc4]">
          {({ open }) => (
            <>
              <div className="mx-auto w-full md:4/5 xl:w-3/5 px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="hidden md:block">
                      <div className=" flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            onClick={() =>
                              item.name == "Sign out"
                                ? signOut({
                                    callbackUrl: "/",
                                  })
                                : null
                            }
                            className={classNames(
                              item.current
                                ? "bg-[#69cefd] text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-base font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              className="h-8 w-8 rounded-full"
                              src={
                                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              }
                              alt=""
                            />
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
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href || ""}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-base text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XCircleIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="h-10 w-10 rounded-full"
                        src={
                          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        }
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {/* {user?.fullName} */}
                      </div>
                      <div className="text-base font-medium leading-none text-gray-400">
                        {/* {user?.email} */}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item?.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <main>
          <div className="mx-auto w-full overscroll-y-scroll xl:w-4/5 py-6 sm:px-6 lg:px-8">
            <div className="w-full bg-white rounded-lg shadow-xl p-4">
              <input
                type="text"
                name="query"
                id="query"
                onChange={filterData}
                value={query}
                className="block my-4 w-full rounded-md border-2 py-1.5 pl-4 pr-20 text-gray-900 outline-none border-gray-300 placeholder:text-gray-400 focus:border-[#138bc4]  sm:text-base sm:leading-6"
                placeholder="Search By Name"
              />
              <h2 className="text-2xl font-semibold mb-4">User List</h2>
              <table className="w-full border-collapse  border border-gray-300">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-100 text-left text-base leading-4 font-semibold text-gray-700 uppercase tracking-wider">
                      Full Name
                    </th>
                    <th className="px-6 py-3 hidden md:table-cell bg-gray-100 text-left text-base leading-4 font-semibold text-gray-700 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 bg-gray-100 text-left text-base leading-4 font-semibold text-gray-700 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 hidden md:table-cell bg-gray-100 text-left text-base leading-4 font-semibold text-gray-700 uppercase tracking-wider">
                      Registered
                    </th>
                    <th className="px-6 py-3 bg-gray-100 text-left text-base leading-4 font-semibold text-gray-700 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => {
                    if (user.role !== "admin")
                      return (
                        <tr key={user._id}>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                            {user.fullName}
                          </td>
                          <td className="px-6 py-4 hidden md:table-cell whitespace-no-wrap border-b border-gray-300">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                            {user.phoneNumber}
                          </td>
                          <td className="px-6 py-4 hidden md:table-cell whitespace-no-wrap border-b border-gray-300">
                            {user.createdAt.slice(0, 10)}
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                            {user.status ? (
                              <button
                                onClick={() => disableUser(user._id)}
                                className="font-bold bg-red-600 text-white px-4 py-2 text-base rounded-lg"
                              >
                                Disable
                              </button>
                            ) : (
                              <button
                                onClick={() => enableUser(user._id)}
                                className="font-bold bg-green-600 text-white px-4 py-2 text-base rounded-lg"
                              >
                                Enable
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                  })}
                </tbody>
              </table>
              <button
                onClick={handleExport}
                className="font-bold tracking-wider mt-4 bg-black text-white px-4 py-2 text-base rounded-lg"
              >
                Export Csv
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const users = await User.find({}).exec();
    return {
      props: {
        allusers: JSON.parse(JSON.stringify(users)),
      },
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      props: {
        allusers: [],
      },
    };
  }
};
export default Home;
