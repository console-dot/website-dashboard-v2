import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function LandingPageEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   preview img start
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          testimonialImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleExpertiseImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          expertiseImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
    //   preview img end

  const [formData, setFormData] = useState({
    heroDescription: "Leading provider of tech solutions.",
    footerDescription: "Dedicated to innovation and excellence.",
    email: "contact@techsolutions.com",
    phone: "+1234567890",
    address: "123 Tech Street, Silicon Valley, CA",
    socialLinks: "https://twitter.com/techsolutions",
    workExperience:
      "Countries: USA, Canada, Germany, Employees: 200+, Scrum Teams: 15, Full Stack Dev: 50+",
    aboutDescription:
      "TechSolutions specializes in providing high-quality IT services and innovative solutions to global clients.",
    offshoreType: "Dedicated Development Center",
    offshoreDescription:
      "Offers flexible engagement models and full control over the process.",
    offshoreAdvantages: "Cost Effective, Scalable Resources, Expert Teams",
    offshoreComparison:
      "Dedicated Team, Freelance, Better Collaboration, Consistency",
    testimonialFullName: "Jane Doe",
    testimonialDescription:
      "The team at TechSolutions went above and beyond to meet our needs.",
    testimonialDesignation: "CEO of Innovative Tech Co.",
    expertiseName: "Cloud Solutions",
    expertiseDescription:
      "Expertise in building scalable cloud platforms tailored to client needs.",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    // dispatch(LandingPageEdit(formData));
    
    // navigate("/landingPage");
  };

  return (
    <div className="w-full">
      <form
        className="flex justify-center flex-col w-[50%] m-auto gap-2"
        method="post"
        onSubmit={handleSubmit}
      >
        {/* introduction start */}
        <div>
          <h1 className="text-[28px] text-custom-purple mb-4 mt-2  font-bold text-center ">
            Introduction
          </h1>
          <label>Hero Description</label>
          <textarea
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="heroDescription"
            id="heroDescription"
            onChange={handleChange}
            value={formData?.heroDescription}
            placeholder="Hero Description"
          />
          <label>Footer Description</label>
          <textarea
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="footerDescription"
            id="footerDescription"
            onChange={handleChange}
            value={formData?.footerDescription}
            placeholder="footerdescription"
          />
          <label>E-Mail</label>
          <input
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="email"
            id="email"
            onChange={handleChange}
            value={formData?.email}
            placeholder="email"
          />
          <label>Phone</label>
          <input
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="phone"
            id="phone"
            onChange={handleChange}
            value={formData?.phone}
            placeholder="Phone"
          />
          <label>Address</label>
          <input
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="address"
            id="address"
            onChange={handleChange}
            value={formData?.address}
            placeholder="address"
          />
          <label>Social Links</label>
          <input
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="socialLinks"
            id="socialLinks"
            onChange={handleChange}
            value={formData?.socialLinks}
            placeholder="Social Links"
          />
          <label>Work Experience</label>
          <input
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="workExperience"
            id="workExperience"
            onChange={handleChange}
            value={formData?.workExperience}
            placeholder="Work Experience"
          />
        </div>
        {/* introduction End */}

        {/* about start */}
        <div>
          <h1 className="text-[28px] text-custom-purple mb-4 mt-2 font-bold text-center ">
            About
          </h1>
          <label>About Description</label>
          <textarea
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="aboutDescription"
            id="aboutDescription"
            onChange={handleChange}
            value={formData?.aboutDescription}
            placeholder="About Description"
          />
        </div>
        {/* about end */}

        {/* offshore start */}
        <div>
          <h1 className="text-[28px] text-custom-purple mb-4 mt-2 font-bold text-center ">
            Offshore
          </h1>
          <label>Offshore Type</label>
          <input
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="offshoreType"
            id="offshoreType"
            onChange={handleChange}
            value={formData?.offshoreType}
            placeholder="Offshore Type"
          />
          <label>Offshore Description</label>
          <textarea
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="offshoreDescription"
            id="offshoreDescription"
            onChange={handleChange}
            value={formData?.offshoreDescription}
            placeholder="Offshore Description"
          />
          <label>Offshore Advantages</label>
          <input
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="offshoreAdvantages"
            id="offshoreAdvantages"
            onChange={handleChange}
            value={formData?.offshoreAdvantages}
            placeholder="Offshore Advantages"
          />
          <label>Offshore Comparison</label>
          <input
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="offshoreComparison"
            id="offshoreComparison"
            onChange={handleChange}
            value={formData?.offshoreComparison}
            placeholder="Offshore Comparison"
          />
        </div>
        {/* offshore end */}

        {/*  Testimonials start*/}
        <div>
          <h1 className="text-[28px] text-custom-purple mb-4 mt-2 font-bold text-center ">
            Testimonials
          </h1>
          <label>Testimonial Image</label>
          <input
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="file"
            name="testimonialImage"
            id="testimonialImage"
            onChange={handleImageUpload}
            placeholder="Testimonial Image"
          />

          {formData.testimonialImage && (
            <div>
              <h2>Preview:</h2>
              <img
                src={formData.testimonialImage}
                alt="Testimonial Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  marginTop: "10px",
                }}
              />
            </div>
          )}

          <label>Testimonial FullName</label>
          <input
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="testimonialFullName"
            id="testimonialFullName"
            onChange={handleChange}
            value={formData?.testimonialFullName}
            placeholder="testimonialFullName"
          />
          <label>Testimonial Description</label>
          <textarea
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="testimonialDescription"
            id="testimonialDescription"
            onChange={handleChange}
            value={formData?.testimonialDescription}
            placeholder="Testimonial Description"
          />
          <label>Testimonial Designation</label>
          <input
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="testimonialDesignation"
            id="testimonialDesignation"
            onChange={handleChange}
            value={formData?.testimonialDesignation}
            placeholder="Testimonial Designation"
          />
        </div>
        {/*  Testimonials end*/}

         {/*  Experties start*/}
         <div>
          <h1 className="text-[28px] text-custom-purple mb-4 mt-2 font-bold text-center ">
            Experties
          </h1>
          <label>Expertise Image</label>
          <input
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="file"
            name="expertiseImage"
            id="expertiseImage"
            onChange={handleExpertiseImageUpload}
            placeholder="expertise Image"
          />

          {formData.expertiseImage && (
            <div>
              <h2>Preview:</h2>
              <img
                src={formData.expertiseImage}
                alt="Testimonial Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  marginTop: "10px",
                }}
              />
            </div>
          )}

          <label>Expertise Name</label>
          <input
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="expertiseName"
            id="expertiseName"
            onChange={handleChange}
            value={formData?.expertiseName}
            placeholder="Expertise Name"
          />
          <label>Expertise Description</label>
          <textarea
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="expertiseDescription"
            id="expertiseDescription"
            onChange={handleChange}
            value={formData?.expertiseDescription}
            placeholder="Expertise Description"
          />
         
        </div>
        {/*  Experties end*/}

        <div className="w-full flex justify-center items-center mt-4">
          <button className="text-white text-[16px] w-[300px] px-5 py-2.5 bg-gradient-to-r from-fromclr to-toclr hover:bg-gradient-to-r hover:from-toclr hover:to-fromclr rounded-full focus:outline-none active:bg-gradient-to-r active:from-custom-purple active:to-custom-blue">
            <p className="font-Lato text-base font-medium leading-[28px] tracking-normal">
              Submit
            </p>
          </button>
        </div>
      </form>
    </div>
  );
}
