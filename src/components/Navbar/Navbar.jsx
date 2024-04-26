import { useState } from "react";
import {
  FaBars,
  FaUserAlt,
  
} from "react-icons/fa";
import { TbHelicopterLanding } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { MdLogout} from "react-icons/md";


export default function Navbar({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const menuItem = [
    {
      path: "/LandingPage",
      name: "Landing Page",
      icon: <TbHelicopterLanding />,
    },
    {
      path: "/offShoring",
      name: "Off Shoring",
      icon: <FaUserAlt />,
    },
    {
      path: "/customSoftware",
      name: "Custom Software",
      icon: <FaUserAlt />,
    },
    {
      path: "/productResearch",
      name: "Product Research",
      icon: <FaUserAlt />,
    },
    {
      path: "/webDevelopment",
      name: "Web Development",
      icon: <FaUserAlt />,
    },
    {
      path: "/mobileApp",
      name: "Mobile App development",
      icon: <FaUserAlt />,
    },
    {
      path: "/blockchain",
      name: "Mobile App development",
      icon: <FaUserAlt />,
    },
    {
      path: "/ai ",
      name: "Artificial Intelligence",
      icon: <FaUserAlt />,
    },
    {
      path: "/arvr",
      name: "Ar/Vr",
      icon: <FaUserAlt />,
    },
    {
      path: "/uiux",
      name: "Ui/Ux",
      icon: <FaUserAlt />,
    },
    {
      path: "/logout",
      name: "Logout",
      icon: <MdLogout />,
    },
  ];
  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div className="flex" style={{ height: "auto" }}>
        <div
          style={{
            width: isOpen ? "250px" : "50px",
          }}
          className="bg-[#f8f9fc] text-white"
        >
          <div className="flex items-center px-[20px] py-[15px]">
            {isOpen && (
              <div
                onClick={toggle}
                style={{
                  marginLeft: "0px",
                  backgroundImage: `url(https://media.licdn.com/dms/image/D4D0BAQE5lpeUVrhy1A/company-logo_200_200/0/1681556363620/consoledot_logo?e=2147483647&v=beta&t=3400gs_3OS6gGNc1ueGDSUDaHqbOPGdIeLKIDsDgieA)`, // Set background image
                  backgroundSize: "cover", // Cover the entire container
                  backgroundPosition: "center", // Center the background image
                  width: "100px", // Set width
                  height: "100px", // Set height
                }}
              ></div>
            )}
            {!isOpen && (
              <button onClick={toggle} style={{ padding: "0", margin: "0" }}>
                {" "}
                <FaBars color="black" />
              </button>
            )}
          </div>
          <div className="mt-[60px]">
            {menuItem?.map((item, index) => (
              <NavLink to={item.path} key={index} className="link">
                <div className="icon">{item.icon}</div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="text-sm"
                >
                  {item.name}
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
      <main
      className="mt-[20px]"
        style={{
          minHeight: "100vh",
          //   width: isOpen ? "calc(100%-250px)" : "calc(100%-50px)",
          width: "100%",
        }}
      >
        {children}
      </main>
    </div>
  );
}
