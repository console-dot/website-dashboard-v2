import { useEffect, useState } from "react";
import { Button } from "../Button";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function LandingPageEdit() {
  //   modal start

  // Modal state
  const [isModalOpenAdvantage, setIsModalOpenAdvantage] = useState(false);
  const [isModalOpenComparison, setIsModalOpenComparison] = useState(false);
  const [advantageInput, setAdvantageInput] = useState("");
  const [comparisonInput, setComparisonInput] = useState("");
  const [isModalOpenSocialLink, setIsModalOpenSocialLink] = useState(false);
  const [socialLinks, setSocialLinks] = useState([]); // Define socialLinks state
  const [socialLinkName, setSocialLinkName] = useState("");
  const [socialLinkURL, setSocialLinkURL] = useState("");

  // Modal functions
  const openModalAdvantage = () => setIsModalOpenAdvantage(true);
  const closeModalAdvantage = () => setIsModalOpenAdvantage(false);
  const openModalComparison = () => setIsModalOpenComparison(true);
  const closeModalComparison = () => setIsModalOpenComparison(false);
  const openModalSocialLink = () => setIsModalOpenSocialLink(true);
  const closeModalSocialLink = () => setIsModalOpenSocialLink(false);

  const addAdvantage = () => {
    if (advantageInput.trim() !== "") {
      setFormData((prevData) => ({
        ...prevData,
        offshoreAdvantages: [...prevData.offshoreAdvantages, advantageInput],
      }));
      setAdvantageInput("");
    }
  };

  const removeAdvantage = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      offshoreAdvantages: prevData.offshoreAdvantages.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const addComparison = () => {
    if (comparisonInput.trim() !== "") {
      setFormData((prevData) => ({
        ...prevData,
        offshoreComparison: [...prevData.offshoreComparison, comparisonInput],
      }));
      setComparisonInput("");
    }
  };

  const removeComparison = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      offshoreComparison: prevData.offshoreComparison.filter(
        (_, i) => i !== index
      ),
    }));
  };

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
      // Optionally clear input fields here
      setSocialLinkName("");
      setSocialLinkURL("");
    }
  };

  // Function to remove social link
  const removeSocialLink = (index) => {
    setSocialLinks((prevLinks) => prevLinks.filter((_, i) => i !== index));
  };

  // modal end

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

  //handlechangeexperience start
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

  //handlechangeexperience end

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
      "Dedicated Team",
      "Freelance",
      "Better Collaboration",
      "Consistency",
    ],
    testimonialFullName: "Jane Doe",
    testimonialDescription:
      "The team at TechSolutions went above and beyond to meet our needs.",
    testimonialDesignation: "CEO of Innovative Tech Co.",
    expertiseName: "Cloud Solutions",
    expertiseDescription:
      "Expertise in building scalable cloud platforms tailored to client needs.",
  });

  useEffect(() => {
    setSocialLinks(formData.socialLinks);
  }, [formData.socialLinks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !isModalOpenAdvantage &&
      !isModalOpenComparison &&
      !isModalOpenSocialLink
    ) {
      console.log(formData);
    }
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
          <div className="mt-4">
            <label className="text-webDescrip font-semibold ">
              Offshore Type
            </label>
            <input
              className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="offshoreType"
              id="offshoreType"
              onChange={handleChange}
              value={formData?.offshoreType}
              placeholder="Offshore Type"
            />
          </div>
          <div className="mt-4">
            <label className="text-webDescrip font-semibold mt-4">
              Offshore Description
            </label>
            <textarea
              className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="offshoreDescription"
              id="offshoreDescription"
              onChange={handleChange}
              value={formData?.offshoreDescription}
              placeholder="Offshore Description"
            />
          </div>
          <div className="mt-4">
            <label className="text-webDescrip font-semibold mt-4">
              Offshore Advantages
            </label>
            <div className="w-full flex flex-col justify-start items-center border border-dashed border-custom-purple rounded-lg p-4">
              <div className="w-full flex gap-2 justify-between mb-4 flex-col ">
                {formData.offshoreAdvantages.map((advantage, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2"
                  >
                    <p className="text-webDescrip">{advantage}</p>
                    <button
                      type="button"
                      onClick={() => removeAdvantage(index)}
                      className="btn btn-error  text-white  rounded-xl"
                    >
                      <FaTrash />
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="w-[100%] flex justify-center items-center ">
                <Button
                  text={"Add Advantage"}
                  icon={<FaPlus />}
                  click={openModalAdvantage}
                />
              </div>
            </div>
          </div>
          {/* Remaining form fields */}

          {/* Modal */}
          {isModalOpenAdvantage && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50">
              <div className="bg-white w-[40%] h-[30%] felx justify-center p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Add Advantage</h2>
                <textarea
                  type="text"
                  value={advantageInput}
                  onChange={(e) => setAdvantageInput(e.target.value)}
                  className="bg-white border border-custom-purple text-webDescrip p-2 w-full mb-2 h-24"
                  placeholder="Enter advantage"
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={addAdvantage}
                    className="bg-blue-500 text-white px-4 py-2 rounded-full mr-2 hover:bg-blue-600"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={closeModalAdvantage}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
          {/*  */}
          <div className="mt-4">
            <label className="text-webDescrip font-semibold mt-4">
              Offshore Comparison
            </label>
            <div className="w-full flex flex-col justify-start items-center border border-dashed border-custom-purple rounded-lg p-4">
              <div className="w-full flex gap-2 justify-between mb-4 flex-col ">
                {formData.offshoreComparison.map((Comaprison, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2"
                  >
                    <p className="text-webDescrip">{Comaprison}</p>
                    <button
                      type="button"
                      onClick={() => removeComparison(index)}
                      className="btn btn-error  text-white  rounded-xl"
                    >
                      <FaTrash />
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="w-[100%] flex justify-center items-center ">
                <Button
                  text={"Add Comparison"}
                  icon={<FaPlus />}
                  click={openModalComparison}
                />
              </div>
            </div>
          </div>

          {/* Remaining form fields */}

          {/* Modal */}
          {isModalOpenComparison && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50">
              <div className="bg-white w-[40%] h-[30%] felx justify-center p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Add Comparison</h2>
                <textarea
                  type="text"
                  value={comparisonInput}
                  onChange={(e) => setComparisonInput(e.target.value)}
                  className="bg-white border border-custom-purple text-webDescrip p-2 w-full mb-2 h-24"
                  placeholder="Enter comparison"
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={addComparison}
                    className="bg-blue-500 text-white px-4 py-2 rounded-full mr-2 hover:bg-blue-600"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={closeModalComparison}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

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
