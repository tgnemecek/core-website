import React from "react";
import { Container } from "@material-ui/core";
import { Section, HorizontalFeed, Heading } from "components";
import { useCourseFeed } from "utils";
import CourseCard from "./CourseCard";

type CourseFeedProps = {
  title: string;
};

const CourseFeed: React.FC<CourseFeedProps> = ({ title }) => {
  const courses = useCourseFeed();

  if (!courses.length) return null;

  return (
    <Section id="courses">
      <Container>
        <Heading showLine subheading="Learn &amp; grow with our latest courses">
          {title}
        </Heading>
      </Container>
      <Container>
        <HorizontalFeed
          items={courses.map((course, i) => (
            <CourseCard key={i} course={course} />
          ))}
        />
      </Container>
    </Section>
  );
};

export default CourseFeed;
