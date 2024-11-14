import React, { useEffect, useState } from "react";
import { fetchStudents } from "./fetchStudent";
import AddStudent from "../../modals/addStudent";
import NewActivity from "../../modals/newActivity";
import { IoIosClose, IoIosArrowDropdown } from "react-icons/io";
import { FaPlus, FaTrash } from "react-icons/fa";
import { addStudent } from "../../../utils/Student-List/addStudent";
import { addActivity } from "../../../utils/Student-List/addActivity";
import ViewAct from "../../modals/viewActivities";
import fetchActivities from "../../../utils/Student-List/fetchActivities";
import Options from "../../modals/profilesOption";
import { useNavigate, Link } from "react-router-dom";
import UpdateModal from "../../modals/updateModal";
import UpdateContent from "./studentListModals/UpdateContent";
import { deleteStudent } from "../../../utils/Student-List/deleteStudent";
import ConfirmDelMod from "./studentListModals/ConfirmDelMod";
import ConfirmDelAct from "./studentListModals/ConfirmDelAct";
import ConfirmDelete from "../../modals/confirmModals/deleteConfirm";
import SuccessDelete from "./studentListModals/SuccessDelete";
import DeleteSuccess from "../../modals/ResponseModals/studentList/deleteSuccessful";
import StudentSuccess from "../../modals/ResponseModals/studentList/addStudentSuccess";
import AddNotify from "./studentListModals/AddNotify";
import ActivityAdded from "../../modals/ResponseModals/studentList/activityAdded";
import ActivityAddedCont from "./studentListModals/ActivityAddedCont";
import { TiFolderOpen } from "react-icons/ti";
import { deleteExercise } from "./service/student_profile_services/deleteActivity";
import DeleteAct from "../../modals/confirmModals/deleteAct";

const Profiles = () => {
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [openAct, setOpenAct] = useState(false);
  const [viewAct, setViewAct] = useState(false);
  const [openOpt, setOpenOpt] = useState(false);
  const [openUpt, setOpenUpt] = useState(false);
  const [openConDel, setOpenConDel] = useState(false);
  const [openConDel2, setOpenConDel2] = useState(false);
  const [openSuccessDelete, setOpenSuccessDelete] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [activityLabel, setActivityLabel] = useState("");
  const [activityWords, setActivityWords] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    middle_initial: "",
    last_name: "",
    age: "",
    gender: "Male",
    contact_number: "",
    address: "",
  });
  const [activities, setActivities] = useState([]);
  const [openAddStudentSuccess, setOpenAddStudentSuccess] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [openActivtyAdded, setOpenActivtyAdded] = useState(false);
  const [isActivitySuccess, setIsActivitySuccess] = useState(null);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownStudent, setDropdownStudent] = useState(false);
  const [activityToDelete, setActivityToDelete] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchStudents(token).then((data) => setStudents(data));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const success = await addStudent(formData, token);
        setIsSuccess(success);
        setOpenAddStudentSuccess(true);

        if (success) {
          setFormData({
            first_name: "",
            middle_initial: "",
            last_name: "",
            age: "",
            gender: "Male",
            contact_number: "",
            address: "",
          });
          setOpen(false);
          fetchStudents(token).then((data) => setStudents(data));
        }
      } catch (error) {
        setIsSuccess(false);
        setOpenAddStudentSuccess(true);
      }
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddWord = () => {
    if (currentWord.trim()) {
      const newWords = [...activityWords, currentWord];
      setActivityWords(newWords);
      sessionStorage.setItem("activityWords", JSON.stringify(newWords));
      setCurrentWord("");
    }
  };

  const handleRemoveWord = (index) => {
    const updateWords = activityWords.filter((_, i) => i !== index);
    setActivityWords(updateWords);
    sessionStorage.setItem("activityWords", JSON.stringify(updateWords));
  };

  const handleSubmitActivity = async () => {
    const token = localStorage.getItem("token");
    const activityData = {
      label: activityLabel,
      words: activityWords,
    };

    try {
      const result = await addActivity(activityData, token);
      setIsActivitySuccess(result);
      setOpenActivtyAdded(true);

      if (result) {
        setActivityLabel("");
        setActivityWords([]);
        sessionStorage.removeItem("activityWords");
        setOpenAct(false);
      }
    } catch (error) {
      setIsActivitySuccess(false);
      setOpenActivtyAdded(true);
    }
  };

  useEffect(() => {
    if (viewAct) {
      const fetchData = async () => {
        try {
          const data = await fetchActivities();
          setActivities(data);
        } catch (error) {
          console.error("Failed to fetch activities.");
        }
      };

      fetchData();
    }
  }, [viewAct]);

  const handleSelectStudent = (student) => {
    localStorage.setItem("selectedStudent", JSON.stringify(student));
    setOpenOpt(true);
  };

  const triggerDeleteConfirmation = () => {
    const selectedStudent = JSON.parse(localStorage.getItem("selectedStudent"));
    if (selectedStudent && selectedStudent.id) {
      setStudentToDelete(selectedStudent);
      setOpenConDel(true);
    } else {
      console.log("No Student Selected");
    }
  };

  const handleDelete = async () => {
    if (studentToDelete && studentToDelete.id) {
      const studentId = studentToDelete.id;
      try {
        const response = await deleteStudent(studentId);

        if (response) {
          setOpenSuccessDelete(true);
          setOpenConDel(false);
        }
      } catch (error) {
        console.error("Error deleting student:", error);
        alert("Error deleting student");
      }
    }
  };

  //Redirect and Pass the state "Label and Words"
  const handleViewActivity = (activity) => {
    // console.log("Activity being viewed:", activity);
    navigate("/activity", {
      state: {
        label: activity.label,
        words: activity.words,
        act_id: activity.act_id,
      },
    });
  };

  //Sort ============================================= >
  const handleSort = (type) => {
    let sortedActivities;
    if (type === "recent") {
      sortedActivities = [...activities].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    } else if (type === "asc") {
      sortedActivities = [...activities].sort((a, b) =>
        a.label.localeCompare(b.label)
      );
    } else if (type === "desc") {
      sortedActivities = [...activities].sort((a, b) =>
        b.label.localeCompare(a.label)
      );
    }
    setActivities(sortedActivities);
    setDropdownOpen(false);
  };

  const handleSortStudent = (type) => {
    let sortedStudents;
    if (type === "first_name") {
      sortedStudents = [...students].sort((a, b) =>
        a.first_name.localeCompare(b.first_name)
      );
    } else if (type === "last_name") {
      sortedStudents = [...students].sort((a, b) =>
        a.last_name.localeCompare(b.last_name)
      );
    } else if (type === "gender") {
      sortedStudents = [...students].sort((a, b) =>
        a.gender.localeCompare(b.gender)
      );
    }
    setStudents(sortedStudents);
    setDropdownStudent(false);
  };
  //Sort ============================================= >

  //DELETE ACTIVITY =====================================>

  const triggerActivityDeleteConfirmation = (activity) => {
    if (activity && activity.act_id) {
      setActivityToDelete(activity); // Store the selected activity to be deleted
      setOpenConDel2(true); // Open the delete confirmation modal
    } else {
      console.log("No Activity Selected");
    }
  };

  const handleDeleteExercise = async () => {
    if (activityToDelete && activityToDelete.act_id) {
      const activityId = activityToDelete.act_id;
      try {
        const response = await deleteExercise(activityId);
        console.log(response.message);
        setOpenConDel2(false);
        window.location.reload();
      } catch (error) {
        console.error("Error deleting exercise:", error.response?.data.message);
        alert("Error deleting activity");
      }
    }
  };
  //DELETE ACTIVITY =====================================>

  return (
    <div className='mt-20 mx-6 lg:flex'>
      <div className='lg:w-[20%]'>
        <h2 className='font-serif font-bold p-2 bg-[#15355A] rounded-md text-white'>
          Menu
        </h2>
        <div className='p-5 h-auto flex justify-center flex-col bg-gray-200'>
          <button
            className='w-full rounded-sm font-serif bg-blue-900 text-white p-1
           hover:bg-blue-800 duration-300 mb-3'
            onClick={() => setOpen(true)}>
            ADD STUDENT
          </button>
          <button
            className='w-full rounded-sm font-serif bg-green-800 text-white p-1
           hover:bg-green-700 duration-300 mb-3'
            onClick={() => setOpenAct(true)}>
            NEW ACTIVITY
          </button>
          <button
            className='w-full rounded-sm font-serif bg-[#e32636] text-white p-1
           hover:bg-[#e53b4a] duration-300'
            onClick={() => setViewAct(true)}>
            VIEW ACTIVITIES
          </button>
        </div>
      </div>
      <div className='lg:w-[80%] mx-auto mt-4 px-4'>
        {students.length === 0 ? (
          <div className='text-center text-gray-500'>
            No students to display
          </div>
        ) : (
          <div>
            <div className='flex justify-end mb-4'>
              {/* Sort By Dropdown */}
            </div>

            <table className='min-w-full table-fixed border-collapse border border-gray-300'>
              <thead>
                <tr className='bg-red-900'>
                  <th className='w-1/12 border border-gray-300 px-4 py-2 text-white font-serif'>
                    #
                  </th>
                  <th className='w-4/12 border border-gray-300 px-4 py-2 text-white font-serif'>
                    First Name
                  </th>
                  <th className='w-4/12 border border-gray-300 px-4 py-2 text-white font-serif'>
                    Last Name
                  </th>
                  <th className='w-2/12 border border-gray-300 px-4 py-2 text-white font-serif'>
                    Gender
                  </th>
                  <th className='w-2/12 border border-gray-300 px-4 py-2 text-white font-serif'>
                    <div className='relative inline-block'>
                      <button
                        className='bg-red-900 text-white px-4 py-2 rounded flex items-center'
                        onClick={() => setDropdownStudent(!dropdownStudent)}>
                        Sort
                        <IoIosArrowDropdown className='text-[22px] ml-2' />
                      </button>
                      {dropdownStudent && (
                        <div className='absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10'>
                          <ul>
                            <li>
                              <button
                                className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100'
                                onClick={() => handleSortStudent("first_name")}>
                                First Name
                              </button>
                            </li>
                            <li>
                              <button
                                className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100'
                                onClick={() => handleSortStudent("last_name")}>
                                Last Name
                              </button>
                            </li>
                            <li>
                              <button
                                className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100'
                                onClick={() => handleSortStudent("gender")}>
                                Gender
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={student.id}>
                    <td className='border border-gray-300 px-4 py-2 text-center bg-gray-200 font-serif'>
                      {index + 1}
                    </td>
                    <td className='border border-gray-300 px-4 py-2 text-center bg-gray-200 font-serif'>
                      {student.first_name}
                    </td>
                    <td className='border border-gray-300 px-4 py-2 text-center bg-gray-200 font-serif'>
                      {student.last_name}
                    </td>
                    <td className='border border-gray-300 px-4 py-2 text-center bg-gray-200 font-serif'>
                      {student.gender}
                    </td>
                    <td className='border border-gray-300 px-4 py-2 text-center bg-gray-200 font-serif'>
                      <button
                        className='bg-blue-800 hover:bg-blue-700 text-white px-2 py-1 rounded font-serif'
                        onClick={() => handleSelectStudent(student)}>
                        Options
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AddStudent open={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit}>
          <div className='flex items-center justify-between border-b-2'>
            <h2></h2>
            <IoIosClose
              className='text-[26px] m-1 hover:cursor-pointer hover:bg-black/20 rounded-full'
              onClick={() => setOpen(false)}
            />
          </div>
          <header className='flex justify-center font-bold font-serif underline text-[22px] pt-1'>
            <h3>Register Student</h3>
          </header>
          <div className='flex items-center justify-center flex-col'>
            <div className='flex w-full mt-2'>
              <p className='w-[30%] font-serif p-1'>First Name:</p>
              <input
                type='text'
                name='first_name'
                value={formData.first_name}
                onChange={handleInputChange}
                className='border border-gray-900 rounded-md w-[70%] p-1'
              />
            </div>
            <div className='flex w-full mt-2'>
              <p className='w-[30%] font-serif p-1'>MI:</p>
              <input
                type='text'
                name='middle_initial'
                value={formData.middle_initial}
                onChange={handleInputChange}
                className='border border-gray-900 rounded-md w-[70%] p-1'
              />
            </div>
            <div className='flex w-full mt-2'>
              <p className='w-[30%] font-serif p-1'>Last Name:</p>
              <input
                type='text'
                name='last_name'
                value={formData.last_name}
                onChange={handleInputChange}
                className='border border-gray-900 rounded-md w-[70%] p-1'
              />
            </div>
            <div className='flex w-full mt-2'>
              <p className='w-[30%] font-serif p-1'>Address:</p>
              <input
                type='text'
                name='address'
                value={formData.address}
                onChange={handleInputChange}
                className='border border-gray-900 rounded-md w-[70%] p-1'
              />
            </div>
            <div className='flex w-full mt-2'>
              <p className='w-[30%] font-serif p-1'>Contact Number:</p>
              <input
                type='number'
                name='contact_number'
                value={formData.contact_number}
                onChange={handleInputChange}
                className='border border-gray-900 rounded-md w-[70%] p-1 appearance-none'
              />
            </div>
            <div className='flex w-full mt-2'>
              <p className='w-[30%] font-serif p-1'>Age:</p>
              <input
                type='number'
                name='age'
                value={formData.age}
                onChange={handleInputChange}
                className='border border-gray-900 rounded-md w-[70%] p-1 appearance-none'
              />
              <p className='w-[30%] font-serif p-1'>Sex:</p>
              <select
                name='gender'
                value={formData.gender}
                onChange={handleInputChange}
                className='border border-gray-900 rounded-md w-[70%] p-1 font-serif'>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
              </select>
            </div>
            <div className='mt-3 w-full flex justify-center'>
              <button
                type='submit'
                className='w-full bg-blue-900 text-white font-serif rounded-md text-[18px] hover:bg-blue-800'>
                Submit
              </button>
            </div>
          </div>
        </form>
      </AddStudent>

      <NewActivity open={openAct} onClose={() => setOpenAct(false)}>
        <div className='flex items-center justify-between border-b-2'>
          <h2></h2>
          <IoIosClose
            className='text-[26px] m-1 hover:cursor-pointer hover:bg-black/20 rounded-full'
            onClick={() => setOpenAct(false)}
          />
        </div>
        <header className='font-serif flex justify-center mt-2 text-[22px] font-bold underline'>
          New Activity
        </header>
        <div className='flex items-center justify-center flex-col'>
          <div className='flex w-full mt-2'>
            <p className='w-[20%] font-serif p-1'>Label :</p>
            <input
              type='text'
              name='label'
              value={activityLabel}
              onChange={(e) => setActivityLabel(e.target.value)}
              autoComplete='off'
              className='border border-gray-900 rounded-md w-[80%] p-1 font-serif'
            />
          </div>
          <div className='flex w-full mt-2'>
            <input
              type='text'
              name='word'
              value={currentWord}
              onChange={(e) => setCurrentWord(e.target.value)}
              autoComplete='off'
              className='border border-gray-900 w-[90%] p-1 font-serif'
            />
            <p
              className='w-[10%] font-serif p-1 flex items-center justify-center
             bg-green-800 hover:bg-green-700 cursor-pointer'
              onClick={handleAddWord}>
              <FaPlus />
            </p>
          </div>
          <div className='flex flex-col w-full mt-3 border-2 border-black p-2 max-h-28 overflow-auto'>
            {activityWords.length === 0 ? (
              <div className='text-center text-gray-500'>
                No words to display
              </div>
            ) : (
              activityWords.map((word, index) => (
                <div
                  key={index}
                  className='flex w-full justify-between items-center'>
                  <h3 className='font-serif'>{word}</h3>
                  <FaTrash
                    className='hover:text-red-900 cursor-pointer'
                    onClick={() => handleRemoveWord(index)}
                  />
                </div>
              ))
            )}
          </div>
          <div className='w-full mt-3 flex justify-end items-center p-2'>
            <button
              className='bg-green-800 text-white p-2 rounded-md font-serif w-[94px] hover:bg-green-700'
              onClick={handleSubmitActivity}>
              Submit
            </button>
          </div>
        </div>
      </NewActivity>

      <ViewAct open={viewAct} onClose={() => setViewAct(false)}>
        <div className='flex flex-col h-[500px]'>
          <div className='flex items-center justify-between border-b-2'>
            <h2></h2>
            <IoIosClose
              className='text-[26px] m-1 hover:cursor-pointer hover:bg-black/20 rounded-full'
              onClick={() => setViewAct(false)}
            />
          </div>
          <div className='w-auto h-full overflow-y-auto'>
            <table className='min-w-96 border-collapse border border-gray-300'>
              <thead className='sticky top-0'>
                <tr className='bg-red-900'>
                  <th className='w-[20%] border border-gray-300 px-4 py-2 text-white font-serif'>
                    #
                  </th>
                  <th className='w-[40%] border border-gray-300 px-4 py-2 text-white font-serif'>
                    Label
                  </th>
                  <th className='w-[40%] border border-gray-300 px-4 py-2 text-whitefont-serif'>
                    <div className='relative inline-block'>
                      <button
                        className='text-white px-4 py-2 rounded flex justify-center items-center   hover:text-white/60 '
                        onClick={() => setDropdownOpen(!dropdownOpen)}>
                        Sort by
                        <IoIosArrowDropdown className='text-[20px] ml-2' />
                      </button>
                      {dropdownOpen && (
                        <div className='absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10'>
                          <ul>
                            <li>
                              <button
                                className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100'
                                onClick={() => handleSort("recent")}>
                                Recently Added
                              </button>
                            </li>
                            <li>
                              <button
                                className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100'
                                onClick={() => handleSort("asc")}>
                                Alphabetically
                              </button>
                            </li>
                            <li>
                              <button
                                className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100'
                                onClick={() => handleSort("desc")}>
                                Z - A
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, index) => (
                  <tr key={activity.id}>
                    <td className='border border-gray-300 px-4 py-2 text-center bg-gray-200 font-serif'>
                      {index + 1}
                    </td>
                    <td
                      style={{ wordWrap: "break-word", maxWidth: "250px" }}
                      className='border border-gray-300 px-4 py-2 text-center bg-gray-200 font-serif break-words whitespace-normal'>
                      {activity.label}
                    </td>
                    <td className='flex border border-gray-300 px-4 py-2 text-center bg-gray-200 font-serif'>
                      <button
                        onClick={() => handleViewActivity(activity)}
                        className='text-blue-800 hover:text-blue-700 text-[18px] px-2 py-1 rounded font-serif mx-1 text-center'>
                        <TiFolderOpen className='w-full' />
                        <h3 className='font-serif hover:text-blue-700'>View</h3>
                      </button>
                      <button
                        onClick={() =>
                          triggerActivityDeleteConfirmation(activity)
                        }
                        className='text-red-800 hover:text-red-700 text-[18px] px-2 py-1 rounded font-serif mx-1 text-center'>
                        <FaTrash className='w-full' />
                        <h3 className='font-serif hover:text-red-700'>
                          Delete
                        </h3>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ViewAct>

      <Options open={openOpt} onClose={() => setOpenOpt(false)}>
        <div>
          <div className='flex items-center justify-between border-b-2'>
            <h2></h2>
            <IoIosClose
              className='text-[26px] m-1 hover:cursor-pointer hover:bg-black/20 rounded-full'
              onClick={() => setOpenOpt(false)}
            />
          </div>
          <div className='mt-2 p-2 w-full'>
            <Link
              to='/student-profile'
              className='flex justify-center bg-green-800 p-2 w-full font-serif font-bold text-white rounded-sm
            text-[16px] hover:bg-green-600 duration-500 mt-2'>
              Progress
            </Link>
            <button
              className='bg-orange-800 p-2 w-full font-serif font-bold text-white rounded-sm
            text-[16px] hover:bg-orange-700 duration-500 mt-2'
              onClick={() => setOpenUpt(true)}>
              Update
            </button>
            <button
              className='bg-red-900 p-2 w-full font-serif font-bold text-white rounded-sm
            text-[16px] hover:bg-red-700 duration-500 mt-2'
              onClick={triggerDeleteConfirmation}>
              Delete
            </button>
          </div>
        </div>
      </Options>

      <UpdateModal open={openUpt} onClose={() => setOpenUpt(false)}>
        <UpdateContent onClose={() => setOpenUpt(false)} />
      </UpdateModal>

      {openConDel && (
        <ConfirmDelete open={openConDel} onClose={() => setOpenConDel(false)}>
          <ConfirmDelMod
            onClose={() => setOpenConDel(false)}
            onConfirm={handleDelete}
          />
        </ConfirmDelete>
      )}

      {openConDel2 && (
        <DeleteAct open={openConDel2} onClose={() => setOpenConDel2(false)}>
          <ConfirmDelAct
            onClose={() => setOpenConDel2(false)}
            onConfirm={handleDeleteExercise}
          />
        </DeleteAct>
      )}

      <DeleteSuccess
        open={openSuccessDelete}
        onClose={() => setOpenSuccessDelete(false)}>
        <SuccessDelete onClose={() => setOpenSuccessDelete(false)} />
      </DeleteSuccess>

      <StudentSuccess
        open={openAddStudentSuccess}
        onClose={() => setOpenAddStudentSuccess(false)}>
        <AddNotify
          onClose={() => setOpenAddStudentSuccess(false)}
          isSuccess={isSuccess}
        />
      </StudentSuccess>

      <ActivityAdded
        open={openActivtyAdded}
        onClose={() => setOpenActivtyAdded(false)}>
        <ActivityAddedCont
          onClose={() => setOpenActivtyAdded(false)}
          isActivitySuccess={isActivitySuccess}
        />
      </ActivityAdded>
    </div>
  );
};

export default Profiles;
