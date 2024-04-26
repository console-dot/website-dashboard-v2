import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";

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
                  <h1 className="text-black font-bold">Introduction</h1>
                  <div style={{ width: "48%" }}>
                    <strong style={{ color: "grey" }}>heroDescription: </strong>
                    <span className="text-black text-sm">
                      {data?.heroDescription}
                    </span>
                  </div>
                  <div style={{ width: "48%" }}>
                    <strong style={{ color: "grey" }}>
                      footerDescription:{" "}
                    </strong>
                    <span className="text-black text-sm">
                      {data?.footerDescription}
                    </span>
                  </div>
                  <div style={{ width: "48%" }}>
                    <strong style={{ color: "grey" }}>email: </strong>
                    <span className="text-black text-sm">{data?.email}</span>
                  </div>
                  <div style={{ width: "48%" }}>
                    <strong style={{ color: "grey" }}>phone: </strong>
                    <span className="text-black text-sm">{data?.phone}</span>
                  </div>
                  <div style={{ width: "48%" }}>
                    <strong style={{ color: "grey" }}>address: </strong>
                    <span className="text-black text-sm">{data?.address}</span>
                  </div>
                  <div style={{ width: "48%" }}>
                    <strong style={{ color: "grey" }}>socialLinks: </strong>
                    <span className="text-black text-sm">
                      {data?.socialLinks}
                    </span>
                  </div>
                  <div style={{ width: "48%" }}>
                    <strong style={{ color: "grey" }}>workExperience: </strong>
                    <span className="text-black text-sm">
                      Countries: {data.workExperience.countries}, Employees:{" "}
                      {data.workExperience.expEmployees}, Scrum Teams:{" "}
                      {data.workExperience.scrumTeams}, Full Stack Dev:{" "}
                      {data.workExperience.fullStackDev}
                    </span>
                  </div>
                </div>

                {/* About */}
                <div className="w-full flex flex-col gap-2 mt-4">
                  <h1 className="text-black font-bold">About</h1>
                  <div style={{ width: "48%" }}>
                    <strong style={{ color: "grey" }}>
                      aboutDescription:{" "}
                    </strong>
                    <span className="text-black text-sm">
                      {data?.aboutDescription}
                    </span>
                  </div>
                </div>

                {/* Offshore */}
                <div className="w-full flex flex-col gap-2 mt-4">
                  <h1 className="text-black font-bold">Offshore</h1>
                  <div style={{ width: "48%" }}>
                    <strong style={{ color: "grey" }}>offshoreType: </strong>
                    <span className="text-black text-sm">
                      {data?.offshoreType}
                    </span>
                  </div>
                  <div style={{ width: "48%" }}>
                    <strong style={{ color: "grey" }}>
                      offshoreDescription:{" "}
                    </strong>
                    <span className="text-black text-sm">
                      {data?.offshoreDescription}
                    </span>
                  </div>
                  <div style={{ width: "48%" }}>
                    <strong style={{ color: "grey" }}>
                      offshoreAdvantages:{" "}
                    </strong>
                    <span className="text-black text-sm">
                      {data?.offshoreAdvantages &&
                        data.offshoreAdvantages.map((advantage, index) => (
                          <span key={index}>
                            {advantage}
                            {index !== data.offshoreAdvantages.length - 1 &&
                              ", "}
                          </span>
                        ))}
                    </span>
                  </div>
                  <div style={{ width: "48%" }}>
                    <strong style={{ color: "grey" }}>
                      offshoreComparison:{" "}
                    </strong>
                    <span className="text-black text-sm">
                      {data?.offshoreComparison &&
                        data.offshoreComparison.map((advantage, index) => (
                          <span key={index}>
                            {advantage}
                            {index !== data.offshoreComparison.length - 1 &&
                              ", "}
                          </span>
                        ))}
                    </span>
                  </div>
                </div>

                {/* Testimonials */}
                <div className="w-full flex flex-col gap-2 mt-4">
                  <h1 className="text-black font-bold">Testimonials</h1>
                  <div style={{ width: "48%" }}>
                    <strong style={{ color: "grey" }}>
                      testimonialImage:{" "}
                    </strong>
                    <span className="text-black text-sm">
                      {data?.testimonialImage}
                    </span>
                  </div>
                  <div style={{ width: "48%" }}>
                    <strong style={{ color: "grey" }}>
                      testimonialFullName:{" "}
                    </strong>
                    <span className="text-black text-sm">
                      {data?.testimonialFullName}
                    </span>
                  </div>
                  <div style={{ width: "48%" }}>
                    <strong style={{ color: "grey" }}>
                      testimonialDescription:{" "}
                    </strong>
                    <span className="text-black text-sm">
                      {data?.testimonialDescription}
                    </span>
                  </div>
                  <div style={{ width: "48%" }}>
                    <strong style={{ color: "grey" }}>
                      testimonialDesignation:{" "}
                    </strong>
                    <span className="text-black text-sm">
                      {data?.testimonialDesignation}
                    </span>
                  </div>
                </div>

                {/* Expertise */}
                <div className="w-full flex flex-col gap-2 mt-4">
                  <h1 className="text-black font-bold">Expertise</h1>
                  <div style={{ width: "48%" }}>
                    <strong style={{ color: "grey" }}>expertiseImage: </strong>
                    <span className="text-black text-sm">
                      {data?.expertiseImage}
                    </span>
                  </div>
                  <div style={{ width: "48%" }}>
                    <strong style={{ color: "grey" }}>expertiseName: </strong>
                    <span className="text-black text-sm">
                      {data?.expertiseName}
                    </span>
                  </div>
                  <div style={{ width: "48%" }}>
                    <strong style={{ color: "grey" }}>
                      expertiseDescription:{" "}
                    </strong>
                    <span className="text-black text-sm">
                      {data?.expertiseDescription}
                    </span>
                  </div>
                </div>

                {/* End */}
              </div>
              <div className="w-full flex flex-row justify-around ">
              <Button text={'Edit'} click={()=>{navigate(`/LandingPage/edit/${123}`)}}/>
              <Button text={'View'}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
