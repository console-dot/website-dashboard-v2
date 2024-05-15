import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArVrCard } from "./ArVrCard";
import { getAR } from "../../api";
import { setARData } from "../../redux/arvrSlice";
import { useDispatch } from "react-redux";

export const ArVrPage = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onView = (id) => {
    navigate(`view/${id}`);
  };

  useEffect(() => {
    getAR()
      .then((res) => {
        setData(res?.data);
        dispatch(setARData(res?.data));
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
