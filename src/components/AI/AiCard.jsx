// Reorder imports to the top of the file
import React from "react";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import { FaEye, FaPen } from "react-icons/fa";
import config from "../../api/config";
import { truncateString } from "../../utils";

export const AiCard = ({ data }) => {
  const BASE_URL = config.BASE_URL;
  const navigate = useNavigate();
  const cardLabels = [
    "Expertise",
    "Innovation at the Core",
    "Collaboration for Success",
    "Tailored Solutions",
  ];
  const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {});
  };

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
                    Artificial Intelligence Model
                  </h1>
                  <div className="flex border-b border-solid border-custom-purple" style={{ width: "70%" }}>
                    <div className="w-[50%]">
                      <strong style={{ color: "grey" }}>Hero Description: </strong>
                    </div>
                    <div className="w-[50%]">
                      <span className="text-black text-sm">
                        {data?.heroDescription}
                      </span>
                    </div>
                  </div>
                  <div className="flex border-b border-solid border-custom-purple" style={{ width: "70%" }}>
                    <div className="w-[50%]">
                      <strong style={{ color: "grey" }}> Description: </strong>
                    </div>
                    <div className="w-[50%]">
                      <span className="text-black text-sm">
                        {data?.description}
                      </span>
                    </div>
                  </div>
                  <strong style={{ color: "grey" }}>Why Choose Us:</strong>
                  <div className="w-full flex flex-row flex-wrap justify-center">
                    {data?.whyChooseUs.map((option, index) => (
                      <div className="flex flex-col gap-4 w-[30%] h-[30%] p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mr-4">
                        <div className="w-full h-[80%]">
                          <h3
                            className="option-title text-gray-500 text-lg font-semibold text-center mb-2"
                            style={{ height: "20px" }}
                          >
                            {cardLabels[index]}:
                          </h3>
                          <p
                            className="option-description text-gray-500 text-center mb-4"
                            style={{ height: "100px" }}
                          >
                            {truncateString(option, 150)}
                          </p>
                        </div>
                        <div
                          className="w-full flex justify-center items-center"
                          style={{ height: "20px" }}
                        >
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTw3HApB4bsvabXW3L14cV-LhFo0L71QmEESJN3vW9Ow&s"
                            alt={option.name}
                            className="option-image w-8 h-8"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col mt-2">
                    <div className="w-[50%]">
                      <h1 className="text-heading text-xl font-bold">
                        Tech Stack
                      </h1>
                    </div>
                    {data &&
                      data.techStack &&
                      data.techStack.length > 0 &&
                      Object.entries(groupBy(data.techStack, "type")).map(
                        ([type, options], index) => (
                          <div key={index} className=" flex flex-row mt-8">
                            <div className="w-[18%]">
                              <strong style={{ color: "grey" }}>{type}:</strong>
                            </div>
                            <div className="w-[80%] flex flex-row flex-wrap justify-start gap-4 mt-2">
                              {options.map((option, index) => (
                                <div
                                  key={index}
                                  className="block w-[20%] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                                >
                                  <p
                                    className="option-description text-gray-500 text-center mb-4"
                                    style={{ height: "48px" }}
                                  >
                                    {option.name}
                                  </p>
                                  <div
                                    className="w-full flex justify-center items-center"
                                    style={{ height: "20px" }}
                                  >
                                    <img
                                      src={`${BASE_URL}/file/${option?.image}`}
                                      alt={option.name}
                                      className="option-image w-8 h-8"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      )}
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-row justify-center items-center">
                <div className="w-[80%] flex justify-around">
                  <Button
                    icon={<FaPen />}
                    text={"Edit"}
                    click={() => {
                      navigate(`/AiPageEdit/edit/${data?._id}`);
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
