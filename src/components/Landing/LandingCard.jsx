import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { FaEye, FaPen } from "react-icons/fa";

export const LandingCard = ({ data, key, value }) => {
  const navigate = useNavigate();
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
                    Introduction
                  </h1>
                  <div className="flex" style={{ width: "70%" }}>
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
                  <div className="flex" style={{ width: "70%" }}>
                    <div className="w-[50%]">
                      <strong style={{ color: "grey" }}>
                        Footer Description:{" "}
                      </strong>
                    </div>
                    <div className="w-[50%]">
                      <span className="text-black text-sm">
                        {data?.footerDescription}
                      </span>
                    </div>
                  </div>
                  <div className="flex" style={{ width: "70%" }}>
                    <div className="w-[50%]">
                      <strong style={{ color: "grey" }}>Email: </strong>
                    </div>
                    <div className="w-[50%]">
                      <span className="text-black text-sm">{data?.email}</span>
                    </div>
                  </div>
                  <div className="flex" style={{ width: "70%" }}>
                    <div className="w-[50%]">
                      <strong style={{ color: "grey" }}>Phone: </strong>
                    </div>
                    <div className="w-[50%]">
                      <span className="text-black text-sm">{data?.phone}</span>
                    </div>
                  </div>
                  <div className="flex" style={{ width: "70%" }}>
                    <div className="w-[50%]">
                      <strong style={{ color: "grey" }}>Address: </strong>
                    </div>
                    <div className="w-[50%]">
                      <span className="text-black text-sm">
                        {data?.address}
                      </span>
                    </div>
                  </div>
                  <div className="flex" style={{ width: "70%" }}>
                    <div className="w-[50%]">
                      <strong style={{ color: "grey" }}>Social Links: </strong>
                    </div>
                    <div className="w-[50%]">
                      {data?.socialLinks &&
                        data.socialLinks.map((link, index) => (
                          <span className="text-black text-sm" key={index}>
                            <span className="text-heading font-semibold mr-2">
                              {link.name}
                            </span>
                            : <a href={link.link}>{link.link}</a>
                            {index !== data.socialLinks.length - 1 && ", "}
                          </span>
                        ))}
                    </div>
                  </div>
                  <div className="flex" style={{ width: "70%" }}>
                    <div className="w-[50%]">
                      <strong style={{ color: "grey" }}>
                        Work Experience:{" "}
                      </strong>
                    </div>
                    <div className="w-[50%]">
                      <span className="text-black text-sm">
                        <div className="flex flex-row">
                          <span className="text-heading font-semibold mr-2">
                            Countries:
                          </span>
                          <span className="block">
                            {data.workExperience.countries},
                          </span>
                        </div>
                        <div className="flex flex-row">
                          <span className="text-heading font-semibold mr-2">
                            Employees:{" "}
                          </span>
                          <span className="block">
                            {data.workExperience.expEmployees},
                          </span>
                        </div>
                        <div className="flex flex-row">
                          <span className="text-heading font-semibold mr-2">
                            Scrum Teams:{" "}
                          </span>
                          <span className="block">
                            {data.workExperience.scrumTeams},
                          </span>
                        </div>
                        <div className="flex flex-row">
                          <span className="text-heading font-semibold mr-2">
                            Full Stack Dev:{" "}
                          </span>
                          <span className="block">
                            {data.workExperience.fullStackDev}
                          </span>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>

                {/* About */}
                <div className="w-full flex flex-col gap-2 mt-4">
                  <h1 className="text-heading text-xl font-bold">About</h1>
                  <div className="flex" style={{ width: "70%" }}>
                    <div className="w-[50%]">
                      <strong style={{ color: "grey" }}>
                        About Description:
                      </strong>
                    </div>
                    <div className="w-[50%]">
                      <span className="text-black text-sm">
                        {data?.aboutDescription}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expertise */}
                <div className="w-full flex flex-col gap-2 mt-4">
                  <h1 className="text-heading text-xl font-bold">Expertise</h1>
                  <div className="flex" style={{ width: "70%" }}>
                    <div className="w-[50%]">
                      <strong style={{ color: "grey" }}>
                        Expertise Image:{" "}
                      </strong>
                    </div>
                    <div className="w-[50%]">
                      <span className="text-black text-sm">
                        {data?.expertiseImage}
                      </span>
                    </div>
                  </div>
                  <div className="flex" style={{ width: "70%" }}>
                    <div className="w-[50%]">
                      <strong style={{ color: "grey" }}>
                        Expertise Name:{" "}
                      </strong>
                    </div>
                    <div className="w-[50%]">
                      <span className="text-black text-sm">
                        {data?.expertiseName}
                      </span>
                    </div>
                  </div>
                  <div className="flex" style={{ width: "70%" }}>
                    <div className="w-[50%]">
                      <strong style={{ color: "grey" }}>
                        Expertise Description:{" "}
                      </strong>
                    </div>
                    <div className="w-[50%]">
                      <span className="text-black text-sm">
                        {data?.expertiseDescription}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Offshore */}
                <div className="w-full flex flex-col gap-2 mt-4">
                  <h1 className="text-heading text-xl font-bold">
                    Offshore Models
                  </h1>

                  {data.offshoreComparison.map((model) => (
                    <div
                      key={model.type}
                      className="flex"
                      style={{ width: "70%" }}
                    >
                      <div className="w-[50%]">
                        <strong style={{ color: "grey" }}>{model.type}:</strong>
                      </div>
                      <div className="w-[50%]">
                        <span className="text-black text-sm">
                          <ul style={{ listStyle: "unset" }}>
                            {model.comparisons.map((advantage, index) => (
                              <li key={index}>{advantage}</li>
                            ))}
                          </ul>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Testimonials */}
                <div className="w-full flex flex-col gap-2 mt-4">
                  <h1 className="text-heading text-xl font-bold">
                    Testimonials
                  </h1>
                  <div className="flex" style={{ width: "70%" }}>
                    <div className="w-[50%]">
                      <strong style={{ color: "grey" }}>
                        Testimonial Image:{" "}
                      </strong>
                    </div>
                    <div className="w-[50%]">
                      <span className="text-black text-sm">
                        {data?.testimonialImage}
                      </span>
                    </div>
                  </div>
                  <div className="flex" style={{ width: "70%" }}>
                    <div className="w-[50%]">
                      <strong style={{ color: "grey" }}>
                        Testimonial FullName:{" "}
                      </strong>
                    </div>
                    <div className="w-[50%]">
                      <span className="text-black text-sm">
                        {data?.testimonialFullName}
                      </span>
                    </div>
                  </div>
                  <div className="flex" style={{ width: "70%" }}>
                    <div className="w-[50%]">
                      <strong style={{ color: "grey" }}>
                        Testimonial Description:{" "}
                      </strong>
                    </div>
                    <div className="w-[50%]">
                      <span className="text-black text-sm">
                        {data?.testimonialDescription}
                      </span>
                    </div>
                  </div>
                  <div className="flex" style={{ width: "70%" }}>
                    <div className="w-[50%]">
                      <strong style={{ color: "grey" }}>
                        Testimonial Designation:{" "}
                      </strong>
                    </div>
                    <div className="w-[50%]">
                      <span className="text-black text-sm">
                        {data?.testimonialDesignation}
                      </span>
                    </div>
                  </div>
                </div>

                {/* End */}
              </div>
              <div className="w-full flex flex-row justify-center items-center">
                <div className="w-[80%] flex justify-around">
                  <Button
                    icon={<FaPen />}
                    text={"Edit"}
                    click={() => {
                      navigate(`/LandingPage/edit/${123}`);
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
