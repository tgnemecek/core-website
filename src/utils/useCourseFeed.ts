import { useState, useEffect } from "react";
import { Course } from "types";

const useCourseFeed = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState(false);

  const fetchCourses = async () => {
    const res = await fetch("/.netlify/functions/get-courses", {
      method: "POST",
    });
    if (res.status === 200) {
      const data = await res.json();
      setCourses(data.courses);
      return;
    }
    setError(true);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return { courses, error };
};

export default useCourseFeed;
