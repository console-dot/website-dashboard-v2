import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LandingCard } from "./LandingCard";
import { getLandingPage } from "../../api/landing";
import { useDispatch } from "react-redux";
import { setLandingPageData } from "../../redux/landingPageSlice";

export const LandingPage = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const onView = (id) => {
  //   navigate(`view/${id}`);
  // };

  useEffect(() => {
    // console.log("newData", newData);
    getLandingPage()
      .then((res) => {
        setData(res?.data);
        dispatch(setLandingPageData(res?.data));
      })
      .catch((err) => console.log(err));
  }, []);

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
        <h2 className="text-black text-2xl font-bold">Landing Page</h2>
      </div>

      {/* Center */}
      <div className="w-[90%] m-auto px-4 py-4 bg-backgroundColor my-3 border border-dashed border-[#0E7789] rounded-md">
        <div className="flex">
          <div className="flex flex-col w-full">
            <LandingCard data={data} />
          </div>
        </div>
      </div>
    </>
  );
};
