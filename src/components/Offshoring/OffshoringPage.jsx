import React, { useEffect, useState } from "react";
import { OffshoringCard } from "./OffshoringCard";
import { getOffShore } from "../../api/offShore";
import { setOffShoreData } from "../../redux/offShoreSlice";
import { useDispatch } from "react-redux";
import RainbowLoader from "../Loader/RainbowLoader";

export const OffshoringPage = () => {
  const [data, setData] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    getOffShore()
      .then((res) => {
        setData(res?.data);
        dispatch(setOffShoreData(res?.data));
      })
      .catch((err) => console.log(err));
  }, []);

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
        <h2 className="text-black text-2xl font-bold"> Offshore Page</h2>
      </div>

      <div className="w-[90%] m-auto px-4 py-4 bg-backgroundColor my-3 border border-dashed border-[#0E7789] rounded-md">
        <div className="flex">
          {data && (
            <div className="flex flex-col w-full">
              <OffshoringCard data={data} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
