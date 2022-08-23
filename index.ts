// Import stylesheets
import "./style.css";

// const textContent: HTMLElement = document.getElementById("textContent");
const main: HTMLElement = document.getElementById("main");
const btnZoomIn: HTMLElement = document.getElementById("zoomIn");
const btnZoomOut: HTMLElement = document.getElementById("zoomOut");

let zoomLevel = 1;
let rootFontSize = 16;

btnZoomIn.addEventListener("click", () => {
if (zoomLevel < 2) {
    zoomLevel = zoomLevel + 0.1;
    rootFontSize = rootFontSize + 2;
    // textContent.style.fontSize = `${rootFontSize}px`;
    main.style.fontSize = `${rootFontSize}px`;
}
});
btnZoomOut.addEventListener("click", () => {
if (zoomLevel > 1) {
    zoomLevel = zoomLevel - 0.1;
    rootFontSize = rootFontSize - 2;
    // textContent.style.fontSize = `${rootFontSize}px`;
    main.style.fontSize = `${rootFontSize}px`;
}
});