import { useState, useEffect } from "react";
import { Course } from "types";

const useCourseFeed = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  const fetchCourses = async () => {
    const res = await fetch("/.netlify/functions/get-courses", {
      method: "POST",
    });
    if (res.status === 200) {
      const data = await res.json();
      setCourses(data.courses);
      return;
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return courses;
};

export default useCourseFeed;
