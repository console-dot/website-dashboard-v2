import React from "react";
import { Button } from "../Button";
import { FaEye, FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook to handle navigation

export const OffshoringCard = ({ data }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  return (
    <div className="bg-dark rounded border-secondary text-white p-4 mb-4">
      <div className="mb-4">
        <h1 className="text-heading text-xl font-bold">
          Offshoring Services Model
        </h1>
        <div className="mb-2">
          <strong style={{ color: "grey" }}>Top Description:</strong>
          <p className="text-black text-sm">{data?.topDescription}</p>
        </div>
        <div className="mb-2">
          <strong style={{ color: "grey" }}>Bottom Description:</strong>
          <p className="text-black text-sm">{data?.bottomDescription}</p>
        </div>
      </div>
      {/* Map through each offShoreType */}
      {data?.offshoreType.map((offshore, index) => (
        <div
          key={index}
          className="w-full flex flex-col gap-2 border border-dashed mb-2 p-2 border-custom-purple"
        >
          <h2 className="text-heading text-lg font-bold mb-2">
            Type: {offshore.type}
          </h2>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 lg:w-1/3 mb-4 px-2">
              <strong style={{ color: "grey" }}>Description:</strong>
              <p className="text-black text-sm">{offshore?.description}</p>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 mb-4 px-2">
              <strong style={{ color: "grey" }}>Advantages:</strong>
              <ul className="text-black text-sm" style={{ listStyle: "unset" }}>
                {offshore?.advantages &&
                  offshore?.advantages?.map((advantage, index) => (
                    <li key={index}>{advantage}</li>
                  ))}
              </ul>
              ;
            </div>

            <div className="w-full md:w-1/2 lg:w-1/3 mb-4 px-2">
              <strong style={{ color: "grey" }}>Comparison:</strong>
              <ul className="text-black text-sm" style={{ listStyle: "unset" }}>
                {offshore?.comparison &&
                  offshore?.comparison?.map((comparison, index) => (
                    <li key={index}>{comparison}</li>
                  ))}
              </ul>
              ;
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-around mt-4">
        <Button
          icon={<FaPen />}
          text={"Edit"}
          click={() => {
            // Replace :id with the actual ID of the item if applicable
            navigate(`/OffshoringPage/edit/:id`);
          }}
        />
        <Button text={"View"} icon={<FaEye />} />
      </div>
    </div>
  );
};
