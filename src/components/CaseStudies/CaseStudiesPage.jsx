// CustomService Model (description,  Proposition, whychooseDesc,  WhyChoose[ref], delivers {actionDesc, actionDesc})
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getcaseStudiespage } from "../../api";
import { setCaseStudiesData } from "../../redux";
import { CaseStudiesCard } from "./CaseStudiesCard";
import { FaPlus } from "react-icons/fa";

export const CaseStudiesPage = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onView = (id) => {
    navigate(`view/${id}`);
  };

  useEffect(() => {
    getcaseStudiespage()
      .then((res) => {
        setData(res?.data);
        dispatch(setCaseStudiesData(res?.data));
      })
      .catch((err) => console.log(err));
  }, []);
 

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
          className="text-white btn btn-success"
        >
          <FaPlus />
          Add Case Study
        </button>
        {/* add add button and call the add api to add the case study and should open the modal on add button and ask the user to enter that data  */}
      </div>

      {/* Center */}
      <div className="w-[90%] m-auto px-4 py-4 bg-backgroundColor my-3 border border-dashed border-[#0E7789] rounded-md">
        <div className="flex">
          <div className="flex flex-col w-full">
            <CaseStudiesCard data={data} />
          </div>
        </div>
      </div>
    </>
  );
};
