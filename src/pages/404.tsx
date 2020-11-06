import React from "react";
import { navigate } from "gatsby";

const NotFound: React.FC = () => {
  React.useEffect(() => {
    navigate("/");
  }, []);

  return null;
};

export default NotFound;
