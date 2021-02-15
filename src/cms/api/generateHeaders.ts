import GoTrue from "gotrue-js";
import netlifyIdentity from "netlify-identity-widget";

const { GATSBY_SITE_URL } = process.env;

const generateHeaders = () => {
  // const identityToken = await netlifyIdentity.refresh();

  const auth = new GoTrue({
    APIUrl: `${GATSBY_SITE_URL}/.netlify/identity`,
    audience: "",
    setCookie: false,
  });

  const {
    token: { access_token },
  } = auth.currentUser();

  return {
    Authorization: `Bearer ${access_token}`,
  };
};

export default generateHeaders;
