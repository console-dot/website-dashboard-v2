import React, { useEffect, useState } from "react";
import { Button } from "../Button";
import { FaPen, FaTrash } from "react-icons/fa";
import { editHeroDescription } from "../../api";
import { toast } from "react-toastify";

export const OpenPositionsCard = ({ data, onDelete, onEdit }) => {
 
  return (
    <div>
      <div className="d-flex justify-content-center">
        <div>
          <div
            className="bg-dark rounded border-secondary text-white"
            style={{ minHeight: "450px" }}
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
                {/* Introduction */}
                <div className="w-full flex flex-col gap-2">
                  
                  <h1 className="text-heading text-xl font-bold">
                    Open Position for {data?.jobCategory?.toUpperCase()}
                  </h1>
                  {[
                    { label: "Category", value: data?.jobCategory },
                    { label: "Experience", value: data?.experience },
                    { label: "No Of Positions", value: data?.noOfPositions },
                    { label: "Qualifications", value: data?.qualifications },
                    { label: "Employment Type", value: data?.employmentType },
                    { label: "Designation", value: data?.designation },
                    { label: "No Of Request", value: data?.noOfRequest },
                    { label: "Capacity", value: data?.capacity },
                  ].map((item, index) => (
                    <div key={index} className="flex" style={{ width: "70%" }}>
                      <div className="w-[50%]">
                        <strong style={{ color: "grey" }}>{item.label}: </strong>
                      </div>
                      <div className="w-[50%]">
                        <span className="text-black text-sm">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="w-full flex flex-row justify-center items-center">
                  <div className="w-[80%] flex justify-around">
                    <Button
                      icon={<FaPen />}
                      text={"Edit"}
                      click={() => onEdit(data._id)}
                    />
                    <Button
                      text={"Delete"}
                      icon={<FaTrash />}
                      click={() => onDelete(data._id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
