import { useState } from "react";
import {
  FaBars,
  FaFigma,
  FaGlasses,
  FaHome,
  FaMobile,
  FaPlaneDeparture,
  FaRobot,

} from "react-icons/fa";
import { GiEyeTarget } from "react-icons/gi";
import { IoCodeWorkingSharp } from "react-icons/io5";
import { CgWebsite } from "react-icons/cg";
import { SiBlockchaindotcom } from "react-icons/si";
import { NavLink } from "react-router-dom";
import { MdLogout } from "react-icons/md";

export default function Navbar({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const menuItem = [
    { path: "/LandingPage", name: "Landing Page", icon: <FaHome size={25} /> },
    {
      path: "/offShoring",
      name: "Off Shoring",
      icon: <FaPlaneDeparture size={25} />,
    },
    {
      path: "/customSoftware",
      name: "Custom Software",
      icon: <IoCodeWorkingSharp size={25} />,
    },
    {
      path: "/productResearch",
      name: "Product Research",
      icon: <GiEyeTarget size={25} />,
    },
    {
      path: "/webDevelopment",
      name: "Web Development",
      icon: <CgWebsite size={25} />,
    },
    {
      path: "/mobileApp",
      name: "Mobile App development",
      icon: <FaMobile size={25} />,
    },
    {
      path: "/blockchain",
      name: "Block Chain",
      icon: <SiBlockchaindotcom size={25} />,
    },
    {
      path: "/ai ",
      name: "Artificial Intelligence",
      icon: <FaRobot size={25} />,
    },
    {
      path: "/arvr",
      name: "Ar/Vr",
      icon: <FaGlasses size={25} />,
    },
    {
      path: "/uiux",
      name: "Ui/Ux",
      icon: <FaFigma size={25} />,
    },
    {
      path: "/logout",
      name: "Logout",
      icon: <MdLogout size={25} />,
    },
  ];

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div className="flex" style={{ height: "auto" }}>
        <div
          style={{ width: isOpen ? "250px" : "50px" }}
          className="bg-[#f8f9fc] text-white"
        >
          <div className="flex items-center px-[20px] py-[15px]">
            {isOpen && (
              <div
                onClick={toggle}
                style={{
                  marginLeft: "0px",
                  backgroundImage: `url(https://media.licdn.com/dms/image/D4D0BAQE5lpeUVrhy1A/company-logo_200_200/0/1681556363620/consoledot_logo?e=2147483647&v=beta&t=3400gs_3OS6gGNc1ueGDSUDaHqbOPGdIeLKIDsDgieA)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100px",
                  height: "100px",
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
          <div className="flex flex-col justify-center  sticky">
            {menuItem?.map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                className="link flex items-center justify-start"
              >
                <div className="icon">{item.icon}</div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="text-sm text-center"
                >
                  {item.name}
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
      <main className="mt-[20px]" style={{ minHeight: "100vh", width: "100%" }}>
        {children}
      </main>
    </div>
  );
}
