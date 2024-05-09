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
                  <strong style={{ color: "grey" }}>Key Components:</strong>
                  <div className=" flex flex-row flex-wrap justify-center gap-6 ">
                    {data?.keyComponents?.map((option, index) => (
                      <div
                        key={index}
                        className="block w-40 p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                      >
                        <h3 className="option-title text-gray-500 text-lg font-semibold">
                          {option.heading}
                          {" :"}
                        </h3>
                        <ul>
                          {option.points.map((point, pointIndex) => (
                            <li
                              className="option-description text-gray-500"
                              key={pointIndex}
                            >
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <strong style={{ color: "grey" }}>Why Choose Us:</strong>
                  <div className="w-full flex flex-row flex-wrap justify-between">
                    {data?.whyChoose.map((option, index) => (
                      <div class="block max-w-[32%] p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h3 className="option-title text-gray-500 text-lg font-semibold">
                          {option.name}
                          {" :"}
                        </h3>
                        <p className="option-description text-gray-500">
                          {" "}
                          {option.description}
                        </p>
                        <div className="w-full flex justify-center items-center mt-2">
                          <img
                            src={
                              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTw3HApB4bsvabXW3L14cV-LhFo0L71QmEESJN3vW9Ow&s"
                            }
                            alt={option.name}
                            className="option-image w-8 h-8"
                          />
                        </div>
                      </div>
                    ))}
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
