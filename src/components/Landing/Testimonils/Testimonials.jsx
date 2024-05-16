import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function Testimonials({
  data,
  open,
  close,
  deleteTestimonial,
  handleOpenEditModal,
}) {
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Name
            </th>
            <th scope="col" class="px-6 py-3">
              Description
            </th>
            <th scope="col" class="px-6 py-3">
              Designation
            </th>
            <th scope="col" class="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => {
            return (
              <tr
                key={index}
                class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item?.fullName}
                </th>
                <td className="px-6  py-4">{item?.description}</td>
                <td className="px-6 py-4">{item?.designation}</td>
                <td className="flex flex-row justify-start items-center px-6 py-4  ">
                  <button
                    type="button"
                    onClick={() => handleOpenEditModal(index)}
                    className="flex flex-row justify-center items-center text-success  "
                  >
                    <FaEdit />
                  </button>
                  <button
                    type="button"
                    onClick={()=>deleteTestimonial(index)}
                    className="flex flex-row justify-center items-center text-error ml-2  "
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
