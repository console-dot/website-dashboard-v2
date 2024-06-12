import React, { useState } from "react";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setCaseStudiesData } from "../../redux/caseStudiesSlice";
import config from "../../api/config";
import { editHeroDescription, removeCaseStudy } from "../../api";
import { toast } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toastify
import { setHeroDescriptionData } from "../../redux";

export const CaseStudiesCard = ({ data, herodata }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [caseStudyHero, setCaseStudyHero] = useState(
    herodata.caseStudyHero || ""
  );
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

  //tech stack group function
  const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {});
  };

  const handleHeroDescription = async (e) => {
    e.preventDefault();
    try {
      const res = await editHeroDescription({ caseStudyHero }, herodata._id);
      setCaseStudyHero(res?.caseStudyHero);
      alert("Hero description updated successfully!");
    } catch (err) {
      alert("Failed to update hero description");
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
                      {/* hero description */}
                      <div
                        className="flex flex-col "
                        style={{ width: "70%" }}
                      >
                        <label className="" style={{ color: "grey" }}>
                          Hero Description
                        </label>
                        <div className="flex flex-row gap-2">
                          <textarea
                            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            name="heroDescription"
                            id="heroDescription"
                            onChange={(e) => {
                              setCaseStudyHero(e.target.value);
                            }}
                            value={caseStudyHero}
                            placeholder="Hero Description"
                          />
                          <button
                            className="bg-blue-500 text-white py-1 px-6 rounded-lg"
                            type="button"
                            onClick={handleHeroDescription}
                          >
                            Update
                          </button>
                        </div>
                        <div className="border-b border-solid border-custom-purple mt-2"></div>
                      </div> 
                      {/* heading */}
                      <h1 className="text-heading text-xl font-bold">
                        {itemData.title}
                      </h1>
                      {/* title */}
                      <div
                        className="flex border-b border-solid border-custom-purple"
                        style={{ width: "70%" }}
                      >
                        <div className="w-[50%]">
                          <strong style={{ color: "grey" }}> Title: </strong>
                        </div>
                        <div className="w-[50%]">
                          <span className="text-black text-sm">
                            {itemData.title}
                          </span>
                        </div>
                      </div>

                      {/* description */}
                      <div
                        className="flex border-b border-solid border-custom-purple"
                        style={{ width: "70%" }}
                      >
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

                      {/* project link */}
                      <div
                        className="flex border-b border-solid border-custom-purple"
                        style={{ width: "70%" }}
                      >
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

                      {/* tags */}
                      <div
                        className="flex border-b border-solid border-custom-purple"
                        style={{ width: "70%" }}
                      >
                        <div className="w-[50%]">
                          <strong style={{ color: "grey" }}> Tags: </strong>
                        </div>
                        <div className="w-[50%] flex flex-col">
                          {itemData.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="text-black text-sm block"
                            >
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* product */}
                      <div
                        className="flex border-b border-solid border-custom-purple"
                        style={{ width: "70%" }}
                      >
                        <div className="w-[50%]">
                          <strong style={{ color: "grey" }}> Product: </strong>
                        </div>
                        <div className="w-[50%]">
                          <span className="text-black text-sm">
                            {itemData.product}
                          </span>
                        </div>
                      </div>

                      {/* solution */}
                      <div
                        className="flex border-b border-solid border-custom-purple"
                        style={{ width: "70%" }}
                      >
                        <div className="w-[50%]">
                          <strong style={{ color: "grey" }}> Solution: </strong>
                        </div>
                        <div className="w-[50%]">
                          <span className="text-black text-sm">
                            {itemData.solution}
                          </span>
                        </div>
                      </div>

                      {/* client */}
                      <div
                        className="flex flex-col  border-b border-solid border-custom-purple"
                        style={{ width: "70%" }}
                      >
                        {" "}
                        <span className="text-custom-purple font-extrabold">
                          Client{" "}
                        </span>
                        <div className="flex flex-row">
                          <div className="w-[50%] flex flex-col ">
                            <strong style={{ color: "grey" }}>
                              Client Name:{" "}
                            </strong>
                          </div>
                          <div className="w-[50%]">
                            <span className="text-black text-sm">
                              {itemData?.client[0]?.name}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-row">
                          <div className="w-[50%] flex flex-col ">
                            <strong style={{ color: "grey" }}>
                              Client Country:{" "}
                            </strong>
                          </div>
                          <div className="w-[50%]">
                            <span className="text-black text-sm">
                              {itemData?.client[0]?.country}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-row">
                          <div className="w-[50%] flex flex-col ">
                            <strong style={{ color: "grey" }}>
                              Client Industry:{" "}
                            </strong>
                          </div>
                          <div className="w-[50%]">
                            <span className="text-black text-sm">
                              {itemData?.client[0]?.industry}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-row">
                          <div className="w-[50%] flex flex-col ">
                            <strong style={{ color: "grey" }}>
                              Client Team Size:{" "}
                            </strong>
                          </div>
                          <div className="w-[50%]">
                            <span className="text-black text-sm">
                              {itemData?.client[0]?.teamSize}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-row mb-2">
                          <div className="w-[50%] flex flex-col ">
                            <strong style={{ color: "grey" }}>
                              Client Description:{" "}
                            </strong>
                          </div>
                          <div className="w-[50%] h-36 overflow-hidden hover:overflow-y-scroll">
                            <span className="text-black text-sm">
                              {itemData?.client[0]?.description}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* highlights */}
                      <div
                        className="flex border-b border-solid border-custom-purple"
                        style={{ width: "70%" }}
                      >
                        <div className="w-[50%]">
                          <strong style={{ color: "grey" }}>Highlights:</strong>
                        </div>
                        <div className="w-[50%] flex flex-col">
                          {itemData?.highlights.map((highlight, index) => (
                            <div className="flex flex-col border-b border-custom-purple mb-2">
                              <div>
                                <span className="text-custom-grey font-semibold">
                                  Heading : {highlight.heading}
                                </span>
                              </div>
                              <div>
                                <span
                                  key={index}
                                  className="text-black text-sm"
                                >
                                  Description : {highlight.description}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* goals */}
                      <div
                        className="flex border-b border-solid border-custom-purple"
                        style={{ width: "70%" }}
                      >
                        <div className="w-[50%]">
                          <strong style={{ color: "grey" }}>Goals:</strong>
                        </div>
                        <div className="w-[50%] flex flex-col">
                          {itemData?.goals.map((goals, index) => (
                            <div className="flex flex-col border-b border-custom-purple mb-2">
                              <div>
                                <span className="text-custom-grey font-semibold">
                                  Heading : {goals.heading}
                                </span>
                              </div>
                              <div>
                                <span
                                  key={index}
                                  className="text-black text-sm"
                                >
                                  Description : {goals.description}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* challenges */}
                      <div
                        className="flex border-b border-solid border-custom-purple"
                        style={{ width: "70%" }}
                      >
                        <div className="w-[50%]">
                          <strong style={{ color: "grey" }}>Challenges:</strong>
                        </div>
                        <div className="w-[50%] flex flex-col">
                          {itemData?.challenges.map((challenges, index) => (
                            <div className="flex flex-col border-b border-custom-purple mb-2">
                              <div>
                                <span className="text-custom-grey font-semibold">
                                  Heading : {challenges.heading}
                                </span>
                              </div>
                              <div>
                                <span
                                  key={index}
                                  className="text-black text-sm"
                                >
                                  Description : {challenges.description}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* results */}
                      <div
                        className="flex border-b border-solid border-custom-purple"
                        style={{ width: "70%" }}
                      >
                        <div className="w-[50%]">
                          <strong style={{ color: "grey" }}>Results :</strong>
                        </div>

                        <div className="w-[50%] flex flex-col">
                          <div className="flex flex-col border-b  border-custom-purple mb-2">
                            <span className="text-custom-grey font-semibold">
                              Results Description:
                            </span>
                            <span className="text-black text-sm">
                              {itemData?.results?.description}
                            </span>
                          </div>
                          {itemData?.results?.subHeadings?.map(
                            (results, index) => (
                              <div className="flex flex-col border-b  border-custom-purple mb-2">
                                <div>
                                  <span className="text-custom-grey font-semibold">
                                    Heading : {results.heading}
                                  </span>
                                </div>
                                <div>
                                  <span
                                    key={index}
                                    className="text-black text-sm"
                                  >
                                    Description : {results.description}
                                  </span>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      {/* Tech */}
                      <div className="flex flex-col mt-2 border-b border-solid border-custom-purple w-[70%] ">
                        <div className="w-[50%]">
                          <h1 className="text-heading text-xl font-bold">
                            Tech Stack
                          </h1>
                        </div>
                        {itemData &&
                          itemData.techStack &&
                          itemData.techStack.length > 0 &&
                          Object.entries(
                            groupBy(itemData.techStack, "type")
                          ).map(([type, options], index) => (
                            <div key={index} className=" flex flex-row mt-8">
                              <div className="w-[18%]">
                                <strong style={{ color: "grey" }}>
                                  {type}:
                                </strong>
                              </div>
                              <div className="w-[80%] flex flex-row flex-wrap justify-start gap-4  mb-2">
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
                          ))}
                      </div>

                      {/* Project Image */}
                      <div>
                        <div
                          className="flex border-b border-solid border-custom-purple flex-col"
                          style={{ width: "70%" }}
                        >
                          <span className="text-custom-purple font-extrabold">
                            Project Gallery{" "}
                          </span>
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
                        <div
                          className="flex border-b border-solid border-custom-purple"
                          style={{ width: "70%" }}
                        >
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
                  </div>
                  {/* Buttons  */}
                  <div className="w-full flex flex-row justify-center items-center mt-3">
                    <div className="w-[80%] flex justify-around">
                      <Button
                        icon={<FaPen />}
                        text={"Edit"}
                        click={() => handleEditClick(itemData)}
                      />

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
