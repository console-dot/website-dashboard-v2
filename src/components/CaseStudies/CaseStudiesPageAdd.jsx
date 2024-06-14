import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { RiLoader3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCaseStudiesDetails,
  setCaseStudiesData,
} from "../../redux/caseStudiesSlice";
import {
  addCaseStudy,
  addTechStack,
  editTechStack,
  editcaseStudies,
  removeTechStack,
} from "../../api";
import config from "../../api/config";
import { RxCross1 } from "react-icons/rx";
import { addFile } from "../../api/file";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";

export default function CaseStudiesPageAdd() {
  const BASE_URL = config.BASE_URL;
  const caseStudiesData = useSelector(selectCaseStudiesDetails);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    projectImage: "",
    services: "",
    projectDuration: "",
    images: [],
    description: "",
    projectLink: "",
    tags: [],
    techStack: [],
    highlights: [],
    client: [
      {
        name: "",
        description: "",
        country: "",
        industry: "",
        teamSize: "",
      },
    ],
    product: "",
    goals: [],
    challenges: [],
    solution: "",
    results: {
      description: "",
      subHeadings: [],
    },
  });

  const [techData, setTechData] = useState({
    techStack: {
      name: "",
      type: "",
      image: null, // Assuming img is initially null
    },
  });

  const [newTags, setNewTags] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate();
  const seenHeadings = new Set();

  //tags
  const handleNewTagsChange = (e) => {
    setNewTags(e.target.value);
  };

  const handleAddTags = () => {
    if (newTags.trim() !== "") {
      setFormData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, newTags],
      }));
      setNewTags("");
    }
  };

  const handleRemoveTags = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((_, i) => i !== index),
    }));
  };

  //client handledot
  const handleFieldDotChange = (e, parent, index, field) => {
    const { value } = e.target;
    const updatedFormData = JSON.parse(JSON.stringify(formData));

    // If the property is nested, split the parent by '.' and update accordingly
    if (parent.includes(".")) {
      const parentKeys = parent.split(".");
      let nestedObj = updatedFormData;
      for (let i = 0; i < parentKeys.length - 1; i++) {
        nestedObj = nestedObj[parentKeys[i]];
      }
      nestedObj[parentKeys[parentKeys.length - 1]][index][field] = value;
    } else {
      updatedFormData[parent][index][field] = value;
    }

    setFormData(updatedFormData);
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    addCaseStudy(formData)
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => console.log(err));
    setIsLoading(false);

    setTimeout(() => {
      setIsLoading(false);
      toast.success("Form submitted", {
        autoClose: 1500, // close after 1.5 seconds
        onClose: () => navigate("/casestudies"), // navigate after closing
      });
    }, 1500);
  };

  // Handle form values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file change
  const handleFileChange = (e) => {
    const newImage = e.target.files[0];
    addFile(newImage)
      .then((res) => {
        if (res?.status == 201) {
          setFormData((prevData) => ({
            ...prevData,
            images: [...(prevData.images || []), res?.data],
          }));
          setTimeout(() => {
            setIsLoading(false);
            toast.success("Project Snippets Added Successfully", {
              autoClose: 500, // close after 1.5 seconds
            });
          }, 500);
        }
      })
      .catch((err) => console.log(err));
  };

  // Handle remove tech
  const handleRemoveProjectSnippets = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index),
    }));
  };

  // Handle file change
  const handleProjectImage = (e) => {
    const newImage = e.target.files[0];
    addFile(newImage)
      .then((res) => {
        if (res?.status == 201) {
          setFormData((prevData) => ({
            ...prevData,
            projectImage: res?.data,
          }));
          setTimeout(() => {
            setIsLoading(false);
            toast.success("Project Image Added Successfully", {
              autoClose: 500, // close after 1.5 seconds
            });
          }, 500);
        }
      })
      .catch((err) => console.log(err));
  };

  // Handle remove tech
  const handleRemoveProjectImage = () => {
    setFormData((prevData) => ({
      ...prevData,
      projectImage: null,
    }));
  };

  //handle tech stack input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTechData((prevFormData) => ({
      ...prevFormData,
      techStack: {
        ...prevFormData.techStack,
        [name]: value,
      },
    }));
  };

  // handle Edit Tech Stack submission
  const handleEditTechStack = () => {
    const updatedTechStack = [...formData.techStack];
    updatedTechStack[editIndex] = editItem;
    setFormData({
      ...formData,
      techStack: updatedTechStack,
    });
    if (updatedTechStack[editIndex]?.image) {
      if (typeof updatedTechStack[editIndex]?.image === "string") {
        editTechStack(
          {
            name: updatedTechStack[editIndex]?.name,
            image: updatedTechStack[editIndex]?.image,
          },
          updatedTechStack[editIndex]?._id
        )
          .then((res) => {
            console.log("res", res);
          })
          .catch((err) => console.log(err));
      } else {
        addFile(updatedTechStack[editIndex]?.image)
          .then((res) => {
            if (res?.status == 201) {
              updatedTechStack[editIndex].image = res?.data;
              editTechStack(
                {
                  name: updatedTechStack[editIndex]?.name,
                  image: updatedTechStack[editIndex]?.image,
                },
                updatedTechStack[editIndex]?._id
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

  // handle Add Tech Stack submission
  const handleAddTechStack = () => {
    setIsLoading(true);
    const newTechStackItem = {
      name: techData.techStack.name,
      type: techData.techStack.type,
      image: techData.techStack.image,
    };

    if (selectedFile) {
      addFile(selectedFile)
        .then((res) => {
          console.log("res", res);
          if (res?.status == 201) {
            newTechStackItem.image = res?.data;
            addTechStack(newTechStackItem)
              .then((res) => {
                console.log("res", res);
                // Add the new object to the techStack array
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  techStack: [...prevFormData.techStack, res?.data],
                }));
                setTimeout(() => {
                  setIsLoading(false);
                  toast.success("Tech Stack Added Successfully", {
                    autoClose: 500, // close after 1.5 seconds
                  });
                }, 500);
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    }
    // Close Modal
    closeModal();
  };

  //handle Delete techStack
  const handleDeleteTechStack = (index) => {
    const currentId = formData.techStack[index]?._id;
    removeTechStack(currentId).then((res) => {
      if (res.status == 200) {
        console.log("Removed Successfully");
      }
    });
    const updatedTechStack = formData.techStack.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      techStack: updatedTechStack,
    });
  };

  // handle edit techstack changes
  const handleEditInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      // If the change is in the image input field
      const file = files[0];
      setEditItem((prevItem) => ({
        ...prevItem,
        image: file,
      }));
    } else {
      // If the change is in other input fields
      setEditItem((prevItem) => ({
        ...prevItem,
        [name]: value,
      }));
    }
  };

  const handleTechFile = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  //modal start
  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditIndex(null);
    setEditItem(null);
  };

  const handleOpenEditModal = (index) => {
    setEditIndex(index);
    setEditItem(formData.techStack[index]);
    setIsEditModalOpen(true);
  };

  //field start
  const handleAddField = (field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: [...(prevData[field] || []), { heading: "", description: "" }],
    }));
  };

  const handleRemoveField = (field, index) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: prevData[field].filter((_, i) => i !== index),
    }));
  };

  const handleAddSubheading = () => {
    const updatedFormData = JSON.parse(JSON.stringify(formData));

    updatedFormData.results.subHeadings.push({ heading: "", description: "" });

    setFormData(updatedFormData);
  };
  const handleRemoveSubheading = (index) => {
    const updatedFormData = JSON.parse(JSON.stringify(formData));

    updatedFormData.results.subHeadings.splice(index, 1);

    setFormData(updatedFormData);
  };

  const handleFieldChange = (e, field, index, subField) => {
    const updatedField = formData[field].map((item, i) =>
      i === index ? { ...item, [subField]: e.target.value } : item
    );
    setFormData({
      ...formData,
      [field]: updatedField,
    });
  };

  const handleChangeDot = (e) => {
    const { name, value } = e.target;
    const updatedFormData = JSON.parse(JSON.stringify(formData));

    // If the property is nested, split the name by '.' and update accordingly
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      updatedFormData[parent] = {
        ...updatedFormData[parent],
        [child]: value,
      };
    } else {
      updatedFormData[name] = value;
    }

    setFormData(updatedFormData);
  };
  //fields end

  return (
    <div className="w-full mb-6">
      <form
        className="flex justify-center flex-col w-[50%] m-auto gap-2"
        method="post"
        onSubmit={handleSubmit}
      >
        <div>
          <h1 className="text-[28px] text-custom-purple mb-4 mt-2 font-bold text-center ">
            Add New Case Study
          </h1>
          {/* title */}
          <label className="text-webDescrip font-semibold">Title</label>
          <input
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="title"
            id="title"
            onChange={handleChange}
            value={formData?.title}
            placeholder="Case Study Title"
          />
          {/* project description */}
          <label className="text-webDescrip font-semibold mt-4">
            Description
          </label>
          <textarea
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="description"
            id="description"
            onChange={handleChange}
            value={formData?.description}
            placeholder="Case Study Description"
          />
          {/* project link */}
          <label className="text-webDescrip font-semibold mt-4">
            Project Link
          </label>
          <input
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="projectLink"
            id="projectLink"
            onChange={handleChange}
            value={formData?.projectLink}
            placeholder="Project Link"
          />
          {/* tags */}
          <div>
            <label className="text-webDescrip font-semibold">Tags</label>
            <div className="flex justify-between items-center gap-2">
              <input
                className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                name="tags"
                id="tags"
                onChange={handleNewTagsChange}
                value={newTags}
                placeholder="Tags"
              />
              <button
                type="button"
                onClick={handleAddTags}
                className="btn btn-success text-white"
              >
                <FaPlus />
                Add
              </button>
            </div>
            <div className="flex mt-2">
              {formData.tags?.map((tagsItem, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex justify-center items-center gap-2 bg-gray-200 text-gray-800 px-2 py-1 rounded mr-2">
                    <span>{tagsItem}</span>
                    <span
                      className="cursor-pointer"
                      onClick={() => handleRemoveTags(index)}
                    >
                      <RxCross1 />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* product */}
          <div className="flex justify-between">
            <label className="text-webDescrip font-semibold mt-4">
              Product
            </label>
            <div className="flex flex-col">
              <small className="text-error mt-4">
                Note: Type \n for next line
              </small>
              <small className="text-error mt-1">
                Note: For bullet Points use •
              </small>
            </div>
          </div>
          <textarea
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="product"
            id="product"
            onChange={handleChange}
            value={formData?.product}
            placeholder="Product"
          />
          {/* solution */}
          <div className="flex justify-between">
            <label className="text-webDescrip font-semibold mt-4">
              Solution
            </label>
            <div className="flex flex-col">
              <small className="text-error mt-4">
                Note: Type \n for next line
              </small>
              <small className="text-error mt-1">
                Note: For bullet Points use •
              </small>
            </div>
          </div>

          <textarea
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="solution"
            id="solution"
            onChange={handleChange}
            value={formData?.solution}
            placeholder="Solution"
          />
          {/* client */}
          <div className="border border-dashed border-custom-purple mt-2 mb-2 p-4">
            <div>
              {" "}
              <label className="text-custom-purple text-2xl font-semibold ">
                Client
              </label>
            </div>
            <label className="text-webDescrip font-semibold mt-4">
              Client Name
            </label>
            <input
              className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="client.name"
              id="client"
              onChange={(e) => handleFieldDotChange(e, "client", 0, "name")}
              value={formData?.client?.[0]?.name || ""}
              placeholder="Client Name"
            />
            <div className="flex justify-between">
              <label className="text-webDescrip font-semibold mt-4">
                Client Description
              </label>
              <div className="flex flex-col">
                <small className="text-error mt-4">
                  Note: Type \n for next line
                </small>
                <small className="text-error mt-1">
                  Note: For bullet Points use •
                </small>
              </div>
            </div>
            <textarea
              className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="clientDescription"
              id="clientDescription"
              onChange={(e) =>
                handleFieldDotChange(e, "client", 0, "description")
              }
              value={formData?.client?.[0]?.description || ""}
              placeholder="Client Description"
            />
            <label className="text-webDescrip font-semibold mt-4">
              Client Country
            </label>
            <input
              className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="clientCountry"
              id="clientCountry"
              onChange={(e) => handleFieldDotChange(e, "client", 0, "country")}
              value={formData?.client?.[0]?.country || ""}
              placeholder="Client Country"
            />
            <label className="text-webDescrip font-semibold mt-4">
              Client Industry
            </label>
            <input
              className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="clientIndustry"
              id="clientIndustry"
              onChange={(e) => handleFieldDotChange(e, "client", 0, "industry")}
              value={formData?.client?.[0]?.industry || ""}
              placeholder="Client Industry"
            />
            <label className="text-webDescrip font-semibold mt-4">
              Client Team Size
            </label>
            <input
              className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="clientTeamSize"
              id="clientTeamSize"
              onChange={(e) => handleFieldDotChange(e, "client", 0, "teamSize")}
              value={formData?.client?.[0]?.teamSize || ""}
              placeholder="Client Team Size"
            />
          </div>
          {/* tech stack start */}
          <div className="border border-dashed flex flex-col border-custom-purple p-4 mt-6">
            <div className="flex flex-row  justify-between items-center">
              <label className="text-custom-purple text-2xl font-semibold ">
                Tech Stack
              </label>

              <button
                type="button"
                onClick={openModal}
                className="text-white btn btn-success"
              >
                <FaPlus />
                Add
              </button>
            </div>
            {formData?.techStack?.map((item, index) => {
              if (!seenHeadings.has(item.type)) {
                seenHeadings.add(item.type);
                return (
                  <div key={item.type}>
                    <h2>{item.type}</h2>
                    {formData?.techStack?.map(
                      (innerItem, innerIndex) =>
                        innerItem?.type === item.type && (
                          <div className="w-full flex" key={innerIndex}>
                            <div className="w-full flex justify-between">
                              <div>{innerItem?.name}</div>
                              <div className="flex items-center">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleOpenEditModal(innerIndex)
                                  }
                                  className="text-success mr-2"
                                >
                                  <FaPen />
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDeleteTechStack(innerIndex)
                                  }
                                  className="text-error"
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </div>
                          </div>
                        )
                    )}
                  </div>
                );
              }
              return null;
            })}
          </div>
          {/* highlights", "goals", "challenges*/}
          {["highlights", "goals", "challenges"].map((field) => (
            <div
              key={field}
              className="border border-dashed border-custom-purple mt-2 mb-2 p-4"
            >
              <div className="flex justify-between items-center mb-2">
                <label className="text-custom-purple text-2xl font-semibold ">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>{" "}
                <button
                  type="button"
                  className="text-white btn btn-success"
                  onClick={() => handleAddField(field)}
                >
                  <FaPlus />
                  Add
                </button>
              </div>
              {formData[field]?.map((item, index) => (
                <div key={index} className="mb-4 mt-4 ">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-webHeading font-semibold ">
                      Point {index + 1}
                    </label>
                    <button
                      type="button"
                      className="text-error bg-white px-6 py-1 rounded-md "
                      onClick={() => handleRemoveField(field, index)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                  <label className="text-webDescrip font-semibold ">
                    Heading
                  </label>
                  <input
                    className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    name={`${field}[${index}][heading]`}
                    value={item.heading}
                    onChange={(e) =>
                      handleFieldChange(e, field, index, "heading")
                    }
                    placeholder="Heading"
                  />
                  <label className="text-webDescrip font-semibold ">
                    Description
                  </label>
                  <textarea
                    className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                    name={`${field}[${index}][description]`}
                    value={item.description}
                    onChange={(e) =>
                      handleFieldChange(e, field, index, "description")
                    }
                    placeholder="Description"
                  />
                  <div className="border-b-2 border-custom-grey mt-2"></div>
                </div>
              ))}
            </div>
          ))}
          <div className="border border-dashed border-custom-purple mt-2 mb-2 p-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-custom-purple text-2xl font-semibold ">
                Results
              </label>
              <button
                type="button"
                className="btn btn-success text-white "
                onClick={handleAddSubheading}
              >
                <FaPlus /> Add
              </button>
            </div>
            <div className="flex justify-between">
              <label className="text-webDescrip font-semibold mt-4">
                Result Description
              </label>
              <div className="flex flex-col">
                <small className="text-error mt-4">
                  Note: Click Add Button to add Points for Results
                </small>
                <small className="text-error mt-1">
                  Note: Type \n for next line
                </small>
                <small className="text-error mt-1">
                  Note: For bullet Points use •
                </small>
              </div>
            </div>
            <textarea
              className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
              name="results.description"
              value={formData?.results?.description}
              onChange={handleChangeDot}
              placeholder="Results Description"
            />
            {formData.results?.subHeadings?.map((subHeading, index) => (
              <div key={index} className="mb-4 mt-2 ">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-webHeading font-semibold ">
                    Point {index + 1}
                  </label>
                  <button
                    type="button"
                    className="text-error bg-white px-6 py-1 rounded-md "
                    onClick={() => handleRemoveSubheading(index)}
                  >
                    <FaTrash />
                  </button>
                </div>
                <label className="text-webDescrip font-semibold ">
                  Heading
                </label>
                <input
                  className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  name={`resultsSubHeadings[${index}][heading]`}
                  value={subHeading.heading}
                  onChange={(e) =>
                    handleFieldDotChange(
                      e,
                      "results.subHeadings",
                      index,
                      "heading"
                    )
                  }
                  placeholder="Heading"
                />
                <label className="text-webDescrip font-semibold ">
                  Description
                </label>
                <textarea
                  className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  name={`resultsSubHeadings[${index}][description]`}
                  value={subHeading.description}
                  onChange={(e) =>
                    handleFieldDotChange(
                      e,
                      "results.subHeadings",
                      index,
                      "description"
                    )
                  }
                  placeholder="Description"
                />
                <div className="border-b-2 border-custom-grey mt-2"></div>
              </div>
            ))}
          </div>

          {/* Project Image */}
          <label className="text-webDescrip font-semibold mt-4">
            Project Image
          </label>
          <div className="flex justify-center gap-6 w-full mt-4">
            {formData?.projectImage ? (
              <div className="flex">
                <img
                  src={`${BASE_URL}/file/${formData?.projectImage}`}
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
                <span
                  className="cursor-pointer"
                  onClick={() => handleRemoveProjectImage()}
                >
                  <RxCross1 />
                </span>
              </div>
            ) : (
              <></>
            )}
          </div>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleProjectImage}
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {/* Project Snippets */}
          <label className="text-webDescrip font-semibold mt-4">
            Project Snippets
          </label>
          <div className="flex justify-center gap-6 w-full mt-4">
            {formData?.images?.map((image, index) => (
              <div className="flex" key={index}>
                <img
                  src={
                    image.startsWith("blob:")
                      ? image
                      : `${BASE_URL}/file/${image}`
                  }
                  alt={`${formData.title} snippet ${index + 1}`}
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
                <span
                  className="cursor-pointer"
                  onClick={() => handleRemoveProjectSnippets(index)}
                >
                  <RxCross1 />
                </span>
              </div>
            ))}
          </div>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {/* Submit button */}
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
      {/* tech stack modal start*/}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white border border-dashed flex flex-col border-custom-purple p-4 mt-6">
            <label className="text-webDescrip font-semibol text-[20px] ">
              Tech Stack
            </label>
            <div className="mb-4">
              <label className="text-webDescrip font-semibold">Tech Name</label>
              <input
                type="text"
                name="name"
                value={formData?.techStack?.name}
                onChange={handleInputChange}
                placeholder="Tech Name"
                className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <div className="mb-4">
                <label className="text-webDescrip font-semibold">
                  Tech Type
                </label>
                <input
                  type="text"
                  name="type"
                  value={techData.techStack.type}
                  onChange={handleInputChange}
                  placeholder="Tech Type"
                  className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="mt-4">
                <label className="text-webDescrip font-semibold mt-2 block">
                  Upload Image
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={handleTechFile}
                  accept="image/*"
                  className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            <div className="mt-4 flex gap-2 justify-center">
              <button
                className="text-white btn btn-accent btn-sm opacity-70 hover:opacity-100"
                onClick={handleAddTechStack}
              >
                Save
              </button>

              <button
                type="button"
                onClick={closeModal}
                className="text-white btn btn-error btn-sm opacity-70 hover:opacity-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white border border-dashed flex flex-col border-custom-purple p-4 mt-6">
            <label className="text-webDescrip font-semibol text-[20px] ">
              Tech Stack
            </label>
            <div className="mb-4">
              <label className="text-webDescrip font-semibold">Tech Name</label>
              <input
                type="text"
                name="name"
                value={editItem.name}
                onChange={handleEditInputChange}
                placeholder="Tech Name"
                className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div className="mt-4">
              <label className="text-webDescrip font-semibold mt-2 block">
                Upload Image
              </label>
              <input
                type="file"
                name="image"
                onChange={handleEditInputChange}
                accept="image/*"
                className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mt-4 flex gap-2 justify-center">
              <button
                className="text-white btn btn-accent btn-sm opacity-70 hover:opacity-100"
                onClick={handleEditTechStack}
              >
                Update
              </button>
              <button
                className="text-white btn btn-error btn-sm opacity-70 hover:opacity-100"
                onClick={handleCloseEditModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* tech stack modal end*/}
    </div>
  );
}
