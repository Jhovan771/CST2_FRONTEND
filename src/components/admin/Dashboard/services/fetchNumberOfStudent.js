import { useState, useEffect } from "react";
import axios from "axios";

const useFetchNumberOfStudent = () => {
  const [studentCount, setStudentCount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_LINK}/api/students/number-of-students`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setStudentCount(response.data.student_count);
      } catch (err) {
        console.error("Error fetching student count:", err);
        setError(err);
      }
    };

    fetchData();
  }, []);

  return { studentCount, error };
};

export default useFetchNumberOfStudent;
