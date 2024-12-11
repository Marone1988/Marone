
// JavaScript for Random Photo Picker with uploaded photos displayed
document.addEventListener("DOMContentLoaded", () => {
  const uploadInput = document.getElementById("upload");
  const pickButton = document.getElementById("pick-button");
  const randomPhoto = document.getElementById("random-photo");
  const photoGallery = document.getElementById("photo-gallery");

  let uploadedPhotos = JSON.parse(localStorage.getItem("uploadedPhotos")) || [];

  // Function to display uploaded photos in the gallery
  const displayGallery = () => {
    photoGallery.innerHTML = "";
    uploadedPhotos.forEach((photo, index) => {
      const img = document.createElement("img");
      img.src = photo;
      img.alt = `Uploaded Photo ${index + 1}`;
      photoGallery.appendChild(img);
    });
  };

  // Load gallery on page load
  displayGallery();

  // Handle photo uploads
  uploadInput.addEventListener("change", (event) => {
    const files = event.target.files;
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        uploadedPhotos.push(e.target.result);
        localStorage.setItem("uploadedPhotos", JSON.stringify(uploadedPhotos));
        displayGallery();
      };
      reader.readAsDataURL(file);
    }
  });

  // Pick a random photo
  pickButton.addEventListener("click", () => {
    if (uploadedPhotos.length === 0) {
      alert("Please upload some photos first!");
      return;
    }
    const randomIndex = Math.floor(Math.random() * uploadedPhotos.length);
    randomPhoto.src = uploadedPhotos[randomIndex];
  });
});
