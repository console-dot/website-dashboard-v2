// CustomService Model (description,  Proposition, whychooseDesc,  WhyChoose[ref], delivers {actionDesc, actionDesc})
import React, { useEffect, useState } from "react";
import { AiCard } from "./AiCard";
import { getArtificialIntelligence } from "../../api/ai";
import { useDispatch } from "react-redux";
import { setAiData } from "../../redux";
import RainbowLoader from "../Loader/RainbowLoader";
export const AiPage = () => {
  const [data, setData] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    getArtificialIntelligence()
      .then((res) => {
        setData(res?.data);
        dispatch(setAiData(res?.data));
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
        <h2 className="text-black text-2xl font-bold">
          Artificial Intelligence Service Page
        </h2>
      </div>

      {/* Center */}
      <div className="w-[90%] m-auto px-4 py-4 bg-backgroundColor my-3 border border-dashed border-[#0E7789] rounded-md">
        <div className="flex">
          {data && (
            <div className="flex flex-col w-full">
              <AiCard data={data} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
