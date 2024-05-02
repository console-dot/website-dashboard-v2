import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { OpenPositionsCard } from "./OpenPositionsCard";

const data = [
  {
    jobType: "FullStack",
    experience: "4-years.",
    noOfPositions: "2",
    qualifications: "BSCS",
    employmentType: "Full-Time",
    designation: "Senior",
    noOfRequest: "3",
    capacity: "2",
  },
];

export const OpenPositionsPage = () => {
  //   const [data, setData] = useState();
  const navigate = useNavigate();

  const onView = (id) => {
    navigate(`view/${id}`);
  };

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
        <h2 className="text-black text-2xl font-bold">Open Positions Page</h2>
      </div>

      {/* Center */}
      <div className="w-[90%] m-auto px-4 py-4 bg-backgroundColor my-3 border border-dashed border-[#0E7789] rounded-md">
        <div className="flex">
          {data &&
            data.map((item, index) => (
              <div key={index} className="flex flex-col w-full">
                <OpenPositionsCard data={item} onView={() => onView(index)} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
