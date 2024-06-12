import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getHeroDescription, getcaseStudiespage } from "../../api";
import { setCaseStudiesData, setHeroDescriptionData } from "../../redux";
import { CaseStudiesCard } from "./CaseStudiesCard";
import { FaPlus } from "react-icons/fa";

export const CaseStudiesPage = () => {
  const [herodata, setHeroData] = useState(null);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Navigate to view case study
  const onView = (id) => {
    navigate(`view/${id}`);
  };

  // Fetch case studies data
  useEffect(() => {
    getcaseStudiespage()
      .then((res) => {
        setData(res?.data);
        dispatch(setCaseStudiesData(res?.data));
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  // Fetch hero description data
  useEffect(() => {
    getHeroDescription()
      .then((res) => {
        setHeroData(res?.data);
        dispatch(setHeroDescriptionData(res?.data));
      })
      .catch((err) => console.log(err));
  }, [dispatch]);
 

  return (
    <>
      <div
        className="w-[90%] m-auto"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 className="text-black text-2xl font-bold">Case Studies Page</h2>
        <button
          type="button"
          onClick={() => {
            navigate(`/case-studies-new`);
          }}
          className="text-white btn btn-success flex items-center"
        >
          <FaPlus className="mr-2" />
          Add Case Study
        </button>
      </div>

      <div className="w-[90%] m-auto px-4 py-4 bg-backgroundColor my-3 border border-dashed border-[#0E7789] rounded-md">
        <div className="flex">
          <div className="flex flex-col w-full">
            {data ? (
              <CaseStudiesCard data={data} herodata={herodata} onView={onView} />
            ) : (
              <p>Loading case studies...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
