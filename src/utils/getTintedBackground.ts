const backgroundImage =
  "url(https://llandscapes-10674.kxcdn.com/wp-content/uploads/2019/07/lighting.jpg)";
const overlaidBackground = `linear-gradient(0deg, rgb(255 255 255 / 81%), rgb(255 255 255 / 81%)), ${backgroundImage}`;

const getTintedBackground = () => {
  return {
    background: overlaidBackground,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
};

export default getTintedBackground;
