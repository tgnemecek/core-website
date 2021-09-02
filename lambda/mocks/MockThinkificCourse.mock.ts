import { ThinkificProduct } from "../types";

let _id = 1;

class MockThinkificCourse implements ThinkificProduct {
  constructor(partial?: ThinkificProduct) {
    this.id = _id;
    _id += 1;
    Object.assign(this, partial);
  }

  id = 0;
  name = "Learn About Productivity";
  slug = "learn-about-productivity";
  description = "This is all about productivity";
  card_image_url? = "https://www.image.com";
  status: ThinkificProduct["status"] = "published";
  hidden = false;

  public toObject() {
    return { ...this };
  }
}

export default MockThinkificCourse;
