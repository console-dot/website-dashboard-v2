// CustomService Model (description,  Proposition, whychooseDesc,  WhyChoose[ref], delivers {actionDesc, actionDesc})
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileAppCard } from "./MobileAppCard";
import { useDispatch } from "react-redux";
import { getMobDevelopment } from "../../api/mobdevelopment";
import { setmobdevData } from "../../redux/mobdevSlice";

// const data = [
//   {
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur recusandae quaerat est et culpa unde perferendis voluptates qui quo laudantium!",
//     proposition:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro?",
//     whyChoose: [
//       "Expertise",
//       "Innovative Solutions",
//       "Client Collaboration",
//       "Customization",
//     ],
//     whyChoose: [
//       {
//         name: "Expertise",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, praesentium. Corrupti delectus cum repellat porro sed ex eaque ipsum sapiente.",
//         image: "console_erp_image.jpg"
//       },
//       {
//         name: "Innovative Solutions",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, praesentium. Corrupti delectus cum repellat porro sed ex eaque ipsum sapiente.",
//         image: "SaaSbyonsoleDot.jpg"
//       },
//       {
//         name: "Client Collaboration",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, praesentium. Corrupti delectus cum repellat porro sed ex eaque ipsum sapiente.",
//         image: "console_mvp_image.jpg"
//       },
//       {
//         name: "Customization",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, praesentium. Corrupti delectus cum repellat porro sed ex eaque ipsum sapiente.",
//         image: "console_mvp_image.jpg"
//       },
      
//     ],
//     techStack: [
//       { name: "React", type: "Frontend", img: "react.png" },
//       { name: "Node.js", type: "Backend", img: "nodejs.png" },
//       // Add more technologies as needed
//     ],
//   },
// ];


export const MobileAppPage = () => {
  //   const [data, setData] = useState();

  const [data, setData] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    // console.log("newData", newData);
    getMobDevelopment()
      .then((res) => {
        setData(res?.data);
        dispatch(setmobdevData(res?.data));
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
          Mobile App Development Service Page
        </h2>
      </div>

      {/* Center */}
      <div className="w-[90%] m-auto px-4 py-4 bg-backgroundColor my-3 border border-dashed border-[#0E7789] rounded-md">
        <div className="flex">
          {data && (
              <div  className="flex flex-col w-full">
                <MobileAppCard data={data}  />
              </div>
            )}
        </div>
      </div>
    </>
  );
};
