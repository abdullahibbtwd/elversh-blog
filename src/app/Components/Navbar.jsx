"use client";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { CiLogin } from "react-icons/ci";
import { useSession } from "../hook/session";
import { FaUserCircle } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";

const Menu = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Category",
    href: "",
  },
  {
    title: "About",
    href: "",
  },
  {
    title: "Contact",
    href: "",
  },
];

const Navbar = () => {
  const router = useRouter();
  const { user, loading, isSpecificUser, logout } = useSession();
  const [open, setOpen] = useState(false);
  function handleClick() {
    if (user) {
      logout();
    } else {
      router.push("/auth/login");
    }
  }
  const SideBar = () => {
    return (
      <div className="w-full h-full p-5 bg-white rounded-md  relative">
        <h1
          onClick={() => setOpen(false)}
          className="text-xl font-bold text-gray-700 cursor-pointer absolute right-5 top-4"
        >
          X
        </h1>
        
          <div className="flex flex-col gap-6 mt-10">
            {Menu.map((item) => (
              <a
                href={item.href}
                key={item.title}
                className="text-x text-gray-700 font-normal"
              >
                {item.title}
              </a>
            ))}
          </div>
          <div className="mt-6">
              <button
            className={`text-x ${
              !user ? `text-gray-700` : "text-red-700"
            } font-normal`}
            onClick={handleClick}
          >
            {!user ? "Login" : "Logout"}
          </button>
          </div>
        
       
      </div>
    );
  };

  return (
    <div className="flex justify-between p-4 overflow-hidden  border-b-1 border-gray-300 w-full relative">
      {/* <div
        className={`absolute w-full rounded-md ${
          open ? `z-1` : `-z-1`
        }  h-[200px] flex justify-center items-center`}
      > */}
      {open ? (
        <>
          <div className="fixed inset-y-0 right-0 w-[70%] h-[100%] z-50">
            <SideBar />
          </div>
        </>
      ) : (
        <></>
      )}
      {/* </div> */}
      <div className="flex justify-start gap-5 items-center">
        <h1 className="text-1xl  font-bold tracking-widest text-blue-600">
          Elversh Blog
        </h1>
        <div className="hidden lg:flex justify-between gap-3 text-[16px] items-center font-semibold">
          {Menu.map((item) => (
            <a href={item.href} key={item.title} className="">
              {item.title}
            </a>
          ))}
        </div>
      </div>
      <div className="flex gap-3 text-xs items-center font-semibold">
        {isSpecificUser && (
          <>
            <button
              onClick={() => router.push("/admin/write")}
              className="p-2 bg-blue-100 rounded-md cursor-pointer text-blue-700"
            >
              Write
            </button>

            <button
              onClick={() => router.push("/admin/post")}
              className="p-2 bg-blue-700 rounded-md cursor-pointer text-white text-center"
            >
              Post
            </button>
          </>
        )}
        <div className="hidden lg:flex">
          {user && (
            <div
              onClick={logout}
              // onClick={()=>router.push("/auth/login")}
              className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center"
            >
              <CiLogin className="text-xl text-blue-700 font-bold" />
            </div>
          )}
          {!user && (
            <div
              onClick={() => router.push("/auth/login")}
              className="w-10 h-10 rounded-full  flex items-center justify-center"
            >
              <FaUserCircle className="text-3xl text-blue-700 font-bold" />
            </div>
          )}
        </div>

        <div className="flex lg:hidden">
          <IoMenu className="text-2xl" onClick={() => setOpen(true)} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
