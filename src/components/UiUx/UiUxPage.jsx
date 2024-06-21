import React, { useEffect, useState } from "react";
import { UiUxCard } from "./UiUxCard";
import { useDispatch } from "react-redux";
import { getUI } from "../../api";
import { setUIData } from "../../redux/uiuxSlice";
import RainbowLoader from "../Loader/RainbowLoader";

export const UiUxPage = () => {
  const [data, setData] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    getUI()
      .then((res) => {
        setData(res?.data);
        dispatch(setUIData(res?.data));
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
        <h2 className="text-black text-2xl font-bold">Ui/Ux Service Page</h2>
      </div>

      {/* Center */}
      <div className="w-[90%] m-auto px-4 py-4 bg-backgroundColor my-3 border border-dashed border-[#0E7789] rounded-md">
        <div className="flex">
          {data && (
            <div className="flex flex-col w-full">
              <UiUxCard data={data} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
