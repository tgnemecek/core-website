import { Course } from "../types";

let _id = 1;

class MockCourse implements Course {
  constructor(partial?: Partial<Course>) {
    this.id = _id;
    _id += 1;
    Object.assign(this, partial);
  }

  id = 0;
  name = "Learn About Productivity";
  slug = "learn-about-productivity";
  description = "This is all about productivity";
  image = "https://www.image.com";

  public toObject() {
    return { ...this };
  }
}

export default MockCourse;
