// CustomService Model (description,  Proposition, whychooseDesc,  WhyChoose[ref], delivers {actionDesc, actionDesc})
import React from "react";
import { useNavigate } from "react-router-dom";
import { ProductResearchCard } from "./ProductResearchCard";

const data = [
  {
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur recusandae quaerat est et culpa unde perferendis voluptates qui quo laudantium!",
    keyComponents: [
      { heading: "Market Analysis", points:["lorem42", "lorem20"]  },
      { heading: "Client", points:["lorem42", "lorem20"]  },
      { heading: "Feasibility", points:["lorem42", "lorem20"]  },
      { heading: "Road Map", points:["lorem42", "lorem20"]  },
    ],
    whyChoose: ["a", "b", "c"],
  },
];

export const ProductResearchPage = () => {
  //   const [data, setData] = useState();
  const navigate = useNavigate();

  const onView = (id) => {
    navigate(`view/${id}`);
  };

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
          {data &&
            data.map((item, index) => (
              <div key={index} className="flex flex-col w-full">
                <ProductResearchCard data={item} onView={() => onView(index)} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
