// Experiment 3: Event Registration & Event Handling
// MUST demonstrate: onclick, change, input, focus, blur, mouseover, mouseout, submit, addEventListener()

const eventForm = document.getElementById("eventForm");
const studentName = document.getElementById("studentName");
const studentEmail = document.getElementById("studentEmail");
const eventSelect = document.getElementById("eventSelect");
const participantCount = document.getElementById("participantCount");

const namePreview = document.getElementById("namePreview");
const charCount = document.getElementById("charCount");
const btnRegister = document.getElementById("btnRegister");
const statusAlert = document.getElementById("statusAlert");
const logConsole = document.getElementById("logConsole");

// Helper function to log triggered events in UI
function logEvent(eventType, description) {
  const time = new Date().toLocaleTimeString();
  const entry = document.createElement("div");
  entry.className = "log-entry";
  entry.innerHTML = `<span class="log-time">[${time}]</span> <span class="log-type">&lt;${eventType}&gt;</span> ${description}`;
  logConsole.appendChild(entry);
  logConsole.scrollTop = logConsole.scrollHeight;
}

// 9. MUST explicitly demonstrate addEventListener() to attach modern event handlers

// 3. 'input' event: Live preview & character counter
studentName.addEventListener("input", function (e) {
  const val = e.target.value;
  namePreview.textContent = val || "—";
  charCount.textContent = val.length;
  logEvent("input", `Student Name typed: '${val}' (${val.length} chars)`);
});

// 2. 'change' event: Dropdown selection
eventSelect.addEventListener("change", function (e) {
  logEvent("change", `Event selected: '${e.target.value}'`);
});

// 4. 'focus' event: Highlight active field
const fields = [studentName, studentEmail, eventSelect, participantCount];
fields.forEach((field) => {
  field.addEventListener("focus", function (e) {
    e.target.style.borderColor = "#6366f1";
    e.target.style.backgroundColor = "rgba(99, 102, 241, 0.15)";
    logEvent("focus", `Focused field: #${e.target.id}`);
  });
});

// 5. 'blur' event: Remove highlight & perform field validation
fields.forEach((field) => {
  field.addEventListener("blur", function (e) {
    e.target.style.backgroundColor = "#0f172a";
    if (!e.target.value.trim() && e.target.hasAttribute("required")) {
      e.target.style.borderColor = "#dc2626";
      logEvent("blur", `Validation warning: #${e.target.id} is empty!`);
    } else {
      e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
      logEvent("blur", `Lost focus on field: #${e.target.id}`);
    }
  });
});

// 6. 'mouseover' event: Button hover effect
btnRegister.addEventListener("mouseover", function () {
  btnRegister.style.transform = "scale(1.05)";
  btnRegister.style.boxShadow = "0 0 15px rgba(99, 102, 241, 0.6)";
  logEvent("mouseover", "Mouse hovered over Register Button");
});

// 7. 'mouseout' event: Restore button appearance
btnRegister.addEventListener("mouseout", function () {
  btnRegister.style.transform = "scale(1.0)";
  btnRegister.style.boxShadow = "none";
  logEvent("mouseout", "Mouse left Register Button");
});

// 8. 'submit' event: Form submission handling without page reload
eventForm.addEventListener("submit", function (e) {
  // Prevent page reload
  e.preventDefault();

  const name = studentName.value.trim();
  const eventName = eventSelect.value;
  const count = participantCount.value;

  logEvent("submit", `Form Submitted! Student: ${name}, Event: ${eventName}, Count: ${count}`);

  statusAlert.textContent = `✓ Registration Successful for ${name} (${eventName})!`;
  setTimeout(() => {
    statusAlert.textContent = "";
  }, 4000);
});

// 1. MUST explicitly demonstrate intrinsic 'onclick' handler
function handleIntrinsicReset() {
  eventForm.reset();
  namePreview.textContent = "—";
  charCount.textContent = "0";
  statusAlert.textContent = "";
  
  fields.forEach((f) => {
    f.style.borderColor = "rgba(255, 255, 255, 0.1)";
    f.style.backgroundColor = "#0f172a";
  });

  logEvent("onclick (Intrinsic)", "Reset button clicked via inline HTML onclick attribute");
}

// Startup log
logEvent("system", "Event Listener Dashboard Initialized. Interact with form elements to test events.");
