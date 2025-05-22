const uploadForm = document.querySelector("#uploadForm");

uploadForm.addEventListener("submit", e => {
    const fileInput = document.querySelector("#uploadedFile");
    const file = fileInput.files[0];
    const maxSize = 10 * 1024 * 1024; //10MB
    
    if (file.size > maxSize) {
        e.preventDefault();
        alert("File size exceeds 10 MB. Please select a smaller file")
    }
});
