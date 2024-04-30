import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { FaEye, FaPen } from "react-icons/fa";

export const OffshoringCard = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="d-flex justify-content-center">
        <div>
          <div
            className="bg-dark rounded border-secondary text-white "
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <div className="w-full flex flex-col justify-between mt-[10px]">
                {/* Offshoring Services Model  */}
                
                  {/* Offshore */}
                  <div className="w-full flex flex-col gap-2">
                  <h1 className="text-heading text-xl font-bold">
                    Offshoring Services Model
                  </h1>
                    <div className="flex" style={{ width: "70%" }}>
                      <div className="w-[50%]">
                        <strong style={{ color: "grey" }}>Offshore Type: </strong>
                      </div>
                      <div className="w-[50%]">
                        <span className="text-black text-sm">
                          {data?.offshoreType}
                        </span>
                      </div>
                    </div>
                    <div className="flex" style={{ width: "70%" }}>
                      <div className="w-[50%]">
                        <strong style={{ color: "grey" }}>
                          Offshore Description:{" "}
                        </strong>
                      </div>
                      <div className="w-[50%]">
                        <span className="text-black text-sm">
                          {data?.offshoreDescription}
                        </span>
                      </div>
                    </div>
                    <div className="flex" style={{ width: "70%" }}>
                      <div className="w-[50%]">
                        <strong style={{ color: "grey" }}>
                          Offshore Advantages:{" "}
                        </strong>
                      </div>
                      <div className="w-[50%]">
                        <span className="text-black text-sm">
                          {data?.offshoreAdvantages &&
                            data.offshoreAdvantages.map((advantage, index) => (
                              <span key={index}>
                                {advantage}
                                {index !== data.offshoreAdvantages.length - 1 &&
                                  ", "}
                              </span>
                            ))}
                        </span>
                      </div>
                    </div>
                    <div className="flex" style={{ width: "70%" }}>
                      <div className="w-[50%]">
                        <strong style={{ color: "grey" }}>
                          Offshore Comparison:{" "}
                        </strong>
                      </div>
                      <div className="w-[50%]">
                        <span className="text-black text-sm">
                          {data?.offshoreComparison &&
                            data.offshoreComparison.map((advantage, index) => (
                              <span key={index}>
                                {advantage}
                                {index !== data.offshoreComparison.length - 1 &&
                                  ", "}
                              </span>
                            ))}
                        </span>
                      </div>
                    </div>
                  </div>
                
              </div>
              <div className="w-full flex flex-row justify-center items-center">
                <div className="w-[80%] flex justify-around">
                  <Button
                    icon={<FaPen />}
                    text={"Edit"}
                    click={() => {
                      navigate(`/OffshoringPage/edit/:id`);
                    }}
                  />
                  <Button text={"View"} icon={<FaEye />} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
