// Experiment 2: Dynamic Student Registration List
// MUST explicitly demonstrate createElement, appendChild, remove, parentElement, children

const regName = document.getElementById("regName");
const regNo = document.getElementById("regNo");
const regDept = document.getElementById("regDept");

const btnAdd = document.getElementById("btnAdd");
const btnClear = document.getElementById("btnClear");

const studentTableBody = document.getElementById("studentTableBody");
const studentCount = document.getElementById("studentCount");
const alertBox = document.getElementById("alertBox");
const emptyText = document.getElementById("emptyText");

// Helper function to show alert messages
function showAlert(message, isError) {
  alertBox.textContent = message;
  alertBox.className = isError ? "alert-message alert-error" : "alert-message alert-success";
  alertBox.classList.remove("hidden");
  setTimeout(() => alertBox.classList.add("hidden"), 3000);
}

// 5. MUST explicitly demonstrate element.children to update student count & index numbers
function updateCount() {
  // Using studentTableBody.children to count rows
  const count = studentTableBody.children.length;
  studentCount.textContent = `Total Students: ${count}`;

  emptyText.style.display = count === 0 ? "block" : "none";

  // Iterate over children to update index column
  for (let i = 0; i < studentTableBody.children.length; i++) {
    const row = studentTableBody.children[i];
    row.children[0].textContent = i + 1;
  }
}

// Prevent duplicate register numbers using element.children
function isDuplicate(regNoValue) {
  const rows = studentTableBody.children;
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].children[2].textContent.trim().toLowerCase() === regNoValue.toLowerCase()) {
      return true;
    }
  }
  return false;
}

// Add Student Function
function addStudent() {
  const nameVal = regName.value.trim();
  const regNoVal = regNo.value.trim();
  const deptVal = regDept.value;

  // Validation: Prevent empty fields
  if (!nameVal || !regNoVal) {
    showAlert("Please enter both Student Name and Register Number!", true);
    return;
  }

  // Validation: Prevent duplicate register numbers
  if (isDuplicate(regNoVal)) {
    showAlert(`Register Number '${regNoVal}' is already registered!`, true);
    return;
  }

  // 1. MUST explicitly demonstrate document.createElement()
  const tr = document.createElement("tr");

  const tdIndex = document.createElement("td");
  tdIndex.textContent = studentTableBody.children.length + 1;

  const tdName = document.createElement("td");
  tdName.textContent = nameVal;

  const tdRegNo = document.createElement("td");
  tdRegNo.textContent = regNoVal;
  tdRegNo.style.fontFamily = "monospace";

  const tdDept = document.createElement("td");
  tdDept.textContent = deptVal;

  const tdAction = document.createElement("td");

  // Create Remove Button
  const btnRemove = document.createElement("button");
  btnRemove.textContent = "Remove";
  btnRemove.className = "btn-danger";
  btnRemove.style.padding = "0.3rem 0.6rem";
  btnRemove.style.fontSize = "0.8rem";

  // 4. MUST explicitly demonstrate element.parentElement & 3. element.remove()
  btnRemove.addEventListener("click", function (event) {
    // Navigate parent elements: button -> td -> tr
    const parentTd = event.target.parentElement;
    const targetRow = parentTd.parentElement;

    // Call remove() on targetRow element
    targetRow.remove();

    updateCount();
    showAlert(`Removed student: ${nameVal}`, false);
  });

  // 2. MUST explicitly demonstrate appendChild()
  tdAction.appendChild(btnRemove);

  tr.appendChild(tdIndex);
  tr.appendChild(tdName);
  tr.appendChild(tdRegNo);
  tr.appendChild(tdDept);
  tr.appendChild(tdAction);

  studentTableBody.appendChild(tr);

  // Clear inputs and update count
  regName.value = "";
  regNo.value = "";
  regName.focus();

  showAlert(`Successfully added ${nameVal}!`, false);
  updateCount();
}

// Clear All Function using element.remove()
btnClear.addEventListener("click", function () {
  if (studentTableBody.children.length === 0) {
    showAlert("No records to clear!", true);
    return;
  }

  while (studentTableBody.children.length > 0) {
    studentTableBody.children[0].remove();
  }

  updateCount();
  showAlert("All student records cleared.", false);
});

// Button Click Listener
btnAdd.addEventListener("click", addStudent);

// Seed sample student on initial load
regName.value = "Sadhanandhan R";
regNo.value = "312822104001";
addStudent();
