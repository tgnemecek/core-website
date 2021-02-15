const BUTTON_CLASSNAME = "css-1u5l62d-button-dropdownItem-StyledMenuItem";

const interceptor = () => {
  const root = document.getElementById("nc-root");
  root.addEventListener("click", (e) => {
    if (
      (e.target as HTMLSpanElement).parentElement.className === BUTTON_CLASSNAME
    ) {
      e.stopPropagation();
      setTimeout(() => {
        console.log("continue");
        (e.target as HTMLSpanElement).parentElement.dispatchEvent(e);
      }, 2000);
    }
  });
};

export default interceptor;
