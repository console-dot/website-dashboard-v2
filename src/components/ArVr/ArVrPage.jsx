import React, { useEffect, useState } from "react";
import { ArVrCard } from "./ArVrCard";
import { getAR } from "../../api";
import { setARData } from "../../redux/arvrSlice";
import { useDispatch } from "react-redux";
import RainbowLoader from "../Loader/RainbowLoader";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export const ArVrPage = ({ setIsValid, isValid }) => {
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    getAR()
      .then((res) => {
        setData(res?.data);
        if (res == 403) {
          setIsValid(false);
        }
        dispatch(setARData(res?.data));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log("isValid",isValid)
    if (!isValid) {
      toast.warning("You Session has been Expired. Please Login Again", {
        autoClose: 1500,
        onClose: () => {},
      });
    }
  }, [location.pathname, isValid]);


  if (!data) {
    return <RainbowLoader />;
  }

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
        <h2 className="text-black text-2xl font-bold">Ar/Vr Service Page</h2>
      </div>

      {/* Center */}
      <div className="w-[90%] m-auto px-4 py-4 bg-backgroundColor my-3 border border-dashed border-[#0E7789] rounded-md">
        <div className="flex">
          {data && (
            <div className="flex flex-col w-full">
              <ArVrCard data={data} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
