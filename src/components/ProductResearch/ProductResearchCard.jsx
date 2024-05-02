import React from "react";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import { FaEye, FaPen } from "react-icons/fa";

export const ProductResearchCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="d-flex justify-content-center">
        <div>
          <div className="bg-dark rounded border-secondary text-white ">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <div className="w-full flex flex-col justify-between mt-[10px]">
                {/* ProductResearch Modal*/}

                <div className="w-full flex flex-col gap-2">
                  <h1 className="text-heading text-xl font-bold">
                    Product Research Model
                  </h1>
                  <div className="flex" style={{ width: "70%" }}>
                    <div className="w-[50%]">
                      <strong style={{ color: "grey" }}> Description: </strong>
                    </div>
                    <div className="w-[50%]">
                      <span className="text-black text-sm">
                        {data?.description}
                      </span>
                    </div>
                  </div>
                  <div className="flex" style={{ width: "70%" }}>
                    <div className="w-[50%]">
                      <strong style={{ color: "grey" }}>Key Components: </strong>
                    </div>
                    <div className="w-[50%]">
                      {/* Map over keyComponents to display each component and its points */}
                      {data?.keyComponents?.map((component, index) => (
                        <div key={index}>
                          <p className="text-black text-sm font-bold">
                            {component.heading}:
                          </p>
                          <ul>
                            {component.points.map((point, pointIndex) => (
                              <li className="text-black" key={pointIndex}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex" style={{ width: "70%" }}>
                    <div className="w-[50%]">
                      <strong style={{ color: "grey" }}>Why Choose Us: </strong>
                    </div>
                    <div className="w-[50%]">
                      <span className="text-black text-sm">
                        {data?.whyChoose}
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
                      navigate(`/ProductResearchPageEdit/edit/:id`);
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
