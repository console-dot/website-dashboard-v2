import { useEffect, useState } from "react";
import { Button } from "../Button";
import { FaDotCircle,  FaPlus, FaTrash } from "react-icons/fa";
import { RiLoader3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LandingPageEdit() {
  const [formData, setFormData] = useState({
    heroDescription: "Leading provider of tech solutions.",
    footerDescription: "Dedicated to innovation and excellence.",
    email: "contact@techsolutions.com",
    phone: "+1234567890",
    address: "123 Tech Street, Silicon Valley, CA",
    socialLinks: [
      { name: "facebook", link: "https://twitter.com/techsolutions" },
      { name: "youtube", link: "https://youtube.com/techsolutions" },
    ],
    workExperience: {
      countries: "USA, Canada, Germany",
      expEmployees: "200+",
      scrumTeams: "15",
      fullStackDev: "50+",
    },
    aboutDescription:
      "TechSolutions specializes in providing high-quality IT services and innovative solutions to global clients.",
    offshoreType: "Dedicated Development Center",
    offshoreDescription:
      "Offers flexible engagement models and full control over the process.",
    offshoreAdvantages: [
      "Cost Effective",
      "Scalable Resources",
      "Expert Teams",
    ],
    offshoreComparison: [
      {
        type: "Hourly",
        comparisons: [
          "Cost-effective",
          "Flexible resource allocation",
          "Pay-as-you-go model",
          "No long-term commitment",
          "Good for short-term projects",
          "Quick project start",
        ],
      },
      {
        type: "Fixed",
        comparisons: [
          "Predictable cost",
          "Strict project timeline",
          "Defined scope of work",
          "Less client involvement",
          "Reduced risk for the client",
          "Good for well-defined projects",
        ],
      },
      {
        type: "Bot",
        comparisons: [
          "Automated processes",
          "24/7 availability",
          "Scalable solution",
          "Improved efficiency",
          "Cost-effective in the long run",
          "Reduces human error",
        ],
      },
    ],
    testimonialFullName: "Jane Doe",
    testimonialDescription:
      "The team at TechSolutions went above and beyond to meet our needs.",
    testimonialDesignation: "CEO of Innovative Tech Co.",
    expertiseName: "Cloud Solutions",
    expertiseDescription:
      "Expertise in building scalable cloud platforms tailored to client needs.",
  });// State declarations
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
    const [isModalOpenSocialLink, setIsModalOpenSocialLink] = useState(false);
  const [socialLinks, setSocialLinks] = useState([]);
  const [socialLinkName, setSocialLinkName] = useState("");
  const [socialLinkURL, setSocialLinkURL] = useState("");
  
  // Modal functions
  const openModalSocialLink = () => setIsModalOpenSocialLink(true);
  const closeModalSocialLink = () => setIsModalOpenSocialLink(false);
   
  // Social link functions
  const addSocialLink = () => {
    if (socialLinkName.trim() !== "" && socialLinkURL.trim() !== "") {
      setFormData((prevData) => ({
        ...prevData,
        socialLinks: [
          ...prevData.socialLinks,
          { name: socialLinkName, link: socialLinkURL },
        ],
      }));
      closeModalSocialLink();
      setSocialLinkName("");
      setSocialLinkURL("");
    }
  };
  const removeSocialLink = (index) => {
    setSocialLinks((prevLinks) => prevLinks.filter((_, i) => i !== index));
  };
  
  // Image upload functions
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
  
  // Form handling functions
  const handleChangeExperience = (e, field) => {
    const value = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      workExperience: {
        ...prevState.workExperience,
        [field]: value,
      },
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Form submitted", {
        autoClose: 1500,
        onClose: () => navigate("/LandingPage"),
      });
    }, 1500);
    if (!isModalOpenSocialLink) {
      console.log(formData);
    }
  };
  
  // Effect
  useEffect(() => {
    setSocialLinks(formData.socialLinks);
  }, [formData.socialLinks]);
  

  return (
    <div className="w-full">
      <form
        className="flex justify-center flex-col w-[50%] m-auto gap-2"
        method="post"
        onSubmit={handleSubmit}
      >
        {/* introduction start */}
        <div>
          <h1 className="text-[28px] text-custom-purple mb-4 mt-2 font-bold text-center">
            Landing Page Edit
          </h1>

          <h1 className="text-[28px] text-custom-purple mb-4 mt-2 font-bold text-center">
            Introduction
          </h1>
          <div className="mt-4">
            <label className="text-webDescrip font-semibold mt-4">
              Hero Description
            </label>
            <textarea
              className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="heroDescription"
              id="heroDescription"
              onChange={handleChange}
              value={formData?.heroDescription}
              placeholder="Hero Description"
            />
          </div>
          <div className="mt-4">
            <label className="text-webDescrip font-semibold mt-4">
              Footer Description
            </label>
            <textarea
              className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="footerDescription"
              id="footerDescription"
              onChange={handleChange}
              value={formData?.footerDescription}
              placeholder="footerdescription"
            />
          </div>

          <div className="mt-4">
            <label className="text-webDescrip font-semibold mt-4">E-Mail</label>
            <input
              className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="email"
              id="email"
              onChange={handleChange}
              value={formData?.email}
              placeholder="email"
            />
          </div>

          <div className="mt-4">
            <label className="text-webDescrip font-semibold mt-4">Phone</label>
            <input
              className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="phone"
              id="phone"
              onChange={handleChange}
              value={formData?.phone}
              placeholder="Phone"
            />
          </div>
          <div className="mt-4">
            <label className="text-webDescrip font-semibold mt-4">
              Address
            </label>
            <input
              className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="address"
              id="address"
              onChange={handleChange}
              value={formData?.address}
              placeholder="address"
            />
          </div>
          <div className="mt-4">
            <label className="text-webDescrip font-semibold mt-4">
              Social Links
            </label>
            <div className="w-full flex flex-col justify-start items-center border border-dashed border-custom-purple rounded-lg p-4">
              <div className="w-full flex gap-2 justify-between mb-4 flex-col ">
                {socialLinks &&
                  socialLinks.length > 0 &&
                  socialLinks.map((socialLink, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2"
                    >
                      <p className="">
                        <span className="text-webDescrip">
                          {socialLink.name}
                        </span>{" "}
                        :{" "}
                        <a className="text-blue-900" href={socialLink.link}>
                          {socialLink.link}
                        </a>
                      </p>
                      <button
                        type="button"
                        onClick={() => removeSocialLink(index)}
                        className="btn btn-error text-white rounded-xl"
                      >
                        <FaTrash />
                        Remove
                      </button>
                    </div>
                  ))}
              </div>
            </div>
            <div className="w-[100%] flex justify-center items-center">
              <Button
                text={"Add Social Link"}
                icon={<FaPlus />}
                click={openModalSocialLink}
              />
            </div>
          </div>
          {/* Social link modal */}
          {isModalOpenSocialLink && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50">
              <div className="bg-white w-[30%] h-[35%] flex flex-col justify-center p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Add Social Link</h2>
                <input
                  type="text"
                  value={socialLinkName}
                  onChange={(e) => setSocialLinkName(e.target.value)}
                  className="bg-white border border-custom-purple text-webDescrip p-2 w-full mb-2"
                  placeholder="Enter link name"
                />
                <input
                  type="text"
                  value={socialLinkURL}
                  onChange={(e) => setSocialLinkURL(e.target.value)}
                  className="bg-white border border-custom-purple text-webDescrip p-2 w-full mb-2"
                  placeholder="Enter link URL"
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={addSocialLink}
                    className="bg-blue-500 text-white px-4 py-2 rounded-full mr-2 hover:bg-blue-600"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={closeModalSocialLink}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          <label className="text-webDescrip font-semibold mt-4">
            Work Experience
          </label>
          <div>
            <div className="mt-4">
              <label>Countries</label>
              <input
                className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                name="countries"
                id="countries"
                onChange={(e) => handleChangeExperience(e, "countries")}
                value={formData?.workExperience?.countries}
                placeholder="Countries"
              />
            </div>
            <div className="mt-4">
              <label>Employees</label>
              <input
                className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                name="expEmployees"
                id="expEmployees"
                onChange={(e) => handleChangeExperience(e, "expEmployees")}
                value={formData?.workExperience?.expEmployees}
                placeholder="Employees"
              />
            </div>
            <div className="mt-4">
              <label>Scrum Teams</label>
              <input
                className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                name="scrumTeams"
                id="scrumTeams"
                onChange={(e) => handleChangeExperience(e, "scrumTeams")}
                value={formData?.workExperience?.scrumTeams}
                placeholder="Scrum Teams"
              />
            </div>
            <div className="mt-4">
              <label>Full Stack Developers</label>
              <input
                className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                name="fullStackDev"
                id="fullStackDev"
                onChange={(e) => handleChangeExperience(e, "fullStackDev")}
                value={formData?.workExperience?.fullStackDev}
                placeholder="Full Stack Developers"
              />
            </div>
          </div>
        </div>
        {/* introduction End */}

        {/* about start */}
        <div>
          <h1 className="text-[28px] text-custom-purple mb-4 mt-2 font-bold text-center ">
            About
          </h1>
          <label className="text-webDescrip font-semibold mt-4">
            About Description
          </label>
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
         

          {/*  */}
          <div className="mt-4">
            <label className="text-webDescrip font-semibold mt-4">
              Offshore Comparison
            </label>
            <div className="w-full flex flex-row justify-start  border border-dashed border-custom-purple rounded-lg p-4">
              {formData.offshoreComparison.map((comparison, index) => (
                <div key={index} className="w-full flex flex-col gap-6 mb-4 ">
                  <div className="flex justify-between items-center ml-1">
                    {/* Render type with edit and delete buttons */}
                    <h3 className="text-lg font-semibold">{comparison.type}</h3>
                    <div className="flex items-center gap-2">
                     
                    </div>
                  </div>
                  <div>
                    {comparison.comparisons.map((advantage, idx) => (
                      <div key={idx} className="flex justify-start ml-6  ">
                        <ul className="text-webDescrip flex   gap-2" style={{ listStyle: "unset" }} ><li> {advantage}</li> </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Remaining form fields */}

          {/* Modal */}
          

          {/*  */}
        </div>
        {/* offshore end */}

        {/*  Testimonials start*/}
        <div>
          <h1 className="text-[28px] text-custom-purple mb-4 mt-2 font-bold text-center ">
            Testimonials
          </h1>
          <div className="mt-4">
            <label className="text-webDescrip font-semibold mt-4">
              Testimonial Image
            </label>
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
                <label className="text-webDescrip font-semibold mt-4">
                  Preview:
                </label>
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
          </div>

          <div className="mt-4">
            <label className="text-webDescrip font-semibold mt-4">
              Testimonial FullName
            </label>
            <input
              className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="testimonialFullName"
              id="testimonialFullName"
              onChange={handleChange}
              value={formData?.testimonialFullName}
              placeholder="testimonialFullName"
            />
          </div>
          <div className="mt-4">
            <label className="text-webDescrip font-semibold mt-4">
              Testimonial Description
            </label>
            <textarea
              className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="testimonialDescription"
              id="testimonialDescription"
              onChange={handleChange}
              value={formData?.testimonialDescription}
              placeholder="Testimonial Description"
            />
          </div>
          <div className="mt-4">
            <label className="text-webDescrip font-semibold mt-4">
              Testimonial Designation
            </label>
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
        </div>
        {/*  Testimonials end*/}

        {/*  Experties start*/}
        <div>
          <h1 className="text-[28px] text-custom-purple mb-4 mt-2 font-bold text-center ">
            Experties
          </h1>
          <div className="mt-4">
            <label className="text-webDescrip font-semibold mt-4">
              Expertise Image
            </label>
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
                <label className="text-webDescrip font-semibold mt-4">
                  Preview:
                </label>
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
          </div>
          <div className="mt-4">
            <label className="text-webDescrip font-semibold mt-4">
              Expertise Name
            </label>
            <input
              className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="expertiseName"
              id="expertiseName"
              onChange={handleChange}
              value={formData?.expertiseName}
              placeholder="Expertise Name"
            />
          </div>
          <div className="mt-4">
            <label className="text-webDescrip font-semibold mt-4">
              Expertise Description
            </label>
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
        </div>
        {/*  Experties end*/}

        <div className="w-full flex justify-center items-center mt-4 mb-4">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading}
            className={`text-white text-[16px] w-[300px] h-[48px] px-5 bg-gradient-to-r from-fromclr to-toclr hover:bg-gradient-to-r hover:from-toclr hover:to-fromclr rounded-full flex justify-center items-center focus:outline-none relative`}
          >
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <RiLoader3Line className="animate-spin h-5 w-5 mr-3" />
                <span>Submitting</span>
              </div>
            ) : (
              <p className="font-Lato text-base font-medium leading-[28px] tracking-normal">
                Submit
              </p>
            )}
          </button>
          <ToastContainer />
        </div>
      </form>
    </div>
  );
}
