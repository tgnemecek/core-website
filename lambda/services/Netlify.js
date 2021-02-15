const { SITE_URL } = process.env;

module.exports = {
  verifyIdentity: async ({ identity, user }) => {
    // TODO: This is incomplete, receiving context.clientContext
    const userReq = await fetch(
      `${SITE_URL}/.netlify/identity/admin/users/{${user.sub}}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${identity.token}`,
        },
      }
    );
    const userData = await userReq.json();
    console.log({
      userReq,
      userData,
    });
  },
};
