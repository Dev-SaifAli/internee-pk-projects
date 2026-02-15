const dropZone = document.getElementById("dropZone");
const fileInput = document.getElementById("uploadFile");
const errorMessage = document.getElementById("errorMessage");
const successMessage = document.getElementById("successMessage");
const previewSection = document.getElementById("previewSection");
const previewGrid = document.getElementById("previewGrid");
const progressContainer = document.getElementById("progressContainer");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const clickLink = document.querySelector(".click-link");
const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

window.addEventListener("load", () => {
  initPreview();
});

clickLink.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", (e) => {
  const files = e.target.files;
  if (files.length > 0) {
    handleFiles(files);
  }
});

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  e.stopPropagation();
  dropZone.classList.add("active");
});

dropZone.addEventListener("dragleave", (e) => {
  e.preventDefault();
  e.stopPropagation();
  dropZone.classList.remove("active");
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  e.stopPropagation();
  dropZone.classList.remove("active");

  const files = e.dataTransfer.files;
  if (files.length > 0) {
    handleFiles(files);
  }
});

function handleFiles(files) {
  clearMessages();
  Array.from(files).forEach((file) => {
    if (!allowedTypes.includes(file.type)) {
      showError(`Invalid file type:${file.type}. Only JPG, PNG, GIF allowed!`);
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const dataURL = e.target.result;

      simulateProgress();

      saveImage(dataURL);

      displayPreview(dataURL);

      showSuccess(`${file.name} upload successfully`);
    };
    reader.readAsDataURL(file);
  });
}

function showError(error) {
  errorMessage.style.display = "block";
  errorMessage.textContent = error;
}

function showSuccess(success) {
  successMessage.style.display = "block";

  successMessage.textContent = success;
}

function clearMessages() {
  errorMessage.textContent = "";
  successMessage.textContent = "";
  successMessage.style.display = "none";
  errorMessage.style.display = "none";
}
function simulateProgress() {
  progressContainer.classList.add("show");
  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 30;

    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        progressContainer.classList.remove("show");
        progressBar.style.width = "0%";
        progressText.innerHTML = "0%";
      }, 1000);
    }

    progressBar.style.width = progress + "%";
    progressText.innerHTML = Math.round(progress) + "%";
  }, 200);
}
function loadSavedImages() {
  try {
    let images = JSON.parse(localStorage.getItem("uploadedImages")) || [];

    return images;
  } catch (error) {
    console.error(`Failed to load images: ${error.message}`);
    return false;
  }
}
function initPreview() {
  let images = loadSavedImages();
  if (images.length > 0) {
    previewSection.classList.add("show");
    images.forEach((dataURL) => {
      displayPreview(dataURL);
    });
  }
}

function displayPreview(dataURL) {
  const previewItem = document.createElement("div");
  previewItem.className = "preview-item";

  const img = document.createElement("img");
  img.src = dataURL;

  const removeBtn = document.createElement("button");
  removeBtn.className = "remove-btn";
  removeBtn.innerHTML = '<i class="fas fa-trash"></i>';

  removeBtn.addEventListener("click", () => {
    previewItem.remove();
    removeImageFromStorage(dataURL);

    if (previewGrid.children.length === 0) {
      previewSection.classList.remove("show");
    }
  });

  previewItem.appendChild(img);
  previewItem.appendChild(removeBtn);
  previewGrid.appendChild(previewItem);
}

function removeImageFromStorage(dataURL) {
  try {
    let images = loadSavedImages();

    if (images) {
      images = images.filter((img) => img != dataURL);
      localStorage.setItem("uploadedImages", JSON.stringify(images));
    }
    return true;
  } catch (error) {
    console.error("Failed to remove image: ", error.message);
    return false;
  }
}

function saveImage(dataURL) {
  try {
    let images = loadSavedImages();

    images.push(dataURL);
    localStorage.setItem("uploadedImages", JSON.stringify(images));

    return true;
  } catch (error) {
    console.error("Failed to save image :", error.message);
    return false;
  }
}
