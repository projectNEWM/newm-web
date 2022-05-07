import "@testing-library/jest-dom";

// mock script that react-facebook-login requires
const fbScript = document.createElement("script");
fbScript.id = "facebook-jssdk";
document.body.appendChild(fbScript);
