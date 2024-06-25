import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { WebDevelopmentCard } from "./WebDevelopmentCard";
import { useDispatch } from "react-redux";
import { getWebDevelopment } from "../../api/webdevelopment";
import { setwebdevData } from "../../redux/webdevSlice";
import { toast } from "react-toastify";

export const WebDevelopmentPage = ({ setIsValid, isValid }) => {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    getWebDevelopment()
      .then((res) => {
        if (res == 403) {
          setIsValid(false);
        }
        setData(res?.data);
        dispatch(setwebdevData(res?.data));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log("isValid", isValid);
    if (!isValid) {
      toast.warning("You Session has been Expired. Please Login Again", {
        autoClose: 1500,
        onClose: () => {},
      });
    }
  }, [location.pathname, isValid]);

  return (
    <>
      <div
        className="w-[90%] m-auto"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 className="text-black text-2xl font-bold">
          Web Development Service Page
        </h2>
      </div>

      {/* Center */}
      <div className="w-[90%] m-auto px-4 py-4 bg-backgroundColor my-3 border border-dashed border-[#0E7789] rounded-md">
        <div className="flex">
          {data && (
            <div className="flex flex-col w-full">
              <WebDevelopmentCard data={data} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
