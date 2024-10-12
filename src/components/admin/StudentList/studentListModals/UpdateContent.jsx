import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { updateStudent } from "../../../../utils/Student-List/updateStudent";

import UpdateSuccess from "../../../modals/ResponseModals/studentList/updateStudent";
import SuccessUpdate from "./UpdateSuccess";

const UpdateContent = ({ onClose }) => {
  const [openUpdateSuccess, setOpenUpdateSuccess] = useState(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(null);

  const [student, setStudent] = useState({
    first_name: "",
    middle_initial: "",
    last_name: "",
    address: "",
    contact_number: "",
    age: "",
    gender: "",
  });

  useEffect(() => {
    const selectedStudent = JSON.parse(localStorage.getItem("selectedStudent"));
    if (selectedStudent) {
      setStudent(selectedStudent);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent({
      ...student,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const studentId = student.id;
      const result = await updateStudent(studentId, student);
      setIsUpdateSuccess(true);
      setOpenUpdateSuccess(true);
    } catch (error) {
      setIsUpdateSuccess(false);
      setOpenUpdateSuccess(true);
    }
  };

  return (
    <div>
      <div className='flex items-center justify-between border-b-2'>
        <h2></h2>
        <IoIosClose
          className='text-[26px] m-1 hover:cursor-pointer hover:bg-black/20 rounded-full'
          onClick={onClose}
        />
      </div>
      <header className='flex justify-center font-bold font-serif underline text-[22px] pt-1'>
        <h3>Update Student Data</h3>
      </header>
      <div className='flex items-center justify-center flex-col'>
        <div className='flex w-full mt-2'>
          <p className='w-[30%] font-serif p-1'>First Name:</p>
          <input
            type='text'
            name='first_name'
            className='border border-gray-900 rounded-md w-[70%] p-1'
            autoComplete='off'
            value={student.first_name}
            onChange={handleInputChange}
          />
        </div>
        <div className='flex w-full mt-2'>
          <p className='w-[30%] font-serif p-1'>MI:</p>
          <input
            type='text'
            name='middle_initial'
            className='border border-gray-900 rounded-md w-[70%] p-1'
            autoComplete='off'
            value={student.middle_initial}
            onChange={handleInputChange}
          />
        </div>
        <div className='flex w-full mt-2'>
          <p className='w-[30%] font-serif p-1'>Last Name:</p>
          <input
            type='text'
            name='last_name'
            className='border border-gray-900 rounded-md w-[70%] p-1'
            autoComplete='off'
            value={student.last_name}
            onChange={handleInputChange}
          />
        </div>
        <div className='flex w-full mt-2'>
          <p className='w-[30%] font-serif p-1'>Address:</p>
          <input
            type='text'
            name='address'
            className='border border-gray-900 rounded-md w-[70%] p-1'
            autoComplete='off'
            value={student.address}
            onChange={handleInputChange}
          />
        </div>
        <div className='flex w-full mt-2'>
          <p className='w-[30%] font-serif p-1'>Contact Number:</p>
          <input
            type='number'
            name='contact_number'
            className='border border-gray-900 rounded-md w-[70%] p-1 appearance-none'
            autoComplete='off'
            value={student.contact_number}
            onChange={handleInputChange}
          />
        </div>
        <div className='flex w-full mt-2'>
          <p className='w-[30%] font-serif p-1'>Age:</p>
          <input
            type='number'
            name='age'
            className='border border-gray-900 rounded-md w-[70%] p-1 appearance-none'
            autoComplete='off'
            value={student.age}
            onChange={handleInputChange}
          />
          <p className='w-[30%] font-serif p-1'>Gender:</p>
          <select
            name='gender'
            className='border border-gray-900 rounded-md w-[70%] p-1 font-serif'
            value={student.gender}
            onChange={handleInputChange}>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>
        </div>
        <div className='mt-3 w-full flex justify-center'>
          <button
            onClick={handleSubmit}
            className='w-full bg-blue-900 text-white font-serif rounded-md text-[18px] hover:bg-blue-800'>
            Submit
          </button>
        </div>
      </div>

      <UpdateSuccess
        open={openUpdateSuccess}
        onClose={() => setOpenUpdateSuccess(false)}>
        <SuccessUpdate
          onClose={() => setOpenUpdateSuccess(false)}
          isUpdateSuccess={isUpdateSuccess}
        />
      </UpdateSuccess>
    </div>
  );
};

export default UpdateContent;
