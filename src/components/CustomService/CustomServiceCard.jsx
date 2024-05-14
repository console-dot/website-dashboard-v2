import React from "react";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import { FaEye, FaPen } from "react-icons/fa";

export const CustomServiceCard = ({ data }) => {
  const navigate = useNavigate();
  console.log("cs", data);
  console.log(data);

  // Check if data is an array and get the first element
  const itemData = Array.isArray(data) && data.length > 0 ? data[0] : data;

  return (
    <div>
      <div className="d-flex justify-content-center">
        <div>
          <div className="bg-dark rounded border-secondary text-white">
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
                    Custom Service Model
                  </h1>
                  <div className="flex" style={{ width: "70%" }}>
                    <div className="w-[50%]">
                      <strong style={{ color: "grey" }}> Description: </strong>
                    </div>
                    <div className="w-[50%]">
                      <span className="text-black text-sm">
                        {itemData?.description}
                      </span>
                    </div>
                  </div>
                  <div className="flex" style={{ width: "70%" }}>
                    <div className="w-[50%]">
                      <strong style={{ color: "grey" }}>Proposition: </strong>
                    </div>
                    <div className="w-[50%]">
                      <span className="text-black text-sm">
                        {itemData?.proposition}
                      </span>
                    </div>
                  </div>
                  <div className="flex" style={{ width: "70%" }}>
                    <div className="w-[50%]">
                      <strong style={{ color: "grey" }}>
                        Why Choose Desc:{" "}
                      </strong>
                    </div>
                    <div className="w-[50%]">
                      <span className="text-black text-sm">
                        {itemData?.whychooseDesc}
                      </span>
                    </div>
                  </div>

                  <div className="w-full flex flex-row flex-wrap justify-between">
                    <strong style={{ color: "grey" }}>Why Choose Us:</strong>
                      {itemData?.whyChooseUs?.map((item, index) => (
                        <div
                          key={index}
                          className="block max-w-[32%] p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                        >
                          <h3 className="option-title text-gray-500 text-lg font-semibold">
                            {item}
                          </h3>
                        </div>
                      ))}
                    
                  </div>

                  <div className="flex" style={{ width: "70%" }}>
                    <div className="w-[50%]">
                      <strong style={{ color: "grey" }}>
                        Delivers : Action Desc{" "}
                      </strong>
                    </div>
                    <div className="w-[50%]">
                      <span className="text-black text-sm">
                        {itemData?.delivers?.actionDescription}
                      </span>
                    </div>
                  </div>
                  <div className="flex" style={{ width: "70%" }}>
                    <div className="w-[50%]">
                      <strong style={{ color: "grey" }}>
                        Delivers : CollabDesc{" "}
                      </strong>
                    </div>
                    <div className="w-[50%]">
                      <span className="text-black text-sm">
                        {itemData?.delivers?.collabDescription}
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
                      navigate(`/CustomSoftwarePageEdit/edit/${itemData?._id}`);
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
