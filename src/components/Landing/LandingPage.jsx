import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LandingCard } from "./LandingCard";
import { getLandingPage } from "../../api/landing";

// const data = [
//   {
//     heroDescription: "Leading provider of tech solutions.",
//     footerDescription: "Dedicated to innovation and excellence.",
//     email: "contact@techsolutions.com",
//     phone: "+1234567890",
//     address: "123 Tech Street, Silicon Valley, CA",
//     socialLinks: [
//       { name: "facebook", link: "https://twitter.com/techsolutions" },
//       { name: "youtube", link: "https://youtube.com/techsolutions" },
//     ],
//     workExperience: {
//       countries: "USA, Canada, Germany",
//       expEmployees: "200+",
//       scrumTeams: "15",
//       fullStackDev: "50+",
//     },
//     aboutDescription:
//       "TechSolutions specializes in providing high-quality IT services and innovative solutions to global clients.",
//     offshoreType: "Dedicated Development Center",
//     offshoreDescription:
//       "Offers flexible engagement models and full control over the process.",
//     offshoreAdvantages: [
//       "Cost Effective",
//       "Scalable Resources",
//       "Expert Teams",
//     ],
//     offshoreComparison: [
//       {
//         type: "Hourly",
//         comparisons: [
//           "Cost-effective",
//           "Flexible resource allocation",
//           "Pay-as-you-go model",
//           "No long-term commitment",
//           "Good for short-term projects",
//           "Quick project start",
//         ],
//       },
//       {
//         type: "Fixed",
//         comparisons: [
//           "Predictable cost",
//           "Strict project timeline",
//           "Defined scope of work",
//           "Less client involvement",
//           "Reduced risk for the client",
//           "Good for well-defined projects",
//         ],
//       },
//       {
//         type: "Bot",
//         comparisons: [
//           "Automated processes",
//           "24/7 availability",
//           "Scalable solution",
//           "Improved efficiency",
//           "Cost-effective in the long run",
//           "Reduces human error",
//         ],
//       },
//     ],
//     testimonials: [
//       {
//         name: "test1",
//         description: "description",
//         designation: "designation",
//         img: "dummy.png",
//       },
//       {
//         name: "test1",
//         description: "description",
//         designation: "designation",
//         img: "dummy.png",
//       },
//     ],
//     expertises: [
//       {
//         expertisename: "test",
//         expertisesdescription: "description",
//         expertisesimg: "expertises_dummy.png",
//       },
//       {
//         expertisename: "name1",
//         expertisesdescription: "description1",
//         expertisesimg: "expertises_dummy.png1",
//       },
//     ],
//     expertiseImage: "62bc76f7b3dc2f001f6b8b3c", // Example ObjectId from MongoDB
//     expertiseName: "Cloud Solutions",
//     expertiseDescription:
//       "Expertise in building scalable cloud platforms tailored to client needs.",
//   },
// ];

export const LandingPage = () => {
    const [data, setData] = useState([])
  const navigate = useNavigate();

  // const onView = (id) => {
  //   navigate(`view/${id}`);
  // };

  useEffect(() => {
    // console.log("newData", newData);
    getLandingPage()
      .then((res) => setData(res?.data))
      .catch((err) => console.log(err));
  }, []);
  console.log("data",data) 

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
        <h2 className="text-black text-2xl font-bold">Landing Page</h2>
      </div>

      {/* Center */}
      <div className="w-[90%] m-auto px-4 py-4 bg-backgroundColor my-3 border border-dashed border-[#0E7789] rounded-md">
        <div className="flex">
          <div className="flex flex-col w-full">
            <LandingCard data={data} />
          </div>
        </div>
      </div>
    </>
  );
};
