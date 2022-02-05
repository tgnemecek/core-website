import React from "react";
import { Container } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { Section, HorizontalFeed, Heading } from "components";
import { useCourseFeed, useBreakpoint } from "utils";
import { CoreLearningZoneSection as CoreLearningZoneProps } from "types";
import CourseCard from "./CourseCard";

const CoreLearningZoneSection: React.FC<CoreLearningZoneProps> = ({
  heading,
  subheading,
  extraText,
}) => {
  const { courses, error } = useCourseFeed();
  const { md } = useBreakpoint();

  if (error) return null;

  return (
    <Section id="courses">
      <Container>
        <Heading
          showLine
          subheading={subheading}
          extra={md ? extraText : undefined}
        >
          {heading}
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

export default CoreLearningZoneSection;
