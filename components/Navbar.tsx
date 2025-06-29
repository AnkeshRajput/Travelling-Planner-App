"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { login, logout } from "@/lib/auth-actions";
import { Session } from "next-auth";
const Navbar = ({ session }: { session: Session | null }) => {
  return (
    <nav className="bg-white shadow-md py-4 border border-gray-200">
      <div className="container mx-auto flex justify-between items-center px-6 lg:px-8">
        <Link href={"/"} className="flex items-center">
          <Image src={"/map.png"} alt="logo" width={50} height={50}></Image>
          <span className="text-2xl font-bold text-blue-900">
            Travelling Planner App
          </span>
        </Link>

        <div className="flex items-center space-x-2">
          {session ? (
            <>
              <Link
                href={"/trip"}
                className="font-bold text-2xl hover:text-sky-400"
              >
                MyTrip
              </Link>
              <Link
                href={"/globe"}
                className="font-bold text-2xl hover:text-sky-400"
              >
                Globe
              </Link>
              <button
              className="flex items-center justify-center bg-sky-500 text-white p-2 rounded-lg hover:bg-sky-800 font-bold   shadow-md gap-2 cursor-pointer"
              onClick={logout}
            >
              logOut
              
            </button>
            </>
          ) : (
            <button
              className="flex items-center justify-center bg-sky-500 text-white rounded-lg hover:bg-sky-800 font-bold p-1  shadow-md gap-2 cursor-pointer"
              onClick={login}
            >
              SignIn
              <Image
                src={"/github.png"}
                alt="logo"
                width={40}
                height={40}
              ></Image>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
