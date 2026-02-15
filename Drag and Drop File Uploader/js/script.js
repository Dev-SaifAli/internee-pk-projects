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
  loadSavedImages();
});



function loadSavedImages() {
  try {
    const images = JSON.parse(localStorage.getItem("uploadedImages")) || [];
    if (images.length > 0) {
      previewSection.classList.add("show");

      images.forEach((dataURL) => {
        displayPreview(dataURL);
      });
    }
    return true;
  } catch (error) {
    console.error(`Failed to load images: ${error.message}`);
    return false;
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
    const images = loadSavedImages();

    if (images) {
      images = images.filter((img) => img != dataURL);
      saveImage(images);
    }
    return true;
  } catch (error) {
    console.error("Failed to remove image: ", error.message);
    return false;
  }
}

function saveImage(dataURL) {
  try {
    const images = loadSavedImages();
    if (images) {
      images.push(dataURL);
      localStorage.setItem("uploadedImages", JSON.stringify(images));
    }
    return true;
  } catch (error) {
    console.error("Failed to save image :", error.message);
    return false;
  }
}
