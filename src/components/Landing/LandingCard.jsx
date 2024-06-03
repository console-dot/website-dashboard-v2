import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { FaEye, FaPen } from "react-icons/fa";
import config from "../../api/config";

export const LandingCard = ({ data, key, value }) => {
  const BASE_URL = config.BASE_URL;
  const navigate = useNavigate();
  if (!data) return null;
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
                        {data?.intro?.heroDescription}
                      </span>
                    </div>
                  </div>
                  <div
                    className="flex border-b border-solid border-custom-purple"
                    style={{ width: "70%" }}
                  >
                    <div className="w-[50%]">
                      <strong style={{ color: "grey" }}>
                        Footer Description:{" "}
                      </strong>
                    </div>
                    <div className="w-[50%]">
                      <span className="text-black text-sm">
                        {data?.intro?.footerDescription}
                      </span>
                    </div>
                  </div>
                  <div
                    className="flex border-b border-solid border-custom-purple"
                    style={{ width: "70%" }}
                  >
                    <div className="w-[50%]">
                      <strong style={{ color: "grey" }}>Email: </strong>
                    </div>
                    <div className="w-[50%]">
                      <span className="text-black text-sm">
                        {data?.intro?.email}
                      </span>
                    </div>
                  </div>
                  <div
                    className="flex border-b border-solid border-custom-purple"
                    style={{ width: "70%" }}
                  >
                    <div className="w-[50%]">
                      <strong style={{ color: "grey" }}>Phone: </strong>
                    </div>
                    <div className="w-[50%]">
                      <span className="text-black text-sm">
                        {data?.intro?.phone}
                      </span>
                    </div>
                  </div>
                  <div
                    className="flex border-b border-solid border-custom-purple"
                    style={{ width: "70%" }}
                  >
                    <div className="w-[50%]">
                      <strong style={{ color: "grey" }}>Address: </strong>
                    </div>
                    <div className="w-[50%]">
                      <span className="text-black text-sm">
                        {data?.intro?.address}
                      </span>
                    </div>
                  </div>
                  <div
                    className="flex border-b border-solid border-custom-purple"
                    style={{ width: "70%" }}
                  >
                    <div className="w-[50%]">
                      <strong style={{ color: "grey" }}>Social Links: </strong>
                    </div>
                    <div className="w-[50%] flex justify-start flex-col">
                      {data?.intro?.socialLinks &&
                        data?.intro?.socialLinks?.map((link) => (
                          <span className="text-black text-sm" key={link?._id}>
                            <span className="text-heading font-semibold mr-2">
                              {link.name}
                            </span>
                            : <a href={link.link}>{link.link}</a>
                            {link?._id !==
                              data?.intro?.socialLinks.length - 1 && " "}
                          </span>
                        ))}
                    </div>
                  </div>
                  <div
                    className="flex border-b border-solid border-custom-purple"
                    style={{ width: "70%" }}
                  >
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
                            {data?.intro?.workExperience?.countries},
                          </span>
                        </div>
                        <div className="flex flex-row">
                          <span className="text-heading font-semibold mr-2">
                            Employees:{" "}
                          </span>
                          <span className="block">
                            {data?.intro?.workExperience?.expEmployees},
                          </span>
                        </div>
                        <div className="flex flex-row">
                          <span className="text-heading font-semibold mr-2">
                            Scrum Teams:{" "}
                          </span>
                          <span className="block">
                            {data?.intro?.workExperience?.scrumTeams},
                          </span>
                        </div>
                        <div className="flex flex-row">
                          <span className="text-heading font-semibold mr-2">
                            Full Stack Dev:{" "}
                          </span>
                          <span className="block">
                            {data?.intro?.workExperience?.fullStackDev}
                          </span>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>

                {/* About */}
                <div className="w-full flex flex-col gap-2 mt-4">
                  <h1 className="text-heading text-xl font-bold">About</h1>
                  <div
                    className="flex border-b border-solid border-custom-purple"
                    style={{ width: "70%" }}
                  >
                    <div className="w-[50%]">
                      <strong style={{ color: "grey" }}>
                        About Description:
                      </strong>
                    </div>
                    <div className="w-[50%]">
                      <span className="text-black text-sm">
                        {data?.about?.description}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Testimonials */}
                <div className="w-full flex flex-row gap-2 mt-4">
                  <h1 className="text-heading text-xl font-bold">
                    Testimonials
                  </h1>
                </div>
                <div className="flex flex-row mx-auto w-[60%]">
                  <div className="overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-row-group">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th className="px-6 py-3  text-left text-webDescrip">
                            Name
                          </th>
                          <th className="px-6 py-3  text-left text-webDescrip">
                            Designation
                          </th>
                          <th className="px-6 py-3  text-left text-webDescrip">
                            Description
                          </th>
                          <th className="px-6 py-3  text-left text-webDescrip">
                            Image
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.testimonial?.map((items) => (
                          <tr
                            key={items?._id}
                            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                          >
                            <td className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {items?.fullName}
                            </td>
                            <td className="px-6 py-1 ">{items?.designation}</td>
                            <td className="px-6 py-1 ">{items?.description}</td>
                            <td className="px-6 py-1 ">
                              <img
                                src={`${BASE_URL}/file/${items?.image}`}
                                alt={items?.fullName}
                                className="h-12 w-12"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* Expertise */}
                <div className="w-full flex flex-row gap-2 mt-4">
                  <h1 className="text-heading text-xl font-bold">Expertise</h1>
                </div>
                <div className="flex flex-row mx-auto w-[60%]">
                  <div className="overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-row-group">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th className="px-6 py-3 text-left text-webDescrip">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-webDescrip">
                            Description
                          </th>
                          <th className="px-6 py-3 text-left text-webDescrip">
                            Image
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.expertise?.map((items) => (
                          <tr
                            key={items?._id}
                            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                          >
                            <td className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {items?.name}
                            </td>
                            <td className="px-6 py-1 ">{items?.description}</td>
                            <td className="px-6 py-1 ">
                              <img
                                src={`${BASE_URL}/file/${items?.image}`}
                                alt={items?.name}
                                className="h-12 w-12"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Offshore */}
                <div className="border-t border-solid border-custom-purple w-full flex flex-col gap-2 mt-4">
                  <h1 className="text-heading text-xl font-bold">
                    Offshore Models
                  </h1>
                  {data?.offshoreComparison?.map((item) => (
                    <div
                      key={item?._id}
                      className="flex flex-row "
                      style={{ width: "100%" }}
                    >
                      {item?.offshoreType?.map((comparisonItem) => (
                        <div key={comparisonItem?.type} className="w-[50%]">
                          <strong style={{ color: "grey" }}>
                            {comparisonItem?.type}:
                          </strong>
                          <ul
                            style={{ listStyle: "unset  " }}
                            className="mt-4 pl-4 mb-4"
                          >
                            {comparisonItem?.comparison?.map((item, index) => (
                              <li
                                key={index}
                                className="text-black text-sm mb-2"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ))}
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
