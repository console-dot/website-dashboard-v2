// CustomService Model (description,  Proposition, whychooseDesc,  WhyChoose[ref], delivers {actionDesc, actionDesc})
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomServiceCard } from "./CustomServiceCard";
import { getcustomservicepage } from "../../api/customservice";

// const data = [
//   {
//     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur recusandae quaerat est et culpa unde perferendis voluptates qui quo laudantium!",
//     Proposition: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro?",
//     whychooseDesc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
//     whyChoose: [
//       {
//         name: "ConsoleDot ERP",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, praesentium. Corrupti delectus cum repellat porro sed ex eaque ipsum sapiente.",
//         image: "console_erp_image.jpg"
//       },
//       {
//         name: "SaaS by ConsoleDot",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, praesentium. Corrupti delectus cum repellat porro sed ex eaque ipsum sapiente.",
//         image: "SaaSbyonsoleDot.jpg"
//       },
//       {
//         name: "ConsoleDot MVP",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, praesentium. Corrupti delectus cum repellat porro sed ex eaque ipsum sapiente.",
//         image: "console_mvp_image.jpg"
//       },

//     ],
//     delivers: { actionDesc: "facebook", collabDesc: "youtube" }
//   }
// ];

export const CustomServicePage = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();

  const onView = (id) => {
    navigate(`view/${id}`);
  };

  useEffect(() => {
    getcustomservicepage()
      .then((res) => setData(res?.data))
      .catch((err) => console.log(err));
  }, []);
  console.log("data", data);
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
          Custom Software Service Page
        </h2>
      </div>

      {/* Center */}
      <div className="w-[90%] m-auto px-4 py-4 bg-backgroundColor my-3 border border-dashed border-[#0E7789] rounded-md">
        <div className="flex">
          <div className="flex flex-col w-full">
            <CustomServiceCard data={data} />
          </div>
        </div>
      </div>
    </>
  );
};
