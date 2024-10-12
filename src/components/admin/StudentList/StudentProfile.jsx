import React, { useEffect, useState } from "react";
import Mountain from "../../../assets/mountain.jpg";
import Person from "../../../assets/emptyImage.png";

const StudentProfile = () => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const selectedStudent = JSON.parse(localStorage.getItem("selectedStudent"));
    if (selectedStudent) {
      setStudent(selectedStudent);
    }
  }, []);

  if (!student) {
    return <div>Loading. . .</div>;
  }

  return (
    <div
      className='w-screen h-screen overflow-auto bg-cover bg-center'
      style={{
        backgroundImage: `url(${Mountain})`,
        backgroundAttachment: "fixed",
      }}>
      <div className='grid grid-cols-1 md:grid-cols-[40%_60%] m-10 bg-white/30 backdrop-blur-md rounded-md'>
        <div className='p-4'>
          <div className='flex flex-col justify-center items-center'>
            <div className='w-52 h-52'>
              <img
                src={Person}
                alt='Profile'
                className='w-full h-full object-cover rounded-full'
              />
            </div>
            <button className='w-full p-2 m-2 bg-blue-900 text-white font-serif font-bold rounded-md'>
              Upload
            </button>
            <div className='w-full p-4 text-white font-serif'>
              <h3 className='flex justify-between'>
                <span className='font-bold'>First Name:</span>{" "}
                {student.first_name}
              </h3>
              <h3 className='flex justify-between'>
                <span className='font-bold'>Age:</span> {student.age}
              </h3>
              <h3 className='flex justify-between'>
                <span className='font-bold'>Gender:</span> {student.gender}
              </h3>
              <h3 className='flex justify-between'>
                <span className='font-bold'>Contact Number:</span>{" "}
                {student.contact_number}
              </h3>
              <h3 className='flex justify-between'>
                <span className='font-bold'>Address:</span> {student.address}
              </h3>
            </div>
          </div>
        </div>
        <div>Second Box</div>
      </div>
    </div>
  );
};

export default StudentProfile;
