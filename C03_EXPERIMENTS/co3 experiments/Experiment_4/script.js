// Experiment 4: Browser Information Dashboard
// MUST explicitly use: window.location, window.innerWidth, window.innerHeight, window.scrollX, window.scrollY, navigator, screen, resize event, scroll event

const urlVal = document.getElementById("urlVal");
const langVal = document.getElementById("langVal");
const statusVal = document.getElementById("statusVal");
const screenWidthVal = document.getElementById("screenWidthVal");
const screenHeightVal = document.getElementById("screenHeightVal");
const viewportWidthVal = document.getElementById("viewportWidthVal");
const viewportHeightVal = document.getElementById("viewportHeightVal");
const scrollXVal = document.getElementById("scrollXVal");
const scrollYVal = document.getElementById("scrollYVal");

// 1. Update window.location, navigator, and screen metrics
function updateStaticInfo() {
  // MUST use window.location
  urlVal.textContent = window.location.href || "file:///";

  // MUST use navigator object
  langVal.textContent = navigator.language || "en-US";

  if (navigator.onLine) {
    statusVal.textContent = "ONLINE";
    statusVal.className = "badge-status badge-online";
  } else {
    statusVal.textContent = "OFFLINE";
    statusVal.className = "badge-status badge-offline";
  }

  // MUST use screen object
  screenWidthVal.textContent = `${screen.width} px`;
  screenHeightVal.textContent = `${screen.height} px`;
}

// 2. MUST use window.innerWidth & window.innerHeight on resize event
function updateViewportInfo() {
  viewportWidthVal.textContent = `${window.innerWidth} px`;
  viewportHeightVal.textContent = `${window.innerHeight} px`;
}

// 3. MUST use window.scrollX & window.scrollY on scroll event
function updateScrollInfo() {
  scrollXVal.textContent = `${Math.round(window.scrollX)} px`;
  scrollYVal.textContent = `${Math.round(window.scrollY)} px`;
}

// Event Listeners

// MUST use resize event
window.addEventListener("resize", function () {
  updateViewportInfo();
});

// MUST use scroll event
window.addEventListener("scroll", function () {
  updateScrollInfo();
});

// Online & Offline status listeners using navigator.onLine
window.addEventListener("online", updateStaticInfo);
window.addEventListener("offline", updateStaticInfo);

// Initialize on page load
updateStaticInfo();
updateViewportInfo();
updateScrollInfo();
