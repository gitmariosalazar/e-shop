"use client";

import React, { useCallback, useState } from "react";
import Avatar from "../Avatar";
import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import {
  Login,
  Logout,
  Settings,
  Dashboard,
  HowToReg,
  ShoppingCartSharp,
} from "@mui/icons-material";
import BackDrop from "./BackDrop";
import { SafeUser } from "@/types";
import "../../../css/usermenu.css";
import Image from "next/image";

import google_icon from "@/public/images/google_icon.png";
import user_icon from "@/public/images/user_icon.png";

interface UserMenuProps {
  currentUser: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <div className="relative z-30">
        <div
          className="
      p-2 border-[1px] border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700
      "
          onClick={toggleOpen}
        >
          <Avatar src={currentUser?.image} height={30} width={30} />
          <span className="text-slate-50">{currentUser?.name}</span>
          <AiFillCaretDown />
        </div>
        {isOpen && (
          <div className="absolute rounded-md shadow-md w-[270px] bg-slate-800 overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer">
            {currentUser ? (
              <div>
                <div className="user-head">
                  <div className="user-box">
                    <Image src={google_icon} alt="Google" />
                    <span className="user-span">Google</span>
                  </div>
                  <div className="user-box-right">
                    <MenuItem
                      onClick={() => {
                        toggleOpen();
                        signOut();
                      }}
                    >
                      <Logout className="mr-2" style={{ fontSize: 20 }} />
                      Sign out
                    </MenuItem>
                  </div>
                </div>
                <div className="user-head">
                  <div className="user-image">
                    <Avatar
                      src={
                        currentUser.image ||
                        "https://i.postimg.cc/CxVYM67x/user-icon.png"
                      }
                      height={75}
                      width={75}
                    />
                  </div>
                  <div className="user-details-right">
                    <p className="user-name">{currentUser.name}</p>
                    <p className="user-email">{currentUser.email}</p>
                    <Link href="/account" className="user-link">
                      My Microsoft account
                    </Link>
                    <Link href="/account" className="user-link">
                      My Profile
                    </Link>
                  </div>
                </div>
                <hr />
                <div className="user-footer">
                  <Link href="/orders">
                    <MenuItem onClick={toggleOpen}>
                      <ShoppingCartSharp
                        className="mr-1"
                        style={{ fontSize: 20 }}
                      />{" "}
                      Your Orders
                    </MenuItem>
                  </Link>
                  <Link href="/admin">
                    <MenuItem onClick={toggleOpen}>
                      <Dashboard className="mr-1" style={{ fontSize: 20 }} />{" "}
                      Dashboard
                    </MenuItem>
                  </Link>
                  <Link href="/settings">
                    <MenuItem onClick={toggleOpen}>
                      <Settings className="mr-1" style={{ fontSize: 20 }} />{" "}
                      Settings
                    </MenuItem>
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <Link href="/login">
                  <MenuItem onClick={toggleOpen}>
                    <Login className="mr-2" style={{ fontSize: 20 }} />
                    Login
                  </MenuItem>
                </Link>
                <Link href="/register">
                  <MenuItem onClick={toggleOpen}>
                    <HowToReg className="mr-2" style={{ fontSize: 20 }} />
                    Register
                  </MenuItem>
                </Link>
                <Link href="/settings">
                  <MenuItem onClick={toggleOpen}>
                    <Settings className="mr-2" style={{ fontSize: 20 }} />
                    Settings
                  </MenuItem>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
    </>
  );
};

export default UserMenu;
