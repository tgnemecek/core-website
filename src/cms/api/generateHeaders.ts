import GoTrue from "gotrue-js";

const { GATSBY_SITE_URL } = process.env;

const generateHeaders = () => {
  const auth = new GoTrue({
    APIUrl: `${GATSBY_SITE_URL}/.netlify/identity`,
    audience: "",
    setCookie: false,
  });

  const {
    token: { access_token },
  } = auth.currentUser()!;

  return {
    Authorization: `Bearer ${access_token}`,
  };
};

export default generateHeaders;
