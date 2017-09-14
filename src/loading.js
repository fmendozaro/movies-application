const overlay = document.getElementById("overlay");

const show = () => overlay.style.setProperty("display", "block");
const hide = () => overlay.style.setProperty("display", "none");

module.exports = {show, hide}