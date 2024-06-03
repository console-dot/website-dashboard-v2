// CustomService Model (description,  Proposition, whychooseDesc,  WhyChoose[ref], delivers {actionDesc, actionDesc})
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductResearchCard } from "./ProductResearchCard";
import { getcustomservicepage } from "../../api/customservice";
import { getproductresearchpage } from "../../api/productresearch";
import { setproductresearchData } from "../../redux/productresearchSlice";
import { useDispatch } from "react-redux";

export const ProductResearchPage = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getproductresearchpage()
      .then((res) => {
        setData(res?.data);
        dispatch(setproductresearchData(res?.data));
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
        <h2 className="text-black text-2xl font-bold">
          Product Research Service Page
        </h2>
      </div>

      {/* Center */}
      <div className="w-[90%] m-auto px-4 py-4 bg-backgroundColor my-3 border border-dashed border-[#0E7789] rounded-md">
        <div className="flex">
          <div className="flex flex-col w-full">
            <ProductResearchCard data={data} />
          </div>
        </div>
      </div>
    </>
  );
};
