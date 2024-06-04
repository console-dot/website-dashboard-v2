import React from "react";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setCaseStudiesData } from "../../redux/caseStudiesSlice";
import config from "../../api/config";
import { removeCaseStudy } from "../../api";
import { toast } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toastify

export const CaseStudiesCard = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const BASE_URL = config.BASE_URL;

  const handleEditClick = (itemData) => {
    dispatch(setCaseStudiesData(itemData));
    navigate(`/casestudiesEdit/edit/${itemData._id}`);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(removeCaseStudy(id));
      // Show success toast upon successful deletion
      toast.success("Case study deleted successfully!");
    } catch (error) {
      // Show error toast if deletion fails
      toast.error("Failed to delete case study");
    }
  };
  

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-center">
        {Array.isArray(data) &&
          data.length > 0 &&
          data.map((itemData, index) => (
            <div key={index} className="m-2">
              <div className="bg-dark rounded border-secondary text-white p-3">
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
                        {itemData.title}
                      </h1>
                      <div className="flex border-b border-solid border-custom-purple" style={{ width: "70%" }}>
                        <div className="w-[50%]">
                          <strong style={{ color: "grey" }}>
                            {" "}
                            Project Link:{" "}
                          </strong>
                        </div>
                        <div className="w-[50%]">
                          <span className="text-black text-sm">
                            {itemData.projectLink}
                          </span>
                        </div>
                      </div>
                      <div className="flex border-b border-solid border-custom-purple" style={{ width: "70%" }}>
                        <div className="w-[50%]">
                          <strong style={{ color: "grey" }}>
                            {" "}
                            Description:{" "}
                          </strong>
                        </div>
                        <div className="w-[50%]">
                          <span className="text-black text-sm">
                            {itemData.description}
                          </span>
                        </div>
                      </div>
                      <div className="flex border-b border-solid border-custom-purple" style={{ width: "70%" }}>
                        <div className="w-[50%]">
                          <strong style={{ color: "grey" }}>
                            Client Name:{" "}
                          </strong>
                        </div>
                        <div className="w-[50%]">
                          <span className="text-black text-sm">
                            {itemData.clientName}
                          </span>
                        </div>
                      </div>
                      <div className="flex border-b border-solid border-custom-purple" style={{ width: "70%" }}>
                        <div className="w-[50%]">
                          <strong style={{ color: "grey" }}>
                            Project Duration:{" "}
                          </strong>
                        </div>
                        <div className="w-[50%]">
                          <span className="text-black text-sm">
                            {itemData.projectDuration}
                          </span>
                        </div>
                      </div>
                      <div className="flex border-b border-solid border-custom-purple" style={{ width: "70%" }}>
                        <div className="w-[50%]">
                          <strong style={{ color: "grey" }}>Services: </strong>
                        </div>
                        <div className="w-[50%]">
                          <span className="text-black text-sm">
                            {itemData.services}
                          </span>
                        </div>
                      </div>
                      <div className="flex border-b border-solid border-custom-purple" style={{ width: "70%" }}>
                        <div className="w-[50%]">
                          <strong style={{ color: "grey" }}>Tech: </strong>
                        </div>
                        <div className="w-[50%]">
                          <span className="text-black text-sm">
                            {itemData.tech.join(", ")}
                          </span>
                        </div>
                      </div>
                      <div className="flex border-b border-solid border-custom-purple" style={{ width: "70%" }}>
                        <div className="w-[50%]">
                          <strong style={{ color: "grey" }}>
                            Project Image:{" "}
                          </strong>
                        </div>
                        <div className=" flex justify-center items-center mx-auto w-[50%]">
                          <img
                            src={`${BASE_URL}/file/${itemData?.projectImage}`}
                            alt={itemData.title}
                            style={{
                              maxWidth: "300px",
                              maxHeight: "200px",
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex border-b border-solid border-custom-purple" style={{ width: "70%" }}>
                        <div className="w-[50%]">
                          <strong style={{ color: "grey" }}>
                            Project Snippets:{" "}
                          </strong>
                        </div>
                        <div className="flex justify-center gap-6 w-[50%]">
                          {itemData.images.map((image, imgIndex) => (
                            <div key={imgIndex}>
                              <img
                                src={`${BASE_URL}/file/${image}`}
                                alt={`${itemData.title} snippet ${
                                  imgIndex + 1
                                }`}
                                style={{
                                  maxWidth: "200px",
                                  maxHeight: "100px",
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex flex-row justify-center items-center mt-3">
                    <div className="w-[80%] flex justify-around">
                      <Button
                        icon={<FaPen />}
                        text={"Edit"}
                        click={() => handleEditClick(itemData)}
                      />
                      <Button text={"View"} icon={<FaEye />} />

                      <Button
                        icon={<FaTrash />}
                        text={"Delete"}
                        click={() => handleDelete(itemData._id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
