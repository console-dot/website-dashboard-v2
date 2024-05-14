// CustomService Model (description,  Proposition, whychooseDesc,  WhyChoose[ref], delivers {actionDesc, actionDesc})
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiCard } from "./AiCard";
import { getArtificialIntelligence } from "../../api/ai";
import { useDispatch } from "react-redux";
import { setAiData } from "../../redux";

// const data = [
//   {
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur recusandae quaerat est et culpa unde perferendis voluptates qui quo laudantium!",

//     whyChoose: [
//       {
//         name: "Expertise",
//         description:
//           "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, praesentium. Corrupti delectus cum repellat porro sed ex eaque ipsum sapiente.",
//         image: "console_erp_image.jpg",
//       },
//       {
//         name: "Innovative ",
//         description:
//           "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, praesentium. Corrupti delectus cum repellat porro sed ex eaque ipsum sapiente.",
//         image: "SaaSbyonsoleDot.jpg",
//       },
//       {
//         name: "Client ",
//         description:
//           "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, praesentium. Corrupti delectus cum repellat porro sed ex eaque ipsum sapiente.",
//         image: "console_mvp_image.jpg",
//       },
//       {
//         name: "Customization",
//         description:
//           "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, praesentium. Corrupti delectus cum repellat porro sed ex eaque ipsum sapiente.",
//         image: "console_mvp_image.jpg",
//       },
//     ],
//     techStack: [
//       { name: "React", type: "Frontend", img: "react.png" },
//       { name: "Node.js", type: "Backend", img: "nodejs.png" },
//       // Add more technologies as needed
//     ],
//   },
// ];

export const AiPage = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onView = (id) => {
    navigate(`view/${id}`);
  };

  useEffect(() => {
    // console.log("newData", newData);
    getArtificialIntelligence()
      .then((res) => {
        setData(res?.data);
        dispatch(setAiData(res?.data));
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
          Artificial Intelligence Service Page
        </h2>
      </div>

      {/* Center */}
      <div className="w-[90%] m-auto px-4 py-4 bg-backgroundColor my-3 border border-dashed border-[#0E7789] rounded-md">
        <div className="flex">
          {data && (
            <div className="flex flex-col w-full">
              <AiCard data={data} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
