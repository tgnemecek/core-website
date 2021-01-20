module.exports = {
  verifyIdentity: async ({ identity, user }) => {
    // TODO: This is incomplete, receiving context.clientContext
    const userReq = await fetch(
      `https://core-website-2020-test.netlify.app/.netlify/identity/admin/users/{${user.sub}}`,
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
