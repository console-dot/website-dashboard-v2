import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OffshoringCard } from "./OffshoringCard";

const data = [
  {
    offshoreType: "Dedicated Development Center",
    offshoreDescription:
      "Offers flexible engagement models and full control over the process.",
    offshoreAdvantages: [
      "Cost Effective",
      "Scalable Resources",
      "Expert Teams",
    ],
    offshoreComparison: [
      "Dedicated Team",
      "Freelance",
      "Better Collaboration",
      "Consistency",
    ],
  },
];

export const OffshoringPage = () => {
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
        <h2 className="text-black text-2xl font-bold">Offshore Page</h2>
      </div>

      {/* Center */}
      <div className="w-[90%] m-auto px-4 py-4 bg-backgroundColor my-3 border border-dashed border-[#0E7789] rounded-md">
        <div className="flex">
          {data &&
            data.map((item, index) => (
              <div key={index} className="flex flex-col w-full">
                <OffshoringCard data={item} onView={() => onView(index)} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
