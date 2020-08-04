import { navigate } from "gatsby";

export default function Redirect() {
  useEffect(() => {
    navigate("/");
  }, []);
  return null;
}
