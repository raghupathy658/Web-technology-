// Experiment 5: Feature Detection & Fallbacks

// 1. In-Memory JavaScript Fallback Object for localStorage
const memoryStorageFallback = {
  store: {},
  setItem: function (key, val) {
    this.store[key] = String(val);
  },
  getItem: function (key) {
    return this.store.hasOwnProperty(key) ? this.store[key] : null;
  }
};

let activeStorage = null;
let isLocalStorageSupported = false;

// Feature Detection 1: localStorage Support Check
function checkLocalStorage() {
  try {
    const test = "__test__";
    window.localStorage.setItem(test, test);
    window.localStorage.removeItem(test);
    isLocalStorageSupported = true;
    activeStorage = window.localStorage;
  } catch (e) {
    isLocalStorageSupported = false;
    activeStorage = memoryStorageFallback; // Use in-memory fallback
  }

  const badge = document.getElementById("badgeLocalStorage");
  const tableStatus = document.getElementById("tableLocalStorage");
  const tableFallback = document.getElementById("fallbackLocalStorageText");

  if (isLocalStorageSupported) {
    badge.textContent = "Supported";
    badge.className = "badge badge-success";
    tableStatus.textContent = "YES";
    tableStatus.className = "badge badge-success";
    tableFallback.textContent = "Native window.localStorage API active";
  } else {
    badge.textContent = "Fallback Active";
    badge.className = "badge badge-warning";
    tableStatus.textContent = "NO";
    tableStatus.className = "badge badge-warning";
    tableFallback.textContent = "In-Memory JavaScript Storage Object active";
  }
}

// Feature Detection 2: querySelector() Support Check
function checkQuerySelector() {
  const isSupported = typeof document.querySelector === "function";

  const badge = document.getElementById("badgeQuerySelector");
  const tableStatus = document.getElementById("tableQuerySelector");
  const tableFallback = document.getElementById("fallbackQuerySelectorText");

  if (isSupported) {
    badge.textContent = "Supported";
    badge.className = "badge badge-success";
    tableStatus.textContent = "YES";
    tableStatus.className = "badge badge-success";
    tableFallback.textContent = "Native document.querySelector() API active";
  } else {
    badge.textContent = "Fallback Active";
    badge.className = "badge badge-warning";
    tableStatus.textContent = "NO";
    tableStatus.className = "badge badge-warning";
    tableFallback.textContent = "Legacy document.getElementById() fallback active";
  }

  return isSupported;
}

// Safe Element Selector executing querySelector or getElementById fallback
function safeSelect(selectorOrId) {
  if (checkQuerySelector()) {
    // Primary path: querySelector
    return document.querySelector(selectorOrId);
  } else {
    // Fallback path: getElementById
    const id = selectorOrId.replace(/^#/, "");
    return document.getElementById(id);
  }
}

// Feature Detection 3: CSS @supports Check
function checkCssSupports() {
  const isCssSupportsSupported = typeof window.CSS !== "undefined" && typeof window.CSS.supports === "function";
  const isBackdropSupported = isCssSupportsSupported && 
    (CSS.supports("backdrop-filter", "blur(10px)") || CSS.supports("-webkit-backdrop-filter", "blur(10px)"));

  const badge = document.getElementById("badgeCssSupports");
  const tableStatus = document.getElementById("tableCssSupports");
  const tableFallback = document.getElementById("fallbackCssSupportsText");
  const supportsText = document.getElementById("supportsText");

  if (isBackdropSupported) {
    badge.textContent = "Supported";
    badge.className = "badge badge-success";
    tableStatus.textContent = "YES";
    tableStatus.className = "badge badge-success";
    tableFallback.textContent = "Modern backdrop-filter glassmorphism style active";
    supportsText.textContent = "✨ CSS @supports verified: backdrop-filter active!";
  } else {
    badge.textContent = "Fallback Active";
    badge.className = "badge badge-warning";
    tableStatus.textContent = "NO";
    tableStatus.className = "badge badge-warning";
    tableFallback.textContent = "Solid opaque background fallback color active";
    supportsText.textContent = "ℹ️ CSS @supports fallback: Solid background rendered.";
  }
}

// Button Event Listener to test localStorage
const btnTestStorage = document.getElementById("btnTestStorage");
const prefInput = document.getElementById("prefInput");
const storageOutput = document.getElementById("storageOutput");

btnTestStorage.addEventListener("click", function () {
  const val = prefInput.value.trim();
  if (!val) return;

  // Use activeStorage (either window.localStorage or memoryStorageFallback)
  activeStorage.setItem("user_pref", val);
  const retrieved = activeStorage.getItem("user_pref");

  const storageType = isLocalStorageSupported ? "window.localStorage" : "In-Memory Fallback Object";
  storageOutput.textContent = `Stored: '${retrieved}' (Engine: ${storageType})`;
});

// Button Event Listener to test querySelector / getElementById fallback
const btnTestQuery = document.getElementById("btnTestQuery");
const queryOutput = document.getElementById("queryOutput");

btnTestQuery.addEventListener("click", function () {
  const element = safeSelect("#queryOutput");
  const methodUsed = typeof document.querySelector === "function" ? "querySelector('#queryOutput')" : "getElementById('queryOutput')";
  element.textContent = `✓ Found using: ${methodUsed}`;
});

// Run detection on load
checkLocalStorage();
checkQuerySelector();
checkCssSupports();
