// CustomService Model (description,  Proposition, whychooseDesc,  WhyChoose[ref], delivers {actionDesc, actionDesc})
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductResearchCard } from "./ProductResearchCard";
import { getcustomservicepage } from "../../api/customservice";
import { getproductresearchpage } from "../../api/productresearch";

// const data = [
//   {
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur recusandae quaerat est et culpa unde perferendis voluptates qui quo laudantium!",
//     keyComponents: [
//       { heading: "Market Analysis", points:["lorem42", "lorem20"]  },
//       { heading: "Client", points:["lorem42", "lorem20"]  },
//       { heading: "Feasibility", points:["lorem42", "lorem20"]  },
//       { heading: "Road Map", points:["lorem42", "lorem20"]  },
//     ],
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
//   },
// ];

export const ProductResearchPage = () => {
    const [data, setData] = useState();
  const navigate = useNavigate();


  useEffect(() => {
    getproductresearchpage()
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
          Product Research Service Page
        </h2>
      </div>

      {/* Center */}
      <div className="w-[90%] m-auto px-4 py-4 bg-backgroundColor my-3 border border-dashed border-[#0E7789] rounded-md">
        <div className="flex">
          
              <div  className="flex flex-col w-full">
                <ProductResearchCard data={data}/>
              </div>
        
        </div>
      </div>
    </>
  );
};
