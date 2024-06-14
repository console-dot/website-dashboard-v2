import React from "react";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import { FaEye, FaPen } from "react-icons/fa";
import { truncateString } from "../../utils";

export const ProductResearchCard = ({ data }) => {
  const navigate = useNavigate();
  const cardLabels = [
    "Holistic Approach",
    "Proven Success",
    "Strategic Partnership",
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
                    Product Research Model
                  </h1>
                  <div
                    className="flex border-b border-solid border-custom-purple"
                    style={{ width: "70%" }}
                  >
                    <div className="w-[50%]">
                      <strong style={{ color: "grey" }}>
                        Hero Description:{" "}
                      </strong>
                    </div>
                    <div className="w-[50%]">
                      <span className="text-black text-sm">
                        {data?.heroDescription}
                      </span>
                    </div>
                  </div>
                  <div
                    className="flex border-b border-solid border-custom-purple"
                    style={{ width: "70%" }}
                  >
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
                  <div className="flex flex-row flex-wrap justify-center gap-6">
                    <div className="block w-72 p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                      <h3 className="option-title text-gray-500 text-lg font-semibold">
                        Client:
                      </h3>
                      <div className="option-description text-gray-500">
                        <ul className="list-disc">
                          <li>{data?.keyComponents[0]?.client[0]}</li>
                          <br />
                          <li>{data?.keyComponents[0]?.client[1]}</li>
                        </ul>
                      </div>
                    </div>
                    <div className="block w-72 p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                      <h3 className="option-title text-gray-500 text-lg font-semibold">
                        Feasibility:
                      </h3>
                      <div className="option-description text-gray-500">
                        <ul className="list-disc">
                          <li>{data?.keyComponents[0]?.feasibility[0]}</li>
                          <br />
                          <li>{data?.keyComponents[0]?.feasibility[1]}</li>
                        </ul>
                      </div>
                    </div>
                    <div className="block w-72 p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                      <h3 className="option-title text-gray-500 text-lg font-semibold">
                        Market Analysis:
                      </h3>
                      <div className="option-description text-gray-500">
                        <ul className="list-disc">
                          <li>{data?.keyComponents[0]?.marketAnalysis[0]}</li>
                          <br />
                          <li>{data?.keyComponents[0]?.marketAnalysis[1]}</li>
                        </ul>
                      </div>
                    </div>
                    <div className="block w-72 p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                      <h3 className="option-title text-gray-500 text-lg font-semibold">
                        Roadmap:
                      </h3>
                      <div className="option-description text-gray-500">
                        <ul className="list-disc">
                          <li>{data?.keyComponents[0]?.roadMap[0]}</li>
                          <br />
                          <li>{data?.keyComponents[0]?.roadMap[1]}</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <strong style={{ color: "grey" }}>Why Choose Us:</strong>
                  <div className="w-full flex flex-row flex-wrap justify-center">
                    {data?.whyChooseUs.map((option, index) => (
                      <div className="flex flex-col gap-4 w-[30%] h-[30%] p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mr-4 over">
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
                </div>
              </div>
              <div className="w-full flex flex-row justify-center items-center">
                <div className="w-[80%] flex justify-around">
                  <Button
                    icon={<FaPen />}
                    text={"Edit"}
                    click={() => {
                      navigate(`/ProductResearchPageEdit/edit/${data?._id}`);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
