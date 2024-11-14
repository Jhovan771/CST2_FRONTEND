import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Mountain from "../../../assets/mountain.jpg";
import Person from "../../../assets/emptyImage.png";
import { uploadImage } from "./service/student_profile_services/imageService";
import IndividualGraph from "./IndividualGraph";
import { fetchStudentScores } from "./service/student_profile_services/fetchStudentScores";
import { computeOverallRating } from "../Dashboard/functions/computeOverallRating";

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [image, setImage] = useState(null);
  const [scoresData, setScoresData] = useState([]);
  const [ratingData, setRatingData] = useState({
    averageScore: 0,
    rating: "No Data",
  });

  useEffect(() => {
    const selectedStudent = JSON.parse(localStorage.getItem("selectedStudent"));
    const token = localStorage.getItem("token");

    if (selectedStudent && token) {
      setStudent(selectedStudent);

      fetchStudentScores(selectedStudent.id, token).then((data) => {
        setScoresData(data);
        const scores = data.map((item) => item.score);
        const result = computeOverallRating(scores);
        setRatingData(result);
      });
    }
  }, []);

  if (!student) {
    return <div>Loading. . .</div>;
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("studentId", student.id);

    try {
      const result = await uploadImage(formData);
      alert(result.message);
      student.profile_image = result.imagePath;
      setStudent({ ...student });
    } catch (error) {
      alert("Error uploading image");
    }
  };

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
            <div className='w-72 h-[16rem]'>
              <img
                src={
                  student.profile_image
                    ? `${import.meta.env.VITE_SERVER_LINK}/${
                        student.profile_image
                      }`
                    : Person
                }
                alt='Profile'
                className='w-full h-full object-cover rounded-md'
              />
            </div>
            <div className='w-full m-2 font-serif'>
              <input
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                className='w-full cursor-pointer'
              />
            </div>
            <div className=' flex w-full'>
              <button
                onClick={handleUpload}
                disabled={!image}
                className={`w-full p-2 m-2 font-serif font-bold rounded-md ${
                  image
                    ? "bg-blue-900 text-white"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                }`}>
                Upload
              </button>
              <Link
                to='/profile'
                className='w-full text-center p-2 m-2 bg-red-800 hover:bg-red-700 text-white font-serif font-bold rounded-md'>
                Back
              </Link>
            </div>
            <div className='w-full p-4 text-white font-serif'>
              <h3 className='flex justify-between'>
                <span className='font-bold'>First Name:</span>{" "}
                {student.first_name} {student.middle_initial}{" "}
                {student.last_name}
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
        <div className='flex justify-center items-center'>
          <div className='w-full h-full flex flex-col items-center justify-center p-4'>
            <div className='flex justify-between items-center w-full'>
              <h3 className='font-serif bg-gradient-to-r from-white/70 to-transparent p-2 rounded-md text-[24px]'>
                Progress
              </h3>
              <h3 className='flex flex-col-reverse font-serif text-center text-[18px]'>
                <span>{ratingData.rating}</span>{" "}
                <span className='underline font-bold'>
                  {ratingData.averageScore}%
                </span>
              </h3>
            </div>
            <IndividualGraph scoresData={scoresData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
