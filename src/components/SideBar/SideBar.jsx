import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import home from "../../assets/icons/home.svg";
import rank from "../../assets/icons/rank.svg";
import settings from "../../assets/icons/settings.svg";
import statistics from "../../assets/icons/statistics.svg";
import subscribtion from "../../assets/icons/subscribtion.svg";
import task from "../../assets/icons/task.svg";
import logOut from "../../assets/icons/logOut.svg";
import homeLight from "../../assets/icons/homeLight.png";
import rankLight from "../../assets/icons/rankLight.svg";
import settingsLight from "../../assets/icons/settingsLight.svg";
import statisticsLight from "../../assets/icons/statisticsLight.svg";
import subscribtionLight from "../../assets/icons/subscribtionLight.svg";
import taskLight from "../../assets/icons/taskLight.svg";
import robot from "../../assets/images/robot.svg";

export default function SideBar({ isOpen, setIsOpen }) {
  const [activeItem, setActiveItem] = useState("home");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    {
      key: "home",
      icon: home,
      lightIcon: homeLight,
      label: "المواد الدراسية",
      to: "/home",
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
      key: "subscription",
      icon: subscribtion,
      lightIcon: subscribtionLight,
      label: "الاشتراكات",
      to: "/subscriptions",
    },
    {
      key: "settings",
      icon: settings,
      lightIcon: settingsLight,
      label: "الإعدادات",
      to: "/settings",
    },
    {
      key: "logOut",
      icon: logOut,
      lightIcon: logOut,
      label: "تسجيل خروج",
      to: "/logout",
    },
  ];

  return (
    <div
      className={`h-auto min-h-screen xl:block hidden ${
        isOpen ? "w-64" : "w-24"
      }  transition-all duration-300 border-l border-gray-200`}
    >
      {/* Header */}
      <div className="flex items-center justify-center mb-2">
        <div className="flex flex-row-reverse justify-center w-full items-center ">
          <button
            onClick={toggleSidebar}
            className="text-primary font-bold text-[32px] rtl text-start w-full"
          >
            ثانوي
          </button>
          {isOpen && (
            <button onClick={toggleSidebar} className="text-gray-700 mr-2 me-4">
              <Menu size={24} />
            </button>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <div className={`flex-grow ${isOpen ? "" : "flex flex-col items-center"}`}>
        <ul className={`${isOpen ? "text-center" : "w-full"}`}>
          {navItems.slice(0, 6).map((item) => (
            <li key={item.key} onClick={() => setActiveItem(item.key)}>
              <Link
                to={item.to}
                className={`flex items-center cursor-pointer ${
                  activeItem === item.key
                    ? isOpen
                      ? "flex-row-reverse justify-end ps-4 bg-[#8D55F9] rounded-r-md ms-4 gap-4 py-2"
                      : "justify-center bg-primary rounded-lg py-3"
                    : isOpen
                    ? "justify-end gap-2 flex-row-reverse p-3"
                    : "justify-center p-3"
                }`}
              >
                <span
                  className={`${
                    activeItem === item.key ? "text-white" : "text-primary"
                  } ${isOpen ? "block" : "hidden"}`}
                >
                  {item.label}
                </span>
                <img 
                  src={activeItem === item.key ? item.lightIcon : item.icon}
                  alt={`${item.key}Icon`}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* robot Section */}
      {isOpen && (
        <div className="mx-2 mb-2 mt-8 bg-gradient-to-t from-[#4806C8] to-[#8D55F9] rounded-[24px] p-4 text-center overflow-hidden">
          <div className="robot w-full justify-center items-center flex">
            <img src={robot} alt="robot" className="w-16 h-24" />
          </div>
          <div className="cardContent">
            <div className="text-white text-right mb-2 pt-2">
              رحلتك نحو التفوق تبدأ بخطوة
            </div>
            <button className="bg-white text-primary rounded-md py-2 px-4 w-full mt-4">
              اشترك الآن
            </button>
          </div>
        </div>
      )}

      {/* Logout Button */}
      <div className="p-4 flex justify-start items-center">
        <Link
          to="/logout"
          className={`flex-row-reverse flex items-center gap-2 text-red-500 ${
            isOpen ? "" : "justify-center w-full"
          }`}
          onClick={() => setActiveItem("logOut")}
        >
          {isOpen && <span>تسجيل خروج</span>}
          <img src={logOut} alt="logOutIcon" className="" />
        </Link>
      </div>
    </div>
  );
}