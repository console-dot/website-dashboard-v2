import { useEffect, useState } from "react";
import { Button } from "../Button";
import { FaDotCircle, FaPlus, FaTrash } from "react-icons/fa";
import { RiLoader3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Testimonials from "./Testimonils/Testimonials";
import CreateModal from "./Testimonils/CreateModal";
import EditTestModal from "./Testimonils/EditTestModal";
import Expertises from "./Experties/Experties";
import CreateExpertiseModal from "./Experties/CreateExpertiseModal";
import EditExpertiseModal from "./Experties/EditExpertiseModal";
import { useSelector } from "react-redux";
import {
  selectLandingPageDetails,
  setLandingPageData,
} from "../../redux/landingPageSlice";
import {
  addExpertiseMethod,
  addTestimonialMethod,
  editExpertiseMethod,
  editLandingPage,
  editTestimonialMethod,
  removeExpertiseMethod,
  removeTestimonialMethod,
} from "../../api";
import { addFile } from "../../api/file";

const data = {
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
  offshoreAdvantages: ["Cost Effective", "Scalable Resources", "Expert Teams"],
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
  testimonials: [
    {
      name: "test1",
      description: "description",
      designation: "designation",
      img: "dummy.png",
    },
    {
      name: "test1",
      description: "description",
      designation: "designation",
      img: "dummy.png",
    },
  ],
  expertises: [
    {
      expertiseName: "test",
      expertiseDescription: "description",
      expertiseImg: "dummy.png",
    },
    {
      expertiseName: "test",
      expertiseDescription: "description1",
      expertiseImg: "dummy.png1",
    },
  ],
  testimonialFullName: "Jane Doe",
  testimonialDescription:
    "The team at TechSolutions went above and beyond to meet our needs.",
  testimonialDesignation: "CEO of Innovative Tech Co.",
};

export default function LandingPageEdit() {
  const landingPageData = useSelector(selectLandingPageDetails);
  const [formData, setFormData] = useState(landingPageData);
  const [workExperienceData, setWorkExperienceData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTestimonialModal, setEditTestimonialModal] = useState(false);
  const [editTestimonial, setEditTestimonial] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [isModalOpenSocialLink, setIsModalOpenSocialLink] = useState(false);
  const [socialLinks, setSocialLinks] = useState([]);
  const [socialLinkName, setSocialLinkName] = useState("");
  const [socialLinkURL, setSocialLinkURL] = useState("");
  const [editExpertise, setEditExpertise] = useState(null);
  const [isExpertiseModalOpen, setIsExpertiseModalOpen] = useState(false);
  const [editExpertiseModal, setEditExpertiseModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [testimonialData, setTestimonialData] = useState({
    testimonial: {
      fullName: "",
      description: "",
      designation: "",
      image: null, // Assuming img is initially null
    },
  });
  const [expertiseData, setExpertiseData] = useState({
    name: "",
    description: "",
    image: null, // Assuming img is initially null
  });
  //
  const navigate = useNavigate();

  // Modal functions
  const openModalSocialLink = () => setIsModalOpenSocialLink(true);
  const closeModalSocialLink = () => setIsModalOpenSocialLink(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openEditExpertiseModal = () => setEditExpertiseModal(true);
  const closeEditExpertiseModal = () => setEditExpertiseModal(false);
  const openEditTestModal = () => setEditTestimonialModal(true);
  const closeEditTestModal = () => setEditTestimonialModal(false);
  const openExpertiseModal = () => setIsExpertiseModalOpen(true);
  const closeExpertiseModal = () => setIsExpertiseModalOpen(false);

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const testimonialIds = formData?.testimonial?.map((item) => item._id);
    const expertiseIds = formData?.expertise?.map((item) => item._id);
    const newForm = {
      heroDescription: formData?.intro?.heroDescription,
      footerDescription: formData?.intro?.footerDescription,
      email: formData?.intro?.email,
      phone: formData?.intro?.phone,
      address: formData?.intro?.address,
      socialLinks: formData?.intro?.socialLinks,
      workExperience: workExperienceData,
      aboutDescription: formData?.about?.description,
      testimonials: testimonialIds,
      expertises: expertiseIds,
    };
    if (landingPageData?._id) {
      editLandingPage(newForm, landingPageData?._id)
        .then((res) => {
          console.log("res", res);
          // dispatch(setLandingPageData(res?.data));
        })
        .catch((err) => console.log(err));
      // Timeout
      setTimeout(() => {
        setIsLoading(false);
        toast.success("Form submitted", {
          autoClose: 1500,
          onClose: () => navigate("/LandingPage"),
        });
      }, 1500);

      // editLandingPage
      if (!isModalOpenSocialLink) {
        console.log(formData);
      }
    }
  };

  // Add New Social link
  const addSocialLink = () => {
    if (socialLinkName.trim() !== "" && socialLinkURL.trim() !== "") {
      const newItem = {
        name: socialLinkName,
        link: socialLinkURL,
      };
      // const updatedSocialLink = [...formData?.intro?.socialLinks];
      setFormData((prevData) => ({
        ...prevData,
        intro: {
          ...prevData.intro,
          socialLinks: [...prevData?.intro?.socialLinks, newItem],
        },
      }));
      closeModalSocialLink();
      setSocialLinkName("");
      setSocialLinkURL("");
    }
  };

  // Remove Social Link
  const removeSocialLink = (index) => {
    const updated = socialLinks.filter((_, i) => i !== index);
    setSocialLinks((prevLinks) => prevLinks.filter((_, i) => i !== index));
    setFormData((prevData) => ({
      ...prevData,
      intro: {
        ...prevData.intro,
        socialLinks: updated,
      },
    }));
  };

  // Handle Change for nested Objects
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      // Check if the field is nested or not
      if (name.includes(".")) {
        const [obj, field] = name.split(".");
        return {
          ...prevFormData,
          [obj]: {
            ...prevFormData[obj],
            [field]: value,
          },
        };
      } else {
        return {
          ...prevFormData,
          [name]: value,
        };
      }
    });
  };

  // Handle WorkExperinece Data
  const handleUpdateFormData = (e) => {
    const { name, value } = e.target;
    setWorkExperienceData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // handle File Upload
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Testimonials --------------------------------------------------
  // handle input change for New Testimonial
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTestimonialData((prevFormData) => ({
      ...prevFormData,
      testimonial: {
        ...prevFormData.testimonial,
        [name]: value,
      },
    }));
  };

  // Testimonials
  const handleExpChange = (e) => {
    const { name, value } = e.target;
    setExpertiseData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // handle Add New Testimonial Submission
  const handleAddTestimonial = () => {
    // Create new object
    const newItem = {
      fullName: testimonialData?.testimonial?.fullName,
      description: testimonialData?.testimonial?.description,
      designation: testimonialData?.testimonial?.designation,
      image: testimonialData?.image,
    };
    console.log("newItem", newItem);
    if (selectedFile) {
      addFile(selectedFile)
        .then((res) => {
          // console.log("res", res);
          if (res?.status == 201) {
            newItem.image = res?.data;
            addTestimonialMethod(newItem)
              .then((res) => {
                console.log("res", res);
                // Add the new object to the testimonials array
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  testimonial: [...prevFormData.testimonial, res?.data],
                }));
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    }
    // Close Modal
    closeModal();
  };

  // Edit Testimonial Values
  const handleEditInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      // If the change is in the image input field
      const file = files[0];
      setEditTestimonial((prevItem) => ({
        ...prevItem,
        image: file,
      }));
    } else {
      // If the change is in other input fields
      setEditTestimonial((prevItem) => ({
        ...prevItem,
        [name]: value,
      }));
    }
  };

  // handle Edit Testimonial Submission
  const handleEditTestimonial = () => {
    const updatedTestimonial = [...formData.testimonial];
    console.log("editTestimonial", editTestimonial);
    updatedTestimonial[editIndex] = editTestimonial;
    setFormData({
      ...formData,
      testimonial: updatedTestimonial,
    });
    if (updatedTestimonial[editIndex]?.image) {
      if (typeof updatedTestimonial[editIndex]?.image === "string") {
        editTestimonialMethod(
          {
            description: updatedTestimonial[editIndex]?.description,
            designation: updatedTestimonial[editIndex]?.designation,
            fullName: updatedTestimonial[editIndex]?.fullName,
            image: updatedTestimonial[editIndex]?.image,
          },
          updatedTestimonial[editIndex]?._id
        )
          .then((res) => {
            console.log("res", res);
          })
          .catch((err) => console.log(err));
      } else {
        addFile(updatedTestimonial[editIndex]?.image)
          .then((res) => {
            if (res?.status == 201) {
              updatedTestimonial[editIndex].image = res?.data;
              editTestimonialMethod(
                {
                  description: updatedTestimonial[editIndex]?.description,
                  designation: updatedTestimonial[editIndex]?.designation,
                  fullName: updatedTestimonial[editIndex]?.fullName,
                  image: updatedTestimonial[editIndex]?.image,
                },
                updatedTestimonial[editIndex]?._id
              )
                .then((res) => {
                  console.log("res", res);
                })
                .catch((err) => console.log(err));
            }
          })
          .catch((err) => console.log(err));
      }
    }
    // Close the edit modal
    handleCloseEditModal();
  };

  // Remove testimonial
  const deleteTestimonial = (index) => {
    const currentId = formData.testimonial[index]?._id;
    removeTestimonialMethod(currentId).then((res) => {
      if (res.status == 200) {
        console.log("Removed Successfully");
      }
    });
    const updatedTestimonials = formData.testimonial.filter(
      (_, i) => i !== index
    );
    setFormData((prevFormData) => ({
      ...prevFormData,
      testimonial: updatedTestimonials,
    }));
  };

  // Modal --------------------------------------------------------
  // Open testimonial edit modal
  const handleOpenEditModal = (index) => {
    setEditIndex(index);
    // console.log("d", formData.testimonial[index]);
    setEditTestimonial(formData.testimonial[index]);
    setEditTestimonialModal(true);
  };

  // Close testimonial edit modal
  const handleCloseEditModal = () => {
    setEditTestimonialModal(false);
    setEditIndex(null);
    setEditTestimonial(null);
  };

  // Open Expertise Edit Modal
  const handleOpenEditExpertiseModal = (index) => {
    setEditIndex(index);
    setEditExpertise(formData.expertise[index]);
    setEditExpertiseModal(true);
  };

  // Expertise -----------------------------------------------------
  // handle Add New Expertise Submission
  const handleAddExpertise = () => {
    // Create new object
    const newItem = {
      name: expertiseData?.name,
      description: expertiseData?.description,
      image: expertiseData?.image,
    };
    if (selectedFile) {
      addFile(selectedFile)
        .then((res) => {
          // console.log("res", res);
          if (res?.status == 201) {
            newItem.image = res?.data;
            addExpertiseMethod(newItem)
              .then((res) => {
                console.log("res", res);
                // Add the new object to the array
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  expertise: [...prevFormData.expertise, res?.data],
                }));
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    } else {
      newItem.image = null;
      addExpertiseMethod(newItem)
        .then((res) => {
          console.log("res", res);
          // Add the new object to the array
          setFormData((prevFormData) => ({
            ...prevFormData,
            expertise: [...prevFormData.expertise, res?.data],
          }));
        })
        .catch((err) => console.log(err));
    }
    // Close Modal
    closeExpertiseModal();
  };

  // Edit Expertise Value Change
  const handleEditExpChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      // If the change is in the image input field
      const file = files[0];
      setEditExpertise((prevItem) => ({
        ...prevItem,
        image: file,
      }));
    } else {
      // If the change is in other input fields
      setEditExpertise((prevItem) => ({
        ...prevItem,
        [name]: value,
      }));
    }
  };

  // handle Edit Expertise Submission
  const handleEditExpertise = () => {
    const updatedExpertises = [...formData.expertise];
    updatedExpertises[editIndex] = editExpertise;
    setFormData({
      ...formData,
      expertise: updatedExpertises,
    });
    if (updatedExpertises[editIndex]?.image) {
      if (typeof updatedExpertises[editIndex]?.image === "string") {
        editExpertiseMethod(
          {
            description: updatedExpertises[editIndex]?.description,
            name: updatedExpertises[editIndex]?.name,
            image: updatedExpertises[editIndex]?.image,
          },
          updatedExpertises[editIndex]?._id
        )
          .then((res) => {
            console.log("res", res);
          })
          .catch((err) => console.log(err));
      } else {
        addFile(updatedExpertises[editIndex]?.image)
          .then((res) => {
            if (res?.status == 201) {
              updatedExpertises[editIndex].image = res?.data;
              editExpertiseMethod(
                {
                  description: updatedExpertises[editIndex]?.description,
                  name: updatedExpertises[editIndex]?.name,
                  image: updatedExpertises[editIndex]?.image,
                },
                updatedExpertises[editIndex]?._id
              )
                .then((res) => {
                  console.log("res", res);
                })
                .catch((err) => console.log(err));
            }
          })
          .catch((err) => console.log(err));
      }
    }
    // Close the edit modal
    closeEditExpertiseModal();
  };

  // Delete expertise
  const deleteExpertise = (index) => {
    const currentId = formData.expertise[index]?._id;
    removeExpertiseMethod(currentId).then((res) => {
      if (res.status == 200) {
        console.log("Removed Successfully");
      }
    });
    const updatedExpertises = formData.expertise.filter((_, i) => i !== index);
    setFormData((prevFormData) => ({
      ...prevFormData,
      expertise: updatedExpertises,
    }));
  };

  // Effect
  useEffect(() => {
    setSocialLinks(formData?.intro?.socialLinks);
  }, [formData?.intro?.socialLinks]);

  useEffect(() => {
    setWorkExperienceData(formData?.intro?.workExperience);
  }, [formData?.intro?.workExperience]);

  // console.log("formData", formData);

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
              name="intro.heroDescription"
              id="heroDescription"
              onChange={handleChange}
              value={formData?.intro?.heroDescription}
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
              name="intro.footerDescription"
              id="footerDescription"
              onChange={handleChange}
              value={formData?.intro?.footerDescription}
              placeholder="footerdescription"
            />
          </div>

          <div className="mt-4">
            <label className="text-webDescrip font-semibold mt-4">E-Mail</label>
            <input
              className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="intro.email"
              id="email"
              onChange={handleChange}
              value={formData?.intro?.email}
              placeholder="email"
            />
          </div>

          <div className="mt-4">
            <label className="text-webDescrip font-semibold mt-4">Phone</label>
            <input
              className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="intro.phone"
              id="phone"
              onChange={handleChange}
              value={formData?.intro?.phone}
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
              name="intro.address"
              id="address"
              onChange={handleChange}
              value={formData?.intro?.address}
              placeholder="address"
            />
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-webDescrip font-semibold ">
                Social Links
              </label>
              <button
                type="button"
                onClick={openModalSocialLink}
                className="text-white btn btn-success"
              >
                <FaPlus />
                Add
              </button>
            </div>
            <div className="w-full flex flex-col justify-start items-center border border-dashed border-custom-purple rounded-lg p-4 mb-4">
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
                // onChange={(e) => handleChangeExperience(e, "countries")}
                onChange={handleUpdateFormData}
                value={workExperienceData?.countries}
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
                // onChange={(e) => handleChangeExperience(e, "expEmployees")}
                onChange={handleUpdateFormData}
                value={workExperienceData?.expEmployees}
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
                // onChange={(e) => handleChangeExperience(e, "scrumTeams")}
                onChange={handleUpdateFormData}
                value={workExperienceData?.scrumTeams}
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
                // onChange={(e) => handleChangeExperience(e, "fullStackDev")}
                onChange={handleUpdateFormData}
                value={workExperienceData?.fullStackDev}
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
            name="about.description"
            id="aboutDescription"
            onChange={handleChange}
            value={formData?.about?.description}
            placeholder="About Description"
          />
        </div>
        {/* about end */}

        {/* offshore start */}
        <div>
          <h1 className="text-[28px] text-custom-purple mb-4 mt-2 font-bold text-center ">
            Offshore Comparison
          </h1>
          <div className="mt-4">
            <label className="text-webDescrip font-semibold mt-4 flex justify-between">
              Offshore Comparison{" "}
              <small className="text-red-500">
                (Note: Editable only on Offshore Page)
              </small>
            </label>
            <div className="w-full flex flex-row justify-start  border border-dashed border-custom-purple rounded-lg p-4">
              {formData.offshoreComparison.map((comparison, index) => (
                <div key={index} className="w-full flex flex-col gap-6 mb-4 ">
                  {comparison?.offshoreType?.map((items) => {
                    return (
                      <>
                        <div className="flex justify-between items-center ml-1">
                          {/* Render type with edit and delete buttons */}
                          <h3 className="text-lg font-semibold">
                            {items.type}
                          </h3>
                          <div className="flex items-center gap-2"></div>
                        </div>
                        <div>
                          {items.comparison.map((advantage, idx) => (
                            <div
                              key={idx}
                              className="flex justify-start ml-6  "
                            >
                              <ul
                                className="text-webDescrip flex   gap-2"
                                style={{ listStyle: "unset" }}
                              >
                                <li> {advantage}</li>{" "}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </>
                    );
                  })}
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
          <div className="w-full flex justify-between items-center mt-4">
            <h1 className="text-[28px] text-custom-purple mb-4 mt-2 font-bold text-center ">
              Testimonials
            </h1>
            <button
              type="button"
              onClick={openModal}
              className="text-white btn btn-success"
            >
              <FaPlus />
              Add
            </button>
          </div>

          {/* Table */}
          <Testimonials
            data={formData?.testimonial}
            open={openEditTestModal}
            close={closeEditTestModal}
            deleteTestimonial={deleteTestimonial}
            handleOpenEditModal={handleOpenEditModal}
          />
          {/*  */}
          {isModalOpen ? (
            <CreateModal
              handleImageUpload={handleFileChange}
              handleChange={handleInputChange}
              closeModal={closeModal}
              handleAddTestimonial={handleAddTestimonial}
              formData={formData}
            />
          ) : (
            <></>
          )}

          {editTestimonialModal ? (
            <EditTestModal
              handleChange={handleEditInputChange}
              closeModal={closeEditTestModal}
              handleEditTestimonial={handleEditTestimonial}
              deleteTestimonial={deleteTestimonial}
              data={editTestimonial}
            />
          ) : (
            <></>
          )}
        </div>
        {/*  Testimonials end*/}
        {/*  Experties start*/}
        <div>
          <div className="w-full flex justify-between items-center mt-4">
            <h1 className="text-[28px] text-custom-purple mb-4 mt-2 font-bold text-center ">
              Expertise
            </h1>
            <button
              type="button"
              onClick={openExpertiseModal}
              className="text-white btn btn-success"
            >
              <FaPlus /> Add
            </button>
          </div>
          <Expertises
            data={formData?.expertise}
            open={openEditExpertiseModal}
            close={closeEditExpertiseModal}
            deleteExpertise={deleteExpertise}
            handleOpenEditModal={handleOpenEditExpertiseModal}
          />
          {isExpertiseModalOpen ? (
            <CreateExpertiseModal
              handleImageUpload={handleFileChange}
              handleChange={handleExpChange}
              closeModal={closeExpertiseModal}
              handleAddExpertise={handleAddExpertise}
              formData={formData}
            />
          ) : (
            <></>
          )}
          {editExpertiseModal ? (
            <EditExpertiseModal
              handleChange={handleEditExpChange}
              closeModal={closeEditExpertiseModal}
              handleEditExpertise={handleEditExpertise}
              data={editExpertise}
            />
          ) : (
            <></>
          )}
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
