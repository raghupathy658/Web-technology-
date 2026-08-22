// Experiment 1: Student Profile Modification
// MUST explicitly demonstrate getElementById, querySelector, textContent, style, classList, setAttribute

// 1. Explicitly using document.getElementById()
const inputName = document.getElementById("inputName");
const inputRegNo = document.getElementById("inputRegNo");
const inputDept = document.getElementById("inputDept");
const inputYear = document.getElementById("inputYear");

const headingInput = document.getElementById("headingInput");
const textColor = document.getElementById("textColor");
const bgColor = document.getElementById("bgColor");

const btnShow = document.getElementById("btnShow");
const btnHide = document.getElementById("btnHide");
const btnToggleClass = document.getElementById("btnToggleClass");
const btnReset = document.getElementById("btnReset");

// 2. Explicitly using document.querySelector()
const profileCard = document.querySelector("#profileCard");
const profileHeading = document.querySelector("#profileHeading");
const displayName = document.querySelector("#displayName");
const displayRegNo = document.querySelector("#displayRegNo");
const displayDept = document.querySelector("#displayDept");
const displayYear = document.querySelector("#displayYear");

// Function to update profile live using textContent & setAttribute
function updateProfile() {
  // 3. Explicitly using textContent
  displayName.textContent = inputName.value.trim() || "N/A";
  displayRegNo.textContent = inputRegNo.value.trim() || "N/A";
  displayDept.textContent = inputDept.value;
  displayYear.textContent = inputYear.value;

  // 6. Explicitly using setAttribute()
  profileCard.setAttribute("data-student-id", inputRegNo.value.trim());
  profileCard.setAttribute("aria-label", `Profile card for ${inputName.value}`);
}

// Live Input Event Listeners
inputName.addEventListener("input", updateProfile);
inputRegNo.addEventListener("input", updateProfile);
inputDept.addEventListener("change", updateProfile);
inputYear.addEventListener("change", updateProfile);

// Change Heading Text using textContent
headingInput.addEventListener("input", function () {
  profileHeading.textContent = headingInput.value || "STUDENT PROFILE CARD";
});

// 4. Explicitly using style property for dynamic text & background colors
textColor.addEventListener("input", function () {
  profileCard.style.color = textColor.value;
  displayName.style.color = textColor.value;
});

bgColor.addEventListener("input", function () {
  profileCard.style.backgroundColor = bgColor.value;
});

// 5. Explicitly using classList (add, remove, toggle)
btnHide.addEventListener("click", function () {
  profileCard.classList.add("hidden");
});

btnShow.addEventListener("click", function () {
  profileCard.classList.remove("hidden");
});

btnToggleClass.addEventListener("click", function () {
  profileCard.classList.toggle("highlight-border");
});

// Reset Profile Function
btnReset.addEventListener("click", function () {
  inputName.value = "Sadhanandhan R";
  inputRegNo.value = "312822104001";
  inputDept.value = "Computer Science & Engineering";
  inputYear.value = "3rd Year";
  headingInput.value = "STUDENT PROFILE CARD";
  textColor.value = "#f8fafc";
  bgColor.value = "#1e293b";

  profileCard.style.color = "#f8fafc";
  displayName.style.color = "#f8fafc";
  profileCard.style.backgroundColor = "#1e293b";
  
  profileCard.classList.remove("hidden");
  profileCard.classList.remove("highlight-border");

  updateProfile();
  profileHeading.textContent = "STUDENT PROFILE CARD";
});

// Initial update on page load
updateProfile();
