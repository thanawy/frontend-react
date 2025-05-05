import React, { useState } from "react";
import { Link } from "react-router-dom";
import user from "../../assets/images/user.png";
import home from "../../assets/icons/home.svg";
import rank from "../../assets/icons/rank.svg";
import settings from "../../assets/icons/settings.svg";
import statistics from "../../assets/icons/statistics.svg";
import subscribtion from "../../assets/icons/subscribtion.svg";
import task from "../../assets/icons/task.svg";
import logOut from "../../assets/icons/logOut.svg";

// النسخ البيضاء
import homeLight from "../../assets/icons/homeLight.png";
import rankLight from "../../assets/icons/rankLight.svg";
import settingsLight from "../../assets/icons/settingsLight.svg";
import statisticsLight from "../../assets/icons/statisticsLight.svg";
import subscribtionLight from "../../assets/icons/subscribtionLight.svg";
import taskLight from "../../assets/icons/taskLight.svg";

export default function Navbar() {
  const [activeItem, setActiveItem] = useState("home");

  const navItems = [
    {
      key: "home",
      icon: home,
      lightIcon: homeLight,
      label: "المواد الدراسية",
      to: "/subjects",
    },
    {
      key: "statistics",
      icon: statistics,
      lightIcon: statisticsLight,
      label: "الإحصائيات",
      to: "/statistics",
    },
    {
      key: "task",
      icon: task,
      lightIcon: taskLight,
      label: "اختباراتك",
      to: "/tests",
    },
    {
      key: "rank",
      icon: rank,
      lightIcon: rankLight,
      label: "ترتيبك",
      to: "/ranking",
    },
    {
      key: "subscription ",
      icon: subscribtion,
      lightIcon: subscribtionLight,
      label: "الاشتراكات",
      to: "/subscriptions",
    },
    {
      key: "settings",
      icon: settings,
      lightIcon: settingsLight,
      label: "الاعدادات",
      to: "/settings",
    },
    {
      key: "logOut",
      icon: logOut,
      lightIcon: logOut, 
      label: "تسجيل الخروج",
      to: "/logout",
    },
  ];

  return (
    <div className="w-full relative z-50">
      <div className="navbar w-full bg-base-100 shadow-sm transition-all duration-300">
        {/* Dropdown Menu for Mobile */}
        <div className="dropdown block lg:hidden">
          <div tabIndex={0} role="button" className="btn border-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white rounded-lg z-50 mt-2 w-96 h-screen p-2 gap-6 shadow"
          >
            {navItems.map((item, i) => (
              <li key={i} onClick={() => setActiveItem(item.key)}>
                <Link
                  to={item.to}
                  className={`flex items-center justify-end gap-2 flex-row-reverse p-3 rounded-lg font-bold cursor-pointer ${
                    activeItem === item.key
                      ? "bg-primary text-white"
                      : "text-primary"
                  }`}
                >
                  <span>{item.label}</span>
                  <img
                    src={
                      activeItem === item.key ? item.lightIcon : item.icon
                    }
                    alt="icon"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Logo / Title */}
        <div className="navbar-start">
          <p className="font-bold hidden xl:block md:text-[24px] leading-[32px] text-[#0B011E]">
            المواد الدراسية
          </p>
          <p className="block xl:hidden text-primary font-bold">ثانوي</p>
        </div>

        {/* Right side */}
        <div className="navbar-end">
          <button className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="hidden sm:block h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <button className="btn border-none cursor-pointer">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="hidden sm:block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
          <div className="flex user justify-center items-center gap-3">
            <img src={user} alt="user-image" />
            <div className="flex-col flex">
              <p className="text-primary font-bold leading-[16px]">
                كريم احمد
              </p>
              <p className="text-[10px] leading-[12px] text-[#0B011E] mt-1">
                الصف الثالث الثانوي
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}