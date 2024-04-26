import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux";

export default function Login({ loggedIn }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  // const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
    navigate("/landingPage");
  };

  

  return (
    <div className="w-full">
      <h1 className="text-[28px] text-black mb-4 font-bold text-center">
        Login
      </h1>
      <div className="w-full">
        <form
          className="flex justify-center flex-col w-[50%] m-auto gap-2"
          method="post"
          onSubmit={handleSubmit}
        >
          <input
            className="bg-white shadow-lg text-webDescrip px-8 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="userName"
            id="userName"
            onChange={handleChange}
            value={formData?.userName}
            placeholder="UserName"
            required
          />
          <input
            className="bg-white shadow-lg text-webDescrip px-8 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="password"
            name="password"
            id="Password"
            onChange={handleChange}
            value={formData?.password}
            placeholder="Password"
            required
          />
          <div className="w-full flex justify-center items-center mt-4">
            <button className="text-white text-[16px] w-[300px] px-5 py-2.5 bg-gradient-to-r from-fromclr to-toclr hover:bg-gradient-to-r hover:from-toclr hover:to-fromclr rounded-full focus:outline-none active:bg-gradient-to-r active:from-custom-purple active:to-custom-blue">
              <p className="font-Lato text-base font-medium leading-[28px] tracking-normal">
                Submit
              </p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
