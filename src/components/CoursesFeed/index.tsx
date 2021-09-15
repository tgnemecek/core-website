import React from "react";
import { Container } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { Section, HorizontalFeed, Heading } from "components";
import { useCourseFeed } from "utils";
import CourseCard from "./CourseCard";

type CourseFeedProps = {
  title: string;
};

const CourseFeed: React.FC<CourseFeedProps> = ({ title }) => {
  const { courses, error } = useCourseFeed();

  if (error) return null;

  return (
    <Section id="courses">
      <Container>
        <Heading showLine subheading="Learn &amp; grow with our latest courses">
          {title}
        </Heading>
      </Container>
      <Container>
        {courses.length === 0 ? (
          <HorizontalFeed
            items={new Array(3).fill(null).map((_, i) => (
              <Skeleton key={i} variant="rect" height="100%" width="100%" />
            ))}
          />
        ) : (
          <HorizontalFeed
            items={courses.map((course, i) => (
              <CourseCard key={i} course={course} />
            ))}
          />
        )}
      </Container>
    </Section>
  );
};

export default CourseFeed;
