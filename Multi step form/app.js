document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  // Application State
  const state = {
    currentStep: 1,
    totalSteps: 4,
    data: JSON.parse(localStorage.getItem("formData")) || {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      teamName: "",
    },
  };

  // DOM Elements
  const nextBtn = document.getElementById("next-btn");
  const prevBtn = document.getElementById("prev-btn");
  const nextText = document.getElementById("next-text");
  const steps = document.querySelectorAll(".form-step");
  const sidebarItems = document.querySelectorAll(".step-item");
  const summaryContainer = document.getElementById("summary-content");
  const mobileDots = document.querySelectorAll("#mobile-dots .dot");

  // Initialization
  populateFromStorage();
  updateUI();

  // Event Listeners
  nextBtn.addEventListener("click", handleNext);
  prevBtn.addEventListener("click", handlePrev);

  document.querySelectorAll("input").forEach((input) => {
    // Real-time validation removal
    input.addEventListener("input", (e) => {
      const field = e.target.dataset.field;
      state.data[field] = e.target.value;
      saveState();

      // Airbnb-style validation: remove error UI as soon as user fixes it
      if (e.target.value.trim() !== "") {
        clearError(e.target);
      }
    });

    // Validate on blur (leaving the field)
    input.addEventListener("blur", (e) => {
      validateField(e.target);
    });
  });

  function saveState() {
    localStorage.setItem("formData", JSON.stringify(state.data));
  }

  function handleNext() {
    if (!validateStep(state.currentStep)) {
      // Shake the button if validation fails
      nextBtn.classList.add("animate-shake");
      setTimeout(() => nextBtn.classList.remove("animate-shake"), 500);
      return;
    }

    if (state.currentStep < state.totalSteps) {
      state.currentStep++;
      updateUI();
    } else {
      // Final Submission Logic
      submitForm();
    }
  }

  function handlePrev() {
    if (state.currentStep > 1) {
      state.currentStep--;
      updateUI();
    }
  }

  function validateField(input) {
    if (!input.hasAttribute("required") && input.value.trim() === "") {
      clearError(input);
      return true;
    }

    let isValid = true;
    let errorMessage = "";

    if (input.hasAttribute("required") && !input.value.trim()) {
      isValid = false;
    } else if (input.type === "email" && !validateEmail(input.value)) {
      isValid = false;
    } else if (input.minLength > 0 && input.value.length < input.minLength) {
      isValid = false;
    }

    if (!isValid) {
      showError(input);
    } else {
      clearError(input);
    }

    return isValid;
  }

  function validateStep(step) {
    const currentStepEl = document.getElementById(`step${step}`);
    const inputs = currentStepEl.querySelectorAll("input");
    let isStepValid = true;

    inputs.forEach((input) => {
      if (!validateField(input)) {
        isStepValid = false;
      }
    });

    return isStepValid;
  }

  function showError(input) {
    input.classList.add("invalid", "border-red-500", "bg-red-50");
    const errorMsg = input.parentElement.querySelector(".error-msg");
    if (errorMsg) errorMsg.classList.remove("hidden");
  }

  function clearError(input) {
    input.classList.remove("invalid", "border-red-500", "bg-red-50");
    const errorMsg = input.parentElement.querySelector(".error-msg");
    if (errorMsg) errorMsg.classList.add("hidden");
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function updateUI() {
    // Step Content visibility
    steps.forEach((s, idx) => {
      s.classList.toggle("active", idx + 1 === state.currentStep);
    });

    // Sidebar Progress
    sidebarItems.forEach((item, idx) => {
      const stepNum = idx + 1;
      item.classList.toggle("active", stepNum === state.currentStep);
      item.classList.toggle("completed", stepNum < state.currentStep);

      const checkIcon = item.querySelector('[data-lucide="check"]');
      if (stepNum < state.currentStep) {
        checkIcon.classList.remove("hidden");
      } else {
        checkIcon.classList.add("hidden");
      }
    });

    // Mobile Progress Dots
    mobileDots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx + 1 === state.currentStep);
    });

    // Navigation Controls
    prevBtn.classList.toggle("hidden", state.currentStep === 1);
    nextText.textContent =
      state.currentStep === state.totalSteps ? "Create Account" : "Continue";

    if (state.currentStep === 4) renderSummary();

    // UX: Scroll to top of form on step change
    window.scrollTo({ top: 0, behavior: "smooth" });
    lucide.createIcons();
  }

  function renderSummary() {
    summaryContainer.innerHTML = `
            <div class="flex justify-between items-center border-b border-gray-100 pb-3">
                <span class="text-gray-500">Name</span>
                <span class="font-semibold text-gray-900">${state.data.firstName} ${state.data.lastName}</span>
            </div>
            <div class="flex justify-between items-center border-b border-gray-100 pb-3">
                <span class="text-gray-500">Email</span>
                <span class="font-semibold text-gray-900">${state.data.email}</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-gray-500">Workspace</span>
                <span class="font-semibold text-gray-900">${state.data.teamName || "Personal Workspace"}</span>
            </div>
        `;
  }

  function populateFromStorage() {
    document.querySelectorAll("input").forEach((input) => {
      const field = input.dataset.field;
      if (state.data[field]) {
        input.value = state.data[field];
      }
    });
  }

  async function submitForm() {
    nextBtn.disabled = true;
    nextBtn.innerHTML = `<div class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div> Processing...`;

    // Simulate API latency
    setTimeout(() => {
      localStorage.removeItem("formData");
      alert("Welcome aboard! Your account has been created.");
      location.reload();
    }, 2000);
  }
});
