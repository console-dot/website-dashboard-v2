import React from "react";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import { FaEye, FaPen } from "react-icons/fa";
import config from "../../api/config";

export const MobileAppCard = ({ data }) => {
  const navigate = useNavigate();
  const BASE_URL = config.BASE_URL;
  console.log("data",data)
  const cardLabels = [
    "Expertise",
    "Innovative Solutions",
    "Client Collaboration",
    "Customization",
  ];

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
                <div className="w-full flex flex-col gap-2">
                  <h1 className="text-heading text-xl font-bold">
                    Mobile App Model
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
                      <strong style={{ color: "grey" }}>Proposition: </strong>
                    </div>
                    <div className="w-[50%]">
                      <span className="text-black text-sm">
                        {data?.proposition}
                      </span>
                    </div>
                  </div>
                  <strong style={{ color: "grey" }}>Why Choose Us:</strong>
                  <div className="w-full flex flex-row flex-wrap justify-center ">
                    {data?.whyChooseUs.map((option, index) => (
                      <div class="block max-w-[32%] p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mr-4 w-[20%]">
                        <h3 className="option-title text-gray-500 text-lg font-semibold">
                          {cardLabels[index]}
                          {" :"}
                        </h3>
                        <p className="option-description text-gray-500">
                          {" "}
                          {option}
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
                  <div className="flex flex-col mt-2">
                    <div className="w-[50%]">
                      <strong style={{ color: "grey" }}>Tech Stack: </strong>
                    </div>
                    <div className="w-full flex flex-row flex-wrap justify-center gap-4 mt-8">
                      {data?.techStack.map((option, index) => (
                        <div class="block max-w-[32%] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-[10%]">
                          <h3 className="option-title text-gray-500 text-lg font-semibold">
                            {option.name}
                            {" :"}
                          </h3>
                          <p className="option-description text-gray-500">
                            {" "}
                            {option.type}
                          </p>
                          <div className="w-full flex justify-center items-center mt-2">
                            <img
                              src={`${BASE_URL}/file/${option?.image}`}
                              alt={option.name}
                              className="option-image w-5 h-5 "
                            />
                          </div>
                        </div>
                      ))}
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
                      navigate(`/MobileAppPageEdit/edit/${data?._id}`);
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
